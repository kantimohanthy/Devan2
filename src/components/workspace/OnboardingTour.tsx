"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, X, ShieldCheck, Network, Target } from "lucide-react";

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  // The tour never opens on its own. It is offered from the DEVAN overview
  // ("Take the tour") and can be dismissed at any step.
  useEffect(() => {
    const open = () => {
      setStep(0);
      setIsOpen(true);
    };
    window.addEventListener("devan:tour", open);
    return () => window.removeEventListener("devan:tour", open);
  }, []);

  if (!isOpen) return null;

  const tourSteps = [
    {
      title: "Welcome to DEVAN",
      subtitle: "Ujwal's engineering workspace.",
      desc: "DEVAN is the deeper layer behind kantimohanthy.dev: the concepts Ujwal has studied, the experiments he has run, and the evidence behind them, linked as a graph. Some views use seeded sample data while the graph grows; those are labelled.",
      icon: Sparkles,
    },
    {
      title: "1. Overview & missions",
      subtitle: "What's being worked on.",
      desc: "Active work such as the Wireless Mesh + TV White Space thesis, with progress stated as objectives done and not done, not percentages.",
      icon: Target,
    },
    {
      title: "2. Knowledge & Atlas graph",
      subtitle: "Navigate by connection.",
      desc: "Explore concepts, RFCs and how they relate. Each concept shows the evidence state derived from attached records.",
      icon: Network,
    },
    {
      title: "3. Evidence",
      subtitle: "Where claims point.",
      desc: "Evidence records link a source, a question, the experiment that was run and its raw outcome, starting with an iterative DNS resolution traced with dig and tshark.",
      icon: ShieldCheck,
    },
  ];

  const handleNext = () => {
    if (step < tourSteps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      try { localStorage.setItem("devan_onboarding_seen", "true"); } catch {}
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
              try { localStorage.setItem("devan_onboarding_seen", "true"); } catch {}
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
