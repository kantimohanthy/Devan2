"use client";

import { useState } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Play } from "lucide-react";

type CommandKey =
  | "sys-info"
  | "dns-query"
  | "whois-rdap"
  | "tls-inspect"
  | "asn-lookup"
  | "inspect-cineforge"
  | "benchmark-ai";

const COMMAND_OUTPUTS: Record<CommandKey, string[]> = {
  "sys-info": [
    "$ devan-cli --sys-info",
    "--------------------------------------------------",
    "KERNEL      : UJ.OS v2.4.0 (x86_64-linux-edge)",
    "API MATRIX  : Module 1 (Foundation), Module 2 (Auth/RBAC)",
    "MONITORING  : Module 3 (Telemetry), Module 5 (Net-Intel + Cymru ASN)",
    "STATUS      : 100% Operational (PostgreSQL + JWT + DoH + RDAP + Vitest)",
  ],
  "dns-query": [
    "$ GET /api/net/dns?domain=kantimohanthy.dev&type=A",
    "--------------------------------------------------",
    "QUERY METHOD: Cloudflare DoH (DNS-over-HTTPS)",
    "DOMAIN      : kantimohanthy.dev",
    "TYPE        : A Record",
    "STATUS      : NOERROR (TTL 300s)",
    "ANSWER      : 104.21.72.180, 172.67.195.82",
    "CACHE       : HIT (x-cache: HIT)",
  ],
  "whois-rdap": [
    "$ GET /api/net/whois?domain=kantimohanthy.dev",
    "--------------------------------------------------",
    "PROTOCOL    : RDAP (RESTful Domain Registration Data)",
    "DOMAIN      : kantimohanthy.dev",
    "REGISTRAR   : Google Cloud Domains / Squarespace",
    "STATUS      : clientTransferProhibited",
    "NAMESERVERS : ns1.dns-parking.com, ns2.dns-parking.com",
    "CACHE       : HIT (x-cache: HIT)",
  ],
  "tls-inspect": [
    "$ GET /api/net/tls?host=kantimohanthy.dev",
    "--------------------------------------------------",
    "PROTOCOL    : TLS 1.3 / X.509 Peer Certificate",
    "ISSUER      : Let's Encrypt / Cloudflare Inc E6",
    "SUBJECT     : kantimohanthy.dev",
    "VALIDATION  : OK (218 days remaining)",
    "CACHE       : HIT (x-cache: HIT)",
  ],
  "asn-lookup": [
    "$ GET /api/net/asn?ip=104.21.72.180",
    "--------------------------------------------------",
    "PROVIDER    : Team Cymru WHOIS-over-DNS Service",
    "TARGET IP   : 104.21.72.180",
    "AUTONOMOUS  : AS13335 (Cloudflare Inc.)",
    "PREFIX      : 104.21.64.0/20",
    "REGISTRY    : ARIN (US / Allocated 2014-03-28)",
  ],
  "inspect-cineforge": [
    "$ inspect project --slug cineforge-ai",
    "PROJECT     : CineForge AI Pro",
    "DOMAIN      : Artificial Intelligence & Distributed Pipelines",
    "BENCHMARK   : 14.2ms per frame inference @ 4K resolution",
    "STATUS      : Shipped & Submitted (IBM Competition Entry)",
    "REPO        : github.com/kantimohanthy/cineforge-ai",
  ],
  "benchmark-ai": [
    "$ devan-bench --model all-MiniLM-L6-v2",
    "MODEL TYPE  : ONNX Runtime (384-dimensional vectors)",
    "IN-BROWSER  : WebAssembly accelerated",
    "COSINE SIM  : 0.941 match precision across static embeddings",
    "MEM USAGE   : ~24.8 MB cached asset memory",
  ],
};

export function InteractiveTerminal() {
  const [activeCmd, setActiveCmd] = useState<CommandKey>("sys-info");
  const [inputVal, setInputVal] = useState("");

  const handleRunCustom = () => {
    const query = inputVal.trim().toLowerCase();
    if (query.includes("asn") || query.includes("ip")) {
      setActiveCmd("asn-lookup");
    } else if (query.includes("dns")) {
      setActiveCmd("dns-query");
    } else if (query.includes("whois") || query.includes("rdap")) {
      setActiveCmd("whois-rdap");
    } else if (query.includes("tls") || query.includes("cert")) {
      setActiveCmd("tls-inspect");
    } else if (query.includes("cineforge") || query.includes("project")) {
      setActiveCmd("inspect-cineforge");
    } else if (query.includes("bench") || query.includes("ai")) {
      setActiveCmd("benchmark-ai");
    } else {
      setActiveCmd("sys-info");
    }
    setInputVal("");
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black/80 p-5 font-mono text-xs text-white shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2 text-white/70">
          <TerminalIcon size={14} className="text-blue-400" />
          <span className="font-semibold text-white">Interactive Engineering CLI (Telemetry & Net-Intel)</span>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(
          [
            "sys-info",
            "dns-query",
            "whois-rdap",
            "tls-inspect",
            "asn-lookup",
            "inspect-cineforge",
            "benchmark-ai",
          ] as CommandKey[]
        ).map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => setActiveCmd(cmd)}
            className={`rounded-lg px-2.5 py-1.5 text-[11px] transition-all cursor-pointer border ${
              activeCmd === cmd
                ? "border-blue-400 bg-blue-500/20 text-white font-semibold"
                : "border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:text-white"
            }`}
          >
            <Play size={10} className="inline-block mr-1.5 text-blue-400" />
            {cmd}
          </button>
        ))}
      </div>

      <div className="min-h-[140px] rounded-xl bg-black/90 p-4 border border-white/5 space-y-1 overflow-x-auto text-blue-300/90 leading-relaxed">
        {COMMAND_OUTPUTS[activeCmd].map((line, idx) => (
          <div
            key={idx}
            className={
              line.startsWith("$")
                ? "text-emerald-400 font-bold"
                : "text-white/80"
            }
          >
            {line}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-emerald-400 font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRunCustom()}
          placeholder="Type command ('asn', 'dns', 'whois', 'tls', 'bench')..."
          className="flex-1 bg-transparent text-white outline-none placeholder:text-white/30 text-xs"
        />
        <button
          type="button"
          onClick={handleRunCustom}
          className="grid place-items-center rounded-lg border border-white/10 p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <CornerDownLeft size={13} />
        </button>
      </div>
    </div>
  );
}
