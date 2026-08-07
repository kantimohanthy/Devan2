"use client";

import { useState } from "react";
import { ONTOLOGY_MISSIONS } from "@/lib/ontology/store";
import { CheckSquare, Square, Target } from "lucide-react";

export function MissionsDeck() {
  const [missions, setMissions] = useState(ONTOLOGY_MISSIONS);

  const toggleSubtask = (missionId: string, subtaskId: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id !== missionId) return m;
        const nextSubtasks = m.subtasks.map((st: { id: string; label: string; completed: boolean }) =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        const completedCount = nextSubtasks.filter((st: { id: string; label: string; completed: boolean }) => st.completed).length;
        const progressPercent = Math.round((completedCount / nextSubtasks.length) * 100);
        return { ...m, subtasks: nextSubtasks, progressPercent };
      })
    );
  };

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#20252B] pb-2 text-[#8A9098]">
        <span className="font-semibold uppercase tracking-wider text-[10px] text-[#4F8CFF] flex items-center gap-1.5">
          <Target size={12} /> Operational Missions
        </span>
        <span className="text-[10px] text-[#31D07D] font-bold">2 ACTIVE</span>
      </div>

      <div className="space-y-3">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="rounded-xl border border-[#20252B] bg-[#0A0B0D] p-3.5 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#4F8CFF] uppercase font-bold">{mission.domain}</span>
                <h4 className="text-xs font-bold text-[#F5F5F5]">{mission.title}</h4>
              </div>
              <span className="text-xs font-bold text-[#31D07D]">{mission.progressPercent}%</span>
            </div>

            <p className="text-[11px] text-[#8A9098]">{mission.objective}</p>

            <div className="h-1.5 w-full rounded-full bg-[#20252B] overflow-hidden">
              <div
                className="h-full bg-[#4F8CFF] transition-all duration-300"
                style={{ width: `${mission.progressPercent}%` }}
              />
            </div>

            <div className="space-y-1 pt-1 text-[11px]">
              {mission.subtasks.map((st: { id: string; label: string; completed: boolean }) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => toggleSubtask(mission.id, st.id)}
                  className="w-full flex items-center gap-2 text-left text-[#8A9098] hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  {st.completed ? (
                    <CheckSquare size={13} className="text-[#31D07D] shrink-0" />
                  ) : (
                    <Square size={13} className="text-[#8A9098] shrink-0" />
                  )}
                  <span className={st.completed ? "line-through opacity-70" : ""}>
                    {st.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
