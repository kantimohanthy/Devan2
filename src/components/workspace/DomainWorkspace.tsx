"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Network,
  Terminal,
  ShieldCheck,
  Play,
  Pause,
  RotateCcw,
  Activity,
  ChevronRight,
} from "lucide-react";
import { workspaceStore } from "@/lib/workspace/workspace-store";

interface TraceEvent {
  ms: string;
  layer: string;
  title: string;
  desc: string;
  packetSize: string;
  proto: string;
  ttl: string;
}

interface FailureScenario {
  title: string;
  cause: string;
  symptom: string;
  cmd: string;
  expected: string;
  fix: string;
}

// ── DNS Specific Data (Illustrative sequence pending raw pcap capture) ──────
const DNS_TRACE_EVENTS: TraceEvent[] = [
  { ms: "09.000 ms", layer: "App", title: "Browser invokes getaddrinfo('example.com')", desc: "Checks POSIX VFS /etc/hosts & system resolver cache", packetSize: "64B", proto: "POSIX", ttl: "n/a" },
  { ms: "09.031 ms", layer: "Kernel", title: "OS Resolver miss → socket(AF_INET, SOCK_DGRAM, 0)", desc: "Allocates file descriptor fd=4 and binds to ephemeral UDP port 54321", packetSize: "64B", proto: "UDP", ttl: "n/a" },
  { ms: "09.052 ms", layer: "NIC", title: "sendto() emits UDP datagram to Recursive Resolver 1.1.1.1:53", desc: "Sets RD=1 (Recursion Desired), ID=0x1A2B, QNAME=example.com, QTYPE=A", packetSize: "45B", proto: "DNS/UDP", ttl: "n/a" },
  { ms: "09.101 ms", layer: "Recurse", title: "Cloudflare 1.1.1.1 receives query → Cache Miss", desc: "Initiates iterative traversal starting from ICANN Root Server hint file", packetSize: "45B", proto: "DNS/UDP", ttl: "n/a" },
  { ms: "09.440 ms", layer: "Root", title: "Root Server (.) 198.41.0.4 returns TLD referral", desc: "Delegates to .com TLD servers (a.gtld-servers.net) with NS records", packetSize: "482B", proto: "DNS/UDP", ttl: "172800s" },
  { ms: "10.004 ms", layer: "TLD", title: "TLD Server (.com) 192.5.6.30 returns Glue A record", desc: "Returns authoritative NS delegation ns1.example.com → 93.184.216.34", packetSize: "240B", proto: "DNS/UDP", ttl: "86400s" },
  { ms: "10.773 ms", layer: "Auth", title: "Authoritative Server ns1.example.com replies AA=1", desc: "Returns final A record 93.184.216.34 with RRSIG DNSSEC signature", packetSize: "128B", proto: "DNS/UDP", ttl: "300s" },
  { ms: "11.050 ms", layer: "App", title: "Application receives IP 93.184.216.34", desc: "Sockets layer initiates TCP handshake to 93.184.216.34:443", packetSize: "128B", proto: "POSIX", ttl: "300s" },
];

const DNS_FAILURES: FailureScenario[] = [
  { title: "NXDOMAIN (Nonexistent Domain)", cause: "Domain name missing in TLD registry", symptom: "HTTP 502 / getaddrinfo failed", cmd: "dig +trace invalid-name.xyz", expected: "RCODE 3 (NXDOMAIN)", fix: "Verify TLD registration and CNAME targets" },
  { title: "SERVFAIL (Server Failure)", cause: "Authoritative server down or DNSSEC failure", symptom: "Resolution hangs or fails deterministically", cmd: "dig +dnssec domain.com +cd", expected: "RCODE 2 (SERVFAIL)", fix: "Audit RRSIG expiration & ZSK/KSK keys" },
  { title: "UDP Packet Truncation (TC=1)", cause: "Payload exceeds 512B EDNS0 limit", symptom: "TC bit set, forcing TCP fallback", cmd: "dig +ignore +tcp domain.com", expected: "TC=1 in response flags", fix: "Enable TCP port 53 in firewall" },
  { title: "DNSSEC Validation Failure", cause: "RRSIG signature does not match DNSKEY", symptom: "BOGUS resolution state", cmd: "delv @1.1.1.1 example.com", expected: "validation failure", fix: "Resign zone with active ZSK key" },
];

