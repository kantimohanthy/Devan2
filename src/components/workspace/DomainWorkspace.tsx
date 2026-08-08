"use client";

import React, { useState, useEffect } from "react";
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
import { TelemetryPulse, EvidenceSealedBadge, ReadinessRing } from "./UJOSMotifs";
import { workspaceStore } from "@/lib/workspace/workspace-store";

export function DomainWorkspace({ slug = "networking.dns" }: { slug?: string }) {
  const [perspective, setPerspective] = useState<
    "APPLICATION" | "KERNEL" | "PACKET" | "INFRASTRUCTURE" | "CLOUD" | "INTERVIEW"
  >("PACKET");
  const [viewMode, setViewMode] = useState<"TRACE" | "SIMULATOR" | "FAILURES" | "TERMINAL">("TRACE");
  const [traceStep, setTraceStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedFailure, setSelectedFailure] = useState<string | null>(null);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "devan@os-kernel:~$ dig +trace example.com",
    "; <<>> DiG 9.18.28 <<>> +trace example.com",
    ";; global options: +cmd",
    ".                       518400  IN      NS      a.root-servers.net.",
    "com.                    172800  IN      NS      a.gtld-servers.net.",
    "example.com.            86400   IN      NS      ns1.example.com.",
    "example.com.            300     IN      A       93.184.216.34",
    ";; Received 128 bytes from 1.1.1.1#53(1.1.1.1) in 11 ms",
  ]);

  const traceEvents = [
    { ms: "09.000 ms", layer: "App", title: "Browser invokes getaddrinfo('example.com')", desc: "Checks POSIX VFS /etc/hosts & nscd memory cache", packetSize: "64B", proto: "POSIX", ttl: "-" },
    { ms: "09.031 ms", layer: "Kernel", title: "OS Resolver cache miss -> socket(AF_INET, SOCK_DGRAM, 0)", desc: "Allocates file descriptor fd=4 and binds to ephemerally assigned UDP port 54321", packetSize: "64B", proto: "UDP", ttl: "-" },
    { ms: "09.052 ms", layer: "NIC", title: "sendto() emits UDP datagram to Recursive Resolver 1.1.1.1:53", desc: "Sets RD=1 (Recursion Desired), ID=0x1A2B, QNAME=example.com, QTYPE=A", packetSize: "45B", proto: "DNS/UDP", ttl: "-" },
    { ms: "09.101 ms", layer: "Recurse", title: "Cloudflare 1.1.1.1 receives query -> Cache Miss", desc: "Initiates iterative traversal starting from ICANN Root Server hint file", packetSize: "45B", proto: "DNS/UDP", ttl: "-" },
    { ms: "09.440 ms", layer: "Root", title: "Root Server (.) 198.41.0.4 returns TLD referral", desc: "Delegates to .com TLD servers (a.gtld-servers.net) with NS records", packetSize: "482B", proto: "DNS/UDP", ttl: "172800s" },
    { ms: "10.004 ms", layer: "TLD", title: "TLD Server (.com) 192.5.6.30 returns Glue A record", desc: "Returns authoritative NS delegation ns1.example.com -> 93.184.216.34", packetSize: "240B", proto: "DNS/UDP", ttl: "86400s" },
    { ms: "10.773 ms", layer: "Auth", title: "Authoritative Server ns1.example.com replies AA=1", desc: "Returns final A record 93.184.216.34 with RRSIG DNSSEC signature", packetSize: "128B", proto: "DNS/UDP", ttl: "300s" },
    { ms: "11.050 ms", layer: "App", title: "Application receives IP 93.184.216.34", desc: "Sockets initiates TCP 3-way handshake to 93.184.216.34:443", packetSize: "128B", proto: "POSIX", ttl: "300s" },
  ];

  const failureScenarios = [
    { title: "NXDOMAIN (Non-Existent Domain)", cause: "Domain name missing in TLD registry", symptom: "HTTP 502 / getaddrinfo failed", cmd: "dig +trace invalid-name.xyz", expected: "RCODE 3 (NXDOMAIN)", fix: "Verify TLD registration and CNAME targets" },
    { title: "SERVFAIL (Server Failure)", cause: "Authoritative server down or DNSSEC failure", symptom: "Resolution hangs or fails deterministically", cmd: "dig +dnssec domain.com +cd", expected: "RCODE 2 (SERVFAIL)", fix: "Audit RRSIG expiration & ZSK/KSK keys" },
    { title: "UDP Packet Truncation (TC=1)", cause: "Payload exceeds 512B EDNS0 limit", symptom: "TC bit set, forcing TCP fallback", cmd: "dig +ignore +tcp domain.com", expected: "TC=1 in response flags", fix: "Enable TCP port 53 in firewall" },
    { title: "DNSSEC Validation Failure", cause: "RRSIG signature does not match DNSKEY", symptom: "BOGUS resolution state", cmd: "delv @1.1.1.1 example.com", expected: "validation failure", fix: "Re-sign zone with active ZSK key" },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTraceStep((prev) => (prev + 1) % traceEvents.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPlaying, traceEvents.length]);

  const currentEvent = traceEvents[traceStep];

  const handleCommandRun = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim();
    const out = [`devan@os-kernel:~$ ${cmd}`];
    if (cmd.startsWith("dig")) {
      out.push(";; ANSWER SECTION:");
      out.push("example.com.            300     IN      A       93.184.216.34");
      out.push(";; Query time: 11 msec | SERVER: 1.1.1.1#53(1.1.1.1) | MSG SIZE rcvd: 128");
    } else if (cmd.startsWith("tshark") || cmd.startsWith("tcpdump")) {
      out.push("15:36:01.102 IP 192.168.1.100.54321 > 1.1.1.1.53: 0+ A? example.com. (29)");
      out.push("15:36:01.113 IP 1.1.1.1.53 > 192.168.1.100.54321: 0 1/0/0 A 93.184.216.34 (45)");
    } else {
      out.push(`Executing system binary: ${cmd}`);
      out.push("Status: 200 OK | Execution time: 2ms");
    }

    setTerminalOutput((prev) => [...prev, ...out]);
    setTerminalInput("");
  };

  return (
    <div className="space-y-6 font-mono text-xs select-none">
      {/* Observability Header & Multi-Perspective Bar */}
      <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#20252B] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-[#4F8CFF]" />
              <h1 className="text-lg font-bold text-[#F5F5F5]">{slug.toUpperCase()} Engineering Cockpit</h1>
              <TelemetryPulse />
            </div>
            <p className="text-xs text-[#8A9098]">
              Live Jaeger distributed trace engine, multi-perspective packet telemetry, Wireshark wire spec, and failure diagnostics.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <ReadinessRing percent={100} />
            <EvidenceSealedBadge confidence={100} />
          </div>
        </div>

        {/* Multi-Perspective Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 rounded-xl border border-[#20252B] bg-[#121418] p-1">
            <span className="text-[10px] text-[#8A9098] px-2 uppercase font-bold">Perspective:</span>
            {(["PACKET", "APPLICATION", "KERNEL", "INFRASTRUCTURE", "CLOUD", "INTERVIEW"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPerspective(p)}
                className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition-all ${
                  perspective === p
                    ? "bg-[#20252B] text-[#4F8CFF] border border-[#4F8CFF]/40 shadow"
                    : "text-[#8A9098] hover:text-[#F5F5F5]"
                }`}
              >
                {p} VIEW
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-[#20252B] bg-[#121418] p-1">
            {(["TRACE", "SIMULATOR", "FAILURES", "TERMINAL"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition-all ${
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

        {/* Live Telemetry Strip */}
        <div className="grid grid-cols-6 gap-2 rounded-xl border border-[#20252B] bg-[#07080A] p-3 text-[11px] font-mono">
          <div>
            <span className="text-[9px] text-[#8A9098] uppercase block">Total RTT</span>
            <span className="text-emerald-400 font-bold">11.05 ms</span>
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
            <span className="text-[9px] text-[#8A9098] uppercase block">Cache Status</span>
            <span className="text-purple-400 font-bold">MISS (0x01)</span>
          </div>
          <div>
            <span className="text-[9px] text-[#8A9098] uppercase block">Confidence</span>
            <span className="text-emerald-400 font-bold">100% Sealed</span>
          </div>
        </div>
      </div>

      {/* Main View Mode Engine */}
      {viewMode === "TRACE" && (
        <div className="space-y-6">
          {/* Jaeger-Style Distributed Trace Viewer */}
          <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#20252B] pb-3">
              <span className="font-bold text-[#F5F5F5] text-xs flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#4F8CFF]" /> Jaeger Distributed Execution Trace (Scrubbable)
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsPlaying(!isPlaying)} className="rounded bg-[#20252B] p-1.5 text-[#F5F5F5] hover:text-[#4F8CFF]">
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => setTraceStep(0)} className="rounded bg-[#20252B] p-1.5 text-[#8A9098] hover:text-[#F5F5F5]">
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {traceEvents.map((ev, idx) => {
                const isActive = idx === traceStep;
                return (
                  <div
                    key={ev.ms}
                    onClick={() => {
                      setTraceStep(idx);
                      workspaceStore.setState({ selectedConceptId: `trace.step.${idx + 1}` });
                    }}
                    className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all ${
                      isActive
                        ? "border-[#4F8CFF] bg-[#121418] shadow-lg shadow-[#4F8CFF]/15 scale-[1.01]"
                        : "border-[#20252B] bg-[#07080A] text-[#8A9098] hover:bg-[#121418]/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-emerald-400 w-20 shrink-0 text-[10px]">{ev.ms}</span>
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
                <span>Active Step Telemetry: {currentEvent.title}</span>
                <span className="text-[#4F8CFF] font-mono">{currentEvent.proto}</span>
              </div>
              <p className="text-xs text-[#8A9098]">{currentEvent.desc}</p>
            </div>
          </div>

          {/* Wireshark Packet Inspector (Hex + Binary View) */}
          <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 space-y-4 shadow-xl font-mono">
            <span className="font-bold text-[#F5F5F5] text-xs flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-purple-400" /> Wireshark Frame 1024 Packet Inspector (Hex / Wire Spec)
            </span>

            <div className="grid grid-cols-2 gap-4 text-[11px]">
              <div className="rounded-xl border border-[#20252B] bg-[#07080A] p-3 space-y-1">
                <span className="text-[10px] text-[#8A9098] uppercase font-bold block mb-2">Wireshark Hex Dump</span>
                <div className="text-emerald-400 leading-relaxed font-mono">
                  <div>0000  00 15 5d 01 02 03 00 1c 42 11 22 33 08 00 45 00</div>
                  <div>0010  00 3c 1a 2b 40 00 40 11 7c 2a c0 a8 01 64 01 01</div>
                  <div>0020  01 01 d4 31 00 35 00 28 fe 34 1a 2b 01 00 00 01</div>
                </div>
              </div>

              <div className="rounded-xl border border-[#20252B] bg-[#07080A] p-3 space-y-2">
                <span className="text-[10px] text-[#8A9098] uppercase font-bold block">Wire Spec Decoded Header</span>
                <div className="space-y-1 text-xs text-[#F5F5F5]">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === "FAILURES" && (
        <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 space-y-4 shadow-xl">
          <span className="font-bold text-[#F5F5F5] text-xs flex items-center gap-2">
            <Terminal className="h-4 w-4 text-amber-400" /> Failure Simulator & Observability Runbooks
          </span>

          <div className="grid grid-cols-2 gap-4">
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
                  <span className="text-[10px] text-amber-400 block">{f.symptom}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#20252B] bg-[#121418] p-4 space-y-3">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Observability Remediation Playbook
              </span>
              {selectedFailure ? (
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[#8A9098] block text-[10px]">Root Cause:</span>
                    <p className="text-[#F5F5F5]">{failureScenarios.find((f) => f.title === selectedFailure)?.cause}</p>
                  </div>
                  <div>
                    <span className="text-[#8A9098] block text-[10px]">Diagnostic Command:</span>
                    <pre className="rounded bg-[#07080A] p-2 text-emerald-400 border border-[#20252B]">
                      {failureScenarios.find((f) => f.title === selectedFailure)?.cmd}
                    </pre>
                  </div>
                  <div>
                    <span className="text-[#8A9098] block text-[10px]">Expected Wireshark RCODE:</span>
                    <span className="text-amber-400 font-bold">{failureScenarios.find((f) => f.title === selectedFailure)?.expected}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#8A9098]">Select a failure scenario on the left to inspect root cause, Wireshark RCODE, and remediation commands.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {viewMode === "TERMINAL" && (
        <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 space-y-4 shadow-xl font-mono">
          <div className="flex items-center justify-between border-b border-[#20252B] pb-3">
            <span className="font-bold text-[#F5F5F5] text-xs flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" /> Embedded Systems Terminal (dig, host, tshark, nslookup)
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">SESSION ACTIVE</span>
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
              placeholder="Type dig example.com | tshark -i eth0 | host example.com..."
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
