"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, X, ShieldCheck, Network, Target } from "lucide-react";

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem("devan_onboarding_seen");
    if (!seen) {
      setIsOpen(true);
    }
  }, []);

  if (!isOpen) return null;

  const tourSteps = [
    {
      title: "Welcome to DEVAN OS 2.1",
      subtitle: "A Cognitive Operating System for Engineering Intelligence.",
      desc: "DEVAN is not a static portfolio or documentation site. It is a live, queryable engineering intelligence system backing protocol engineering, kernel internals, and ground proof evidence.",
      icon: Sparkles,
    },
    {
      title: "1. Mission Control & Operational Readiness",
      subtitle: "Situational awareness at a glance.",
      desc: "Track active missions, readiness radar scores, verified git commits, and real-time execution metrics.",
      icon: Target,
    },
    {
      title: "2. The Knowledge & Atlas Graph",
      subtitle: "Topological graph navigation.",
      desc: "Explore concepts, wire specs, RFCs, and failure modes through an interactive 60 FPS graph engine.",
      icon: Network,
    },
    {
      title: "3. Ground Proof Evidence & Oracle Reasoning",
      subtitle: "Immutable verification ledger.",
      desc: "Every concept is backed by Wireshark PCAPs, synthetic traces, and deterministic Oracle reasoning context.",
      icon: ShieldCheck,
    },
  ];

  const handleNext = () => {
    if (step < tourSteps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      localStorage.setItem("devan_onboarding_seen", "true");
      setIsOpen(false);
    }
  };

  const current = tourSteps[step];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-mono text-xs">
      <div className="w-full max-w-lg rounded-2xl border border-[#20252B] bg-[#0A0B0D] p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#20252B] pb-3">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-[#4F8CFF]" />
            <span className="font-bold text-[#F5F5F5] text-sm">{current.title}</span>
          </div>
          <button
            onClick={() => {
              localStorage.setItem("devan_onboarding_seen", "true");
              setIsOpen(false);
            }}
            className="rounded p-1 text-[#8A9098] hover:text-[#F5F5F5]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-[#4F8CFF]">{current.subtitle}</div>
          <p className="text-xs text-[#8A9098] leading-relaxed">{current.desc}</p>
        </div>

        <div className="flex items-center justify-between border-t border-[#20252B] pt-4">
          <span className="text-[10px] text-[#8A9098]">Step {step + 1} of 4</span>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-xl bg-[#4F8CFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#70A3FF] transition-colors"
          >
            <span>{step === tourSteps.length - 1 ? "Start Exploring DEVAN" : "Next Step"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