// ── TCP Specific Data (RFC 9293 Connection Establishment & State Machine) ──
const TCP_TRACE_EVENTS: TraceEvent[] = [
  { ms: "00.000 ms", layer: "App", title: "App invokes socket(AF_INET, SOCK_STREAM, 0)", desc: "Kernel allocates file descriptor fd=5 and initializes TCP sock struct (CLOSED)", packetSize: "n/a", proto: "POSIX", ttl: "n/a" },
  { ms: "00.024 ms", layer: "Kernel", title: "App invokes connect(fd, 93.184.216.34:443)", desc: "TCP socket state transitions to SYN_SENT; allocates ephemeral port 54321", packetSize: "n/a", proto: "POSIX", ttl: "n/a" },
  { ms: "00.048 ms", layer: "Wire", title: "Client transmits [SYN] Seq=1000 Win=65535 MSS=1460", desc: "Flags: SYN=1, ACK=0. Options: MSS 1460, SACK permitted, Window scale 7", packetSize: "60B", proto: "TCP", ttl: "64" },
  { ms: "14.210 ms", layer: "Wire", title: "Server replies [SYN, ACK] Seq=5000 Ack=1001", desc: "Remote peer acknowledges client ISN (1000 + 1 = 1001) and sends own ISN 5000", packetSize: "60B", proto: "TCP", ttl: "56" },
  { ms: "14.240 ms", layer: "Kernel", title: "Client sends [ACK] Seq=1001 Ack=5001", desc: "TCP state transitions to ESTABLISHED; connect() returns 0 to user space", packetSize: "52B", proto: "TCP", ttl: "64" },
  { ms: "14.300 ms", layer: "App", title: "write(fd, request) transmits [PSH, ACK]", desc: "Transmits TLS ClientHello payload within established sliding window (cwnd=10)", packetSize: "180B", proto: "TCP", ttl: "64" },
];

const TCP_FAILURES: FailureScenario[] = [
  { title: "ECONNREFUSED (Connection Refused)", cause: "Target port has no listening process or firewall sent TCP RST", symptom: "Immediate connection abort without delay", cmd: "curl -v https://127.0.0.1:9999", expected: "TCP RST received (Flags: 0x014)", fix: "Verify daemon is listening on target interface and port" },
  { title: "ETIMEDOUT (Connection Timed Out)", cause: "Intermediate firewall or routing blackhole silently drops SYN packet", symptom: "Client hangs 60-120 seconds before failing", cmd: "nc -w 5 -zv 192.0.2.1 443", expected: "SYN retransmission timeout (RTO backoff)", fix: "Check security groups, IP route tables, and egress ACLs" },
  { title: "ECONNRESET (Connection Reset by Peer)", cause: "Remote application exited while unread bytes remained in TCP buffer", symptom: "Sudden read/write socket failure mid-session", cmd: "ss -tani state reset", expected: "TCP RST received mid-stream", fix: "Inspect server application logs for OOM crash or unhandled exception" },
  { title: "TCP Zero Window & Stall", cause: "Receiver process buffer full; advertised window drops to 0", symptom: "Transmission throughput drops to zero; sender throttles", cmd: "ss -tani | grep -i wscale", expected: "win 0, TCP ZeroWindowProbe packets", fix: "Optimize receiver socket buffer (SO_RCVBUF) and worker throughput" },
];

