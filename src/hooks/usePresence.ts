/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";

export type PeerState = {
  id: string;
  activeNode: string | null;
  color: string;
};

const PEER_COLORS = ["#4F8CFF", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"];

function loadAblyScript(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return reject(new Error("SSR environment"));
    }
    if ((window as any).Ably) {
      return resolve((window as any).Ably);
    }
    const script = document.createElement("script");
    script.src = "https://cdn.ably.com/lib/ably.min-1.js";
    script.async = true;
    script.onload = () => {
      if ((window as any).Ably) {
        resolve((window as any).Ably);
      } else {
        reject(new Error("Ably SDK failed to load"));
      }
    };
    script.onerror = () => reject(new Error("Ably SDK script load error"));
    document.head.appendChild(script);
  });
}

export function usePresence(activeNode: string | null) {
  const [peers, setPeers] = useState<PeerState[]>([]);
  const channelRef = useRef<any>(null);
  const myColorRef = useRef(
    PEER_COLORS[Math.floor(Math.random() * PEER_COLORS.length)]
  );

  const activeNodeRef = useRef(activeNode);
  useEffect(() => {
    activeNodeRef.current = activeNode;
  }, [activeNode]);

  useEffect(() => {
    let client: any = null;
    let mounted = true;

    async function initPresence() {
      try {
        const res = await fetch("/api/ably-token");
        if (!res.ok) return;

        const Ably = await loadAblyScript();
        if (!mounted) return;

        client = new Ably.Realtime({ authUrl: "/api/ably-token" });
        const channel = client.channels.get("devan-presence");
        channelRef.current = channel;

        await channel.presence.enter({
          activeNode: activeNodeRef.current,
          color: myColorRef.current,
        });

        channel.presence.subscribe(() => {
          if (!mounted) return;
          channel.presence.get((err: any, members: any) => {
            if (err || !mounted) return;
            setPeers(
              (members ?? [])
                .filter((m: any) => m.clientId !== client?.auth?.clientId)
                .map((m: any) => ({
                  id: m.clientId,
                  activeNode: m.data?.activeNode ?? null,
                  color: m.data?.color ?? "#4F8CFF",
                }))
            );
          });
        });
      } catch (err) {
        console.warn("Realtime presence unavailable:", err);
      }
    }

    initPresence();

    return () => {
      mounted = false;
      if (channelRef.current) {
        channelRef.current.presence.leave().catch(() => {});
      }
      if (client) {
        client.close();
      }
    };
  }, []);

  useEffect(() => {
    if (channelRef.current) {
      channelRef.current.presence
        .update({ activeNode, color: myColorRef.current })
        .catch(() => {});
    }
  }, [activeNode]);

  return peers;
}
