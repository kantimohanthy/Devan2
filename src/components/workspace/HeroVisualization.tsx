"use client";

import React, { useState } from "react";
import { Play, Pause, RotateCcw, Activity, Terminal, ArrowRight } from "lucide-react";
import { ExecutionPulseBadge, EvidenceSealedBadge } from "./UJOSMotifs";

export function HeroVisualization() {
  const [activeTab, setActiveTab] = useState<"PACKET_FLOW" | "KERNEL_TRANSITION">("PACKET_FLOW");
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);

  const packetFlowSteps = [
    { title: "1. Browser / App Layer", desc: "Constructs HTTP GET request & resolves DNS hostname", concept: "networking.http", rfc: "RFC 7230", tool: "curl -v", qa: "What is the HTTP request line format?" },
    { title: "2. POSIX Socket Layer", desc: "Invokes connect() and write() syscalls into Linux VFS", concept: "posix.sockets", rfc: "POSIX.1-2008", tool: "strace -e connect", qa: "What is non-blocking socket I/O?" },
    { title: "3. TCP Transport Layer", desc: "Appends TCP header (Src Port: 54321, Dst Port: 443, SEQ: 1000)", concept: "networking.tcp", rfc: "RFC 793", tool: "ss -tani", qa: "How does TCP 3-way handshake work?" },
    { title: "4. IPv4 Network Layer", desc: "Wraps packet with IP header (Src IP: 192.168.1.100, Dst IP: 1.1.1.1)", concept: "networking.ipv4", rfc: "RFC 791", tool: "ip route get 1.1.1.1", qa: "What is IP packet fragmentation?" },
    { title: "5. Ethernet NIC Buffer", desc: "Places Frame into Driver TX Ring Buffer & emits PHY signal", concept: "linux.nic-driver", rfc: "IEEE 802.3", tool: "ethtool -S eth0", qa: "What is Ring Buffer overflow?" },
  ];

  const kernelSteps = [
    { title: "1. User Space App", desc: "Application executes in Ring 3 user mode", concept: "linux.user-space", rfc: "x86_64 ABI", tool: "ps aux", qa: "What is user vs kernel space boundary?" },
    { title: "2. SYSCALL Trigger", desc: "CPU switches to Ring 0 kernel mode via sysenter/syscall", concept: "linux.syscall", rfc: "Linux x86_64", tool: "strace", qa: "How much overhead does a syscall cost?" },
    { title: "3. VFS / Subsystem", desc: "Kernel evaluates file descriptor permission & lock", concept: "linux.vfs", rfc: "VFS Specs", tool: "lsof", qa: "What is everything is a file in Unix?" },
    { title: "4. Hardware Driver", desc: "Device driver triggers DMA memory transfer", concept: "linux.device-drivers", rfc: "Kernel Module ABI", tool: "dmesg", qa: "What is DMA memory mapping?" },
    { title: "5. SYSRET Return", desc: "Returns execution control to user space thread", concept: "linux.context-switch", rfc: "Scheduler Specs", tool: "perf stat", qa: "What triggers a context switch?" },
  ];

  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentSteps = activeTab === "PACKET_FLOW" ? packetFlowSteps : kernelSteps;
  const currentItem = currentSteps[step];

  return (
    <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-5 font-mono text-xs space-y-4 shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#20252B] pb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#4F8CFF]" />
          <span className="font-bold text-[#F5F5F5] uppercase tracking-wider text-xs">Execution Explorer (Interactive Path)</span>
          <ExecutionPulseBadge />
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-[#20252B] bg-[#121418] p-1">
          <button
            onClick={() => { setActiveTab("PACKET_FLOW"); setStep(0); }}
            className={`rounded px-2.5 py-1 text-[10px] transition-colors ${activeTab === "PACKET_FLOW" ? "bg-[#20252B] text-[#4F8CFF] font-semibold" : "text-[#8A9098]"}`}
          >
            Packet Flow
          </button>
          <button
            onClick={() => { setActiveTab("KERNEL_TRANSITION"); setStep(0); }}
            className={`rounded px-2.5 py-1 text-[10px] transition-colors ${activeTab === "KERNEL_TRANSITION" ? "bg-[#20252B] text-emerald-400 font-semibold" : "text-[#8A9098]"}`}
          >
            Kernel/User Syscall
          </button>
        </div>
      </div>

      {/* Interactive Progression */}
      <div className="relative rounded-xl border border-[#20252B] bg-[#07080A] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#8A9098] uppercase tracking-wider">
            Step {step + 1} of 5 — Click any node to inspect deep execution telemetry
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsPlaying(!isPlaying)} className="rounded bg-[#20252B] p-1.5 text-[#F5F5F5] hover:text-[#4F8CFF]">
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <button onClick={() => setStep(0)} className="rounded bg-[#20252B] p-1.5 text-[#8A9098] hover:text-[#F5F5F5]">
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {currentSteps.map((s, idx) => {
            const isActive = idx === step;
            return (
              <div
                key={s.title}
                onClick={() => setStep(idx)}
                className={`rounded-xl border p-3 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "border-[#4F8CFF] bg-[#121418] shadow-lg shadow-[#4F8CFF]/10 scale-105"
                    : "border-[#20252B] bg-[#0A0B0D]/50 text-[#8A9098]"
                }`}
              >
                <div className="text-[10px] font-bold text-[#F5F5F5] mb-1">{s.title}</div>
                <p className="text-[9px] leading-tight line-clamp-2">{s.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Deep Inspection Panel */}
        <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#20252B] pb-2">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#4F8CFF]" />
              <span className="font-bold text-[#F5F5F5]">{currentItem.title}</span>
            </div>
            <EvidenceSealedBadge confidence={99} />
          </div>

          <div className="grid grid-cols-3 gap-3 text-[11px]">
            <div>
              <span className="text-[10px] text-[#8A9098] uppercase font-semibold block">Ontology Concept</span>
              <span className="text-[#4F8CFF] font-semibold">{currentItem.concept}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8A9098] uppercase font-semibold block">RFC / Standard</span>
              <span className="text-[#F5F5F5]">{currentItem.rfc}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8A9098] uppercase font-semibold block">Diagnostic Command</span>
              <span className="text-purple-400 font-semibold">{currentItem.tool}</span>
            </div>
          </div>

          <div className="rounded-lg bg-[#121418] p-2.5 border border-[#20252B] flex items-center justify-between text-[11px]">
            <div>
              <span className="text-[10px] text-amber-400 uppercase font-semibold block">Interview Question</span>
              <span className="text-[#F5F5F5]">{currentItem.qa}</span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-[#8A9098]" />
          </div>
        </div>
      </div>
    </div>
  );
}