export function DomainWorkspace({ slug = "networking.dns" }: { slug?: string }) {
  const isTcp = slug.toLowerCase().includes("tcp");
  const isDns = slug.toLowerCase().includes("dns");

  const [viewMode, setViewMode] = useState<"TRACE" | "FAILURES" | "TERMINAL">("TRACE");
  const [traceStep, setTraceStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFailure, setSelectedFailure] = useState<string | null>(null);
  const [terminalInput, setTerminalInput] = useState("");

  const traceEvents = isTcp ? TCP_TRACE_EVENTS : DNS_TRACE_EVENTS;
  const failureScenarios = isTcp ? TCP_FAILURES : DNS_FAILURES;

  const defaultTerminalOutput = useMemo(() => isTcp
    ? [
        "devan@os-kernel:~$ ss -tani state established",
        "Recv-Q Send-Q Local Address:Port Peer Address:Port Process",
        "0      0      192.168.1.100:54321 93.184.216.34:443 users:((\"node\",pid=1420,fd=5))",
        "       cubic wscale:7,7 rto:200 rtt:14.2/0.4ms ato:40 mss:1460 rcvspace:65535 ssthresh:2147483647 cwnd:10",
        "devan@os-kernel:~$ tcpdump -nn -i eth0 'tcp port 443' -c 3",
        "15:36:00.100 IP 192.168.1.100.54321 > 93.184.216.34.443: Flags [S], seq 1000, win 65535, options [mss 1460]",
        "15:36:00.114 IP 93.184.216.34.443 > 192.168.1.100.54321: Flags [S.], seq 5000, ack 1001, win 65535",
        "15:36:00.114 IP 192.168.1.100.54321 > 93.184.216.34.443: Flags [.], ack 5001, win 65535",
      ]
    : [
        "devan@os-kernel:~$ dig +trace example.com",
        "; <<>> DiG 9.18.28 <<>> +trace example.com",
        ";; global options: +cmd",
        ".                       518400  IN      NS      a.root-servers.net.",
        "com.                    172800  IN      NS      a.gtld-servers.net.",
        "example.com.            86400   IN      NS      ns1.example.com.",
        "example.com.            300     IN      A       93.184.216.34",
        ";; Received 128 bytes from 1.1.1.1#53(1.1.1.1) in 11 ms",
      ], [isTcp]);

  const [terminalOutput, setTerminalOutput] = useState<string[]>(defaultTerminalOutput);

  // Sync trace step bound when switching
  useEffect(() => {
    setTraceStep(0);
    setTerminalOutput(defaultTerminalOutput);
  }, [isTcp, defaultTerminalOutput]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTraceStep((prev) => (prev + 1) % traceEvents.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, traceEvents.length]);

  const currentEvent = traceEvents[traceStep] || traceEvents[0];

  const handleCommandRun = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim();
    const out = [`devan@os-kernel:~$ ${cmd}`];

    if (cmd.startsWith("dig")) {
      out.push(";; ANSWER SECTION:");
      out.push("example.com.            300     IN      A       93.184.216.34");
      out.push(";; Query time: 11 msec | SERVER: 1.1.1.1#53(1.1.1.1) | MSG SIZE rcvd: 128");
    } else if (cmd.startsWith("ss")) {
      out.push("ESTAB 0 0 192.168.1.100:54321 93.184.216.34:443 rtt:14.2ms cwnd:10");
    } else if (cmd.startsWith("tshark") || cmd.startsWith("tcpdump")) {
      if (isTcp) {
        out.push("15:36:00.100 IP 192.168.1.100.54321 > 93.184.216.34.443: Flags [S], seq 1000");
        out.push("15:36:00.114 IP 93.184.216.34.443 > 192.168.1.100.54321: Flags [S.], seq 5000, ack 1001");
      } else {
        out.push("15:36:01.102 IP 192.168.1.100.54321 > 1.1.1.1.53: 0+ A? example.com. (29)");
        out.push("15:36:01.113 IP 1.1.1.1.53 > 192.168.1.100.54321: 0 1/0/0 A 93.184.216.34 (45)");
      }
    } else {
      out.push(`Executing diagnostic command: ${cmd}`);
      out.push("Result: 0 errors returned | Output synchronized with active view");
    }

    setTerminalOutput((prev) => [...prev, ...out]);
    setTerminalInput("");
  };

  const cockpitTitle = isTcp
    ? "TCP Three-Way Handshake & State Machine"
    : isDns
    ? "DNS Iterative Resolution Protocol Trace"
    : `${slug.toUpperCase()} Protocol Cockpit`;

  const cockpitSubtitle = isTcp
    ? "Protocol walkthrough of RFC 9293 connection establishment, POSIX socket transitions, and sequence/acknowledgment numbers. State: STUDIED."
    : isDns
    ? "Illustrative DNS iterative resolution trace. TODO(UJ): commit the capture file (pcap / trace text) to replace this illustrative sequence with actual packet timestamps and addresses."
    : "Protocol concept overview and system architecture notes. See linked RFC and source materials.";

  return (
    <div className="space-y-6 font-mono text-xs select-none">
      {/* Observability Header & View Mode Selector */}
      <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#20252B] pb-4 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Network className="h-5 w-5 text-[#4F8CFF]" />
              <h1 className="text-lg font-bold text-[#F5F5F5]">{cockpitTitle}</h1>
              {isDns ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[12px] text-amber-400 border border-amber-500/20">
                  <Activity className="h-3 w-3" /> Illustrative trace (not a recording)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[12px] text-[#4F8CFF] border border-blue-500/20">
                  <Activity className="h-3 w-3" /> Protocol walkthrough
                </span>
              )}
            </div>
            <p className="text-xs text-[#8A9098] max-w-[850px] leading-relaxed">
              {cockpitSubtitle}
            </p>
            {isDns && (
              <div className="text-[12px] text-amber-400/90 font-mono mt-1">
                TODO(UJ): commit the capture file (pcap/trace text) from the 2026-08-07 experiment.
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded-full border border-[#4F8CFF]/30 bg-[#121418] px-3 py-1 font-mono text-[12px] text-[#F5F5F5]">
              Derived state: <span className="text-[#4F8CFF] font-bold">{isDns ? "TESTED" : "STUDIED"}</span>
            </span>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 rounded-xl border border-[#20252B] bg-[#121418] p-1">
            {(["TRACE", "FAILURES", "TERMINAL"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                className={`rounded-lg px-2.5 py-1 text-[12px] font-bold transition-all ${
                  viewMode === v
                    ? "bg-[#20252B] text-emerald-400 border border-emerald-400/40 shadow"
                    : "text-[#8A9098] hover:text-[#F5F5F5]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Protocol Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 rounded-xl border border-[#20252B] bg-[#07080A] p-3 text-[12px] font-mono">
          <div>
            <span className="text-[9px] text-[#8A9098] uppercase block">{isTcp ? "Handshake RTT" : "Total RTT"}</span>
            <span className="text-emerald-400 font-bold">{isTcp ? "14.20 ms" : "11.05 ms"}</span>
          </div>
          <div>
            <span className="text-[9px] text-[#8A9098] uppercase block">Payload Size</span>
            <span className="text-[#F5F5F5] font-bold">{currentEvent.packetSize}</span>
          </div>
          <div>
            <span className="text-[9px] text-[#8A9098] uppercase block">Protocol</span>
            <span className="text-[#4F8CFF] font-bold">{currentEvent.proto}</span>
          </div>
          <div>
            <span className="text-[9px] text-[#8A9098] uppercase block">TTL</span>
            <span className="text-amber-400 font-bold">{currentEvent.ttl}</span>
          </div>
          <div>
            <span className="text-[9px] text-[#8A9098] uppercase block">{isTcp ? "Socket State" : "Cache Status"}</span>
            <span className="text-purple-400 font-bold">{isTcp ? (traceStep >= 4 ? "ESTABLISHED" : "SYN_SENT") : "MISS (0x01)"}</span>
          </div>
          <div>
            <span className="text-[9px] text-[#8A9098] uppercase block">Provenance</span>
            <span className="text-[#8A9098] font-bold">{isDns ? "Illustrative trace" : "RFC 9293 walkthrough"}</span>
          </div>
        </div>
      </div>

      {/* Main View Mode Engine */}
      {viewMode === "TRACE" && (
        <div className="space-y-6">
          {/* Protocol Trace Scrubbable Viewer */}
          <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#20252B] pb-3">
              <span className="font-bold text-[#F5F5F5] text-xs flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#4F8CFF]" /> Protocol Execution Trace (Scrubbable Sequence)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause trace animation" : "Play trace animation"}
                  className="rounded bg-[#20252B] p-1.5 text-[#F5F5F5] hover:text-[#4F8CFF]"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={() => setTraceStep(0)}
                  aria-label="Reset trace to step 1"
                  className="rounded bg-[#20252B] p-1.5 text-[#8A9098] hover:text-[#F5F5F5]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {traceEvents.map((ev, idx) => {
                const isActive = idx === traceStep;
                return (
                  <div
                    key={ev.ms + idx}
                    onClick={() => {
                      setTraceStep(idx);
                      workspaceStore.setState({ selectedConceptId: `${isTcp ? "tcp" : "dns"}.step.${idx + 1}` });
                    }}
                    className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all ${
                      isActive
                        ? "border-[#4F8CFF] bg-[#121418] shadow-lg shadow-[#4F8CFF]/15 scale-[1.01]"
                        : "border-[#20252B] bg-[#07080A] text-[#8A9098] hover:bg-[#121418]/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-emerald-400 w-20 shrink-0 text-[12px]">{ev.ms}</span>
                      <span className="rounded bg-[#20252B] px-2 py-0.5 text-[9px] text-[#4F8CFF] font-bold w-16 text-center">
                        {ev.layer}
                      </span>
                      <span className={`font-semibold text-xs ${isActive ? "text-[#F5F5F5]" : "text-[#8A9098]"}`}>
                        {ev.title}
                      </span>
                    </div>
                    <ChevronRight className={`h-4 w-4 ${isActive ? "text-[#4F8CFF]" : "text-[#8A9098]"}`} />
                  </div>
                );
              })}
            </div>

            {/* Active Trace Telemetry Inspection Card */}
            <div className="rounded-xl border border-[#20252B] bg-[#121418] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#F5F5F5]">
                <span>Active Step: {currentEvent.title}</span>
                <span className="text-[#4F8CFF] font-mono">{currentEvent.proto}</span>
              </div>
              <p className="text-xs text-[#8A9098] leading-relaxed">{currentEvent.desc}</p>
            </div>
          </div>

          {/* Wireshark Packet Inspector (Hex + Binary View) */}
          <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 space-y-4 shadow-xl font-mono">
            <span className="font-bold text-[#F5F5F5] text-xs flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-purple-400" />
              {isTcp
                ? "Wireshark TCP Segment Inspector (Wire Spec / RFC 9293)"
                : "Wireshark DNS Packet Inspector (RFC 1035 Datagram)"}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px]">
              <div className="rounded-xl border border-[#20252B] bg-[#07080A] p-3 space-y-1 overflow-x-auto">
                <span className="text-[12px] text-[#8A9098] uppercase font-bold block mb-2">
                  {isTcp ? "Wireshark Segment Hex Dump (TCP SYN)" : "Wireshark Hex Dump (UDP 53)"}
                </span>
                <div className="text-emerald-400 leading-relaxed font-mono text-[12px]">
                  {isTcp ? (
                    <>
                      <div>0000  00 15 5d 01 02 03 00 1c 42 11 22 33 08 00 45 00</div>
                      <div>0010  00 3c d4 31 40 00 40 06 7c 2a c0 a8 01 64 5d b8</div>
                      <div>0020  d8 22 d4 31 01 bb 00 00 03 e8 00 00 00 00 a0 02</div>
                      <div>0030  ff ff 7f 1a 00 00 02 04 05 b4 04 02 08 0a 00 00</div>
                    </>
                  ) : (
                    <>
                      <div>0000  00 15 5d 01 02 03 00 1c 42 11 22 33 08 00 45 00</div>
                      <div>0010  00 3c 1a 2b 40 00 40 11 7c 2a c0 a8 01 64 01 01</div>
                      <div>0020  01 01 d4 31 00 35 00 28 fe 34 1a 2b 01 00 00 01</div>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-[#20252B] bg-[#07080A] p-3 space-y-2">
                <span className="text-[12px] text-[#8A9098] uppercase font-bold block">
                  Wire Spec Decoded Header
                </span>
                <div className="space-y-1.5 text-xs text-[#F5F5F5]">
                  {isTcp ? (
                    <>
                      <div className="flex justify-between border-b border-[#20252B] pb-1">
                        <span className="text-[#8A9098]">Source / Dest Port:</span>
                        <span className="text-[#4F8CFF] font-bold">54321 → 443 (HTTPS)</span>
                      </div>
                      <div className="flex justify-between border-b border-[#20252B] pb-1">
                        <span className="text-[#8A9098]">Sequence Number:</span>
                        <span className="text-amber-400 font-bold">1000 (Initial Seq Num)</span>
                      </div>
                      <div className="flex justify-between border-b border-[#20252B] pb-1">
                        <span className="text-[#8A9098]">Flags:</span>
                        <span className="text-emerald-400 font-bold">0x002 (SYN=1, ACK=0)</span>
                      </div>
                      <div className="flex justify-between border-b border-[#20252B] pb-1">
                        <span className="text-[#8A9098]">Window Size:</span>
                        <span className="text-[#F5F5F5]">65535 (Window Scale 7)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8A9098]">Options:</span>
                        <span className="text-purple-400 font-bold">MSS 1460, SACK Permitted</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between border-b border-[#20252B] pb-1">
                        <span className="text-[#8A9098]">Transaction ID:</span>
                        <span className="text-[#4F8CFF] font-bold">0x1A2B</span>
                      </div>
                      <div className="flex justify-between border-b border-[#20252B] pb-1">
                        <span className="text-[#8A9098]">Flags:</span>
                        <span className="text-amber-400 font-bold">0x0100 (RD=1, RA=0, TC=0)</span>
                      </div>
                      <div className="flex justify-between border-b border-[#20252B] pb-1">
                        <span className="text-[#8A9098]">Question Name:</span>
                        <span>example.com (Type A, Class IN)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8A9098]">Answer A Record:</span>
                        <span className="text-emerald-400 font-bold">93.184.216.34 (TTL 300)</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === "FAILURES" && (
        <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 space-y-4 shadow-xl">
          <span className="font-bold text-[#F5F5F5] text-xs flex items-center gap-2">
            <Terminal className="h-4 w-4 text-amber-400" />
            {isTcp ? "TCP Connection Failure Scenarios & Runbooks" : "DNS Failure Simulator & Observability Runbooks"}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {failureScenarios.map((f) => (
                <div
                  key={f.title}
                  onClick={() => setSelectedFailure(f.title)}
                  className={`rounded-xl border p-3 cursor-pointer transition-colors ${
                    selectedFailure === f.title
                      ? "border-amber-400 bg-[#121418] text-[#F5F5F5]"
                      : "border-[#20252B] bg-[#07080A] text-[#8A9098] hover:text-[#F5F5F5]"
                  }`}
                >
                  <span className="font-bold text-xs block mb-1">{f.title}</span>
                  <span className="text-[12px] text-amber-400 block">{f.symptom}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#20252B] bg-[#121418] p-4 space-y-3">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Observability Remediation Playbook
              </span>
              {selectedFailure ? (
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[#8A9098] block text-[12px] uppercase">Root Cause:</span>
                    <p className="text-[#F5F5F5] mt-0.5">{failureScenarios.find((f) => f.title === selectedFailure)?.cause}</p>
                  </div>
                  <div>
                    <span className="text-[#8A9098] block text-[12px] uppercase">Diagnostic Command:</span>
                    <pre className="rounded bg-[#07080A] p-2 text-emerald-400 border border-[#20252B] mt-1 font-mono overflow-x-auto">
                      {failureScenarios.find((f) => f.title === selectedFailure)?.cmd}
                    </pre>
                  </div>
                  <div>
                    <span className="text-[#8A9098] block text-[12px] uppercase">Expected Packet Symptom:</span>
                    <span className="text-amber-400 font-bold block mt-0.5">{failureScenarios.find((f) => f.title === selectedFailure)?.expected}</span>
                  </div>
                  <div>
                    <span className="text-[#8A9098] block text-[12px] uppercase">Remediation:</span>
                    <p className="text-[#F5F5F5] mt-0.5">{failureScenarios.find((f) => f.title === selectedFailure)?.fix}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#8A9098]">Select a failure scenario on the left to inspect root cause, packet symptoms, and remediation commands.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {viewMode === "TERMINAL" && (
        <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 space-y-4 shadow-xl font-mono">
          <div className="flex items-center justify-between border-b border-[#20252B] pb-3">
            <span className="font-bold text-[#F5F5F5] text-xs flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              {isTcp
                ? "TCP Diagnostic Terminal (ss, tcpdump, nc, iperf3)"
                : "DNS Diagnostic Terminal (dig, host, tshark, nslookup)"}
            </span>
            <span className="text-[12px] text-emerald-400 font-mono">SANDBOX READY</span>
          </div>

          <div className="rounded-xl border border-[#20252B] bg-[#07080A] p-4 h-64 overflow-y-auto space-y-1 text-xs">
            {terminalOutput.map((line, i) => (
              <div key={i} className={line.startsWith("devan@") ? "text-[#4F8CFF] font-bold" : "text-[#8A9098]"}>
                {line}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommandRun} className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder={isTcp ? "Type ss -tani | tcpdump -nn 'tcp port 443' | nc -zv 1.1.1.1 443..." : "Type dig +trace example.com | tshark -i any | host example.com..."}
              className="flex-1 rounded-xl border border-[#20252B] bg-[#121418] px-3 py-2 text-xs text-[#F5F5F5] focus:border-[#4F8CFF] focus:outline-none"
            />
            <button type="submit" className="rounded-xl bg-[#4F8CFF] px-4 py-2 text-xs font-bold text-white hover:bg-[#70A3FF]">
              Run
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
