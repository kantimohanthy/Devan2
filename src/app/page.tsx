import Link from "next/link";
import { intelligenceSnapshotService } from "@/services/intelligence-snapshot.service";
import { ReadinessRadar } from "@/components/ui/ReadinessRadar";
import { AskDevanConsole } from "@/components/ui/AskDevanConsole";
import { Eye, Shield, Activity, Target, Award } from "lucide-react";

export default async function HomePage() {
  const snapshot = await intelligenceSnapshotService.getSnapshot();
  const { currentMission, currentSprint, readinessDimensions, recentAchievements, currentWeaknesses, recommendedNextAction, systemMetrics } = snapshot;

  return (
    <div className="space-y-10 pb-12">
      {/* Header: The Eye Identity */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#20252B] pb-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#4F8CFF] uppercase tracking-widest mb-2 font-semibold">
            <Eye className="h-4 w-4 animate-pulse" />
            THE EYE · Live Engineering Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]">
            Continuous Engineering State of Ujwal
          </h1>
          <p className="mt-2 text-sm text-[#8A9098] max-w-2xl leading-relaxed font-sans">
            Modeling, reasoning about, and evolving Ujwal&apos;s engineering intelligence across Layer 1 (Engineering Canon) and Layer 2 (Evidence-Backed Experience).
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-[#20252B] bg-[#0A0B0D] p-4 font-mono text-xs">
          <div>
            <span className="text-[#8A9098] block text-[10px] uppercase">STATION F Countdown</span>
            <span className="text-[#F5F5F5] font-bold text-base">{currentSprint.relocationCountdownDays} Days</span>
          </div>
          <div className="h-8 w-px bg-[#20252B]" />
          <div>
            <span className="text-[#8A9098] block text-[10px] uppercase">Learning Velocity</span>
            <span className="text-emerald-400 font-bold text-base">{currentSprint.learningVelocityPercent}%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Mission Deck & Readiness Radar */}
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left Column: Live Mission & Sprint Focus */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D]/80 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#4F8CFF] uppercase tracking-wider flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5" /> Current Mission
              </span>
              <span className="font-mono text-xs font-bold text-[#F5F5F5]">
                {currentMission.progressPercent}% Complete
              </span>
            </div>

            <Link href="/missions/wireless-mesh-tvws" className="block group">
              <h2 className="text-xl font-semibold text-[#F5F5F5] group-hover:text-[#4F8CFF] transition-colors">
                {currentMission.title}
              </h2>
              <p className="mt-1 text-xs text-[#8A9098] leading-relaxed">
                {currentMission.objective}
              </p>
            </Link>

            <div className="space-y-2 pt-2">
              {currentMission.objectives.map((obj) => (
                <div key={obj.label} className="flex items-center justify-between font-mono text-xs text-[#8A9098]">
                  <span>{obj.label}</span>
                  <span className={obj.done ? "text-emerald-400" : "text-[#424750]"}>
                    {obj.done ? "✓ COMPLETED" : "IN PROGRESS"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Action Card */}
          <div className="rounded-2xl border border-[#4F8CFF]/30 bg-[#4F8CFF]/5 p-6 space-y-2">
            <span className="font-mono text-xs font-semibold text-[#4F8CFF] uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" /> Automated Recommended Next Action
            </span>
            <p className="text-sm font-semibold text-[#F5F5F5]">{recommendedNextAction}</p>
          </div>

          {/* Recent Achievements Stream */}
          <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D]/80 p-6 space-y-3 font-mono text-xs">
            <span className="font-semibold text-[#8A9098] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-amber-400" /> Recent Achievements & Verification Proofs
            </span>
            <div className="space-y-2 pt-1">
              {recentAchievements.map((ach) => (
                <div key={ach.title} className="flex items-center justify-between border-t border-[#20252B] pt-2 text-[#F5F5F5]">
                  <span>{ach.title}</span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-[#8A9098]">{ach.date}</span>
                    <span className="rounded bg-[#20252B] px-1.5 py-0.5 text-[10px] text-[#4F8CFF]">{ach.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Metrics Strip */}
          <div className="grid grid-cols-4 gap-4 font-mono text-center">
            <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-3">
              <span className="block text-[10px] text-[#8A9098] uppercase">Concepts</span>
              <span className="text-lg font-bold text-white">{systemMetrics.totalConceptsTracked}</span>
            </div>
            <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-3">
              <span className="block text-[10px] text-[#8A9098] uppercase">Artifacts</span>
              <span className="text-lg font-bold text-white">{systemMetrics.totalEvidenceArtifacts}</span>
            </div>
            <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-3">
              <span className="block text-[10px] text-[#8A9098] uppercase">Repos</span>
              <span className="text-lg font-bold text-white">{systemMetrics.verifiedRepositories}</span>
            </div>
            <div className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-3">
              <span className="block text-[10px] text-[#8A9098] uppercase">CI Tests</span>
              <span className="text-lg font-bold text-emerald-400">{systemMetrics.testAssertionsPassing} Pass</span>
            </div>
          </div>
        </div>

        {/* Right Column: 4-Dimension Readiness Quadrant */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D]/80 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#20252B] pb-3">
              <span className="font-mono text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#4F8CFF]" /> Readiness Dimensions
              </span>
              <span className="font-mono text-[10px] text-[#8A9098] uppercase">KNW · EXP · EVI · CNF</span>
            </div>

            <ReadinessRadar dimensions={readinessDimensions} />
          </div>

          {/* Current Weaknesses & Gaps */}
          <div className="rounded-2xl border border-[#20252B] bg-[#0A0B0D]/80 p-6 space-y-3 font-mono text-xs">
            <span className="font-semibold text-[#8A9098] uppercase tracking-wider text-[10px] block">
              Diagnosed Engineering Gaps
            </span>
            {currentWeaknesses.map((w) => (
              <div key={w.domain} className="border-t border-[#20252B] pt-2.5 space-y-1">
                <div className="flex justify-between text-[#F5F5F5]">
                  <span>{w.domain}</span>
                  <span className="text-[#8A9098]">{w.gap}</span>
                </div>
                <p className="text-[11px] text-[#4F8CFF]">{w.recommendedAction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ask DEVAN Reasoning Console */}
      <AskDevanConsole />
    </div>
  );
}
