import type { NodeId } from "@/data/types";
import { cn } from "@/lib/utils";

export function DomainMotif({ domain, className }: { domain: NodeId; className?: string }) {
  return (
    <div className={cn("relative h-28 w-full overflow-hidden rounded-xl bg-background-secondary", className)}>
      <svg viewBox="0 0 300 120" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
        {domain === "networking" && (
          <>
            <circle cx="24" cy="60" r="5" fill="#4F8CFF" />
            <circle cx="276" cy="60" r="5" fill="#4F8CFF" opacity="0.6" />
            <line
              x1="24"
              y1="60"
              x2="276"
              y2="60"
              stroke="#4F8CFF"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              className="animate-dash-flow"
              opacity="0.7"
            />
            <line x1="60" y1="30" x2="240" y2="30" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="60" y1="90" x2="240" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          </>
        )}

        {(domain === "ai" || domain === "cloud") && (
          <>
            {[
              [60, 40],
              [110, 70],
              [160, 35],
              [210, 65],
              [150, 90],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                fill="#4F8CFF"
                className="animate-pulse-dot"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
            <path
              d="M60 40 L110 70 L160 35 L210 65 L150 90 L60 40"
              fill="none"
              stroke="rgba(79,140,255,0.35)"
              strokeWidth="1"
            />
          </>
        )}

        {domain === "space" && (
          <g transform="translate(150,60)">
            <circle r="46" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
            <circle r="28" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <circle r="6" fill="#4F8CFF" />
            <g className="animate-orbit-spin">
              <circle cx="46" cy="0" r="3.5" fill="#F5F5F5" />
            </g>
            <g className="animate-orbit-spin-slow">
              <circle cx="-28" cy="0" r="2.5" fill="#B8B8B8" />
            </g>
            <circle cx="-90" cy="-30" r="1.2" fill="#B8B8B8" />
            <circle cx="95" cy="20" r="1.2" fill="#B8B8B8" />
            <circle cx="70" cy="-40" r="1" fill="#B8B8B8" />
          </g>
        )}

        {domain === "finance" && (
          <>
            <polyline
              points="20,90 60,70 90,80 120,45 150,55 180,25 210,40 250,15 280,30"
              fill="none"
              stroke="#4F8CFF"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              className="animate-dash-flow"
            />
            <line x1="10" y1="100" x2="290" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          </>
        )}

        {domain === "cybersecurity" && (
          <>
            <g opacity="0.5">
              {Array.from({ length: 6 }).map((_, row) =>
                Array.from({ length: 10 }).map((_, col) => (
                  <rect
                    key={`${row}-${col}`}
                    x={14 + col * 28}
                    y={10 + row * 18}
                    width="10"
                    height="10"
                    fill="rgba(79,140,255,0.18)"
                  />
                ))
              )}
            </g>
            <rect x="0" y="0" width="40" height="120" fill="rgba(79,140,255,0.25)" className="animate-sweep-x" />
          </>
        )}

        {domain === "distributed-systems" && (
          <>
            {[
              [50, 30],
              [150, 20],
              [250, 40],
              [70, 90],
              [180, 95],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                fill="#4F8CFF"
                className="animate-pulse-dot"
                style={{ animationDelay: `${i * 0.25}s` }}
              />
            ))}
            <line x1="50" y1="30" x2="150" y2="20" stroke="rgba(79,140,255,0.3)" strokeWidth="1" />
            <line x1="150" y1="20" x2="250" y2="40" stroke="rgba(79,140,255,0.3)" strokeWidth="1" />
            <line x1="50" y1="30" x2="70" y2="90" stroke="rgba(79,140,255,0.3)" strokeWidth="1" />
            <line x1="150" y1="20" x2="180" y2="95" stroke="rgba(79,140,255,0.3)" strokeWidth="1" />
            <line x1="250" y1="40" x2="180" y2="95" stroke="rgba(79,140,255,0.3)" strokeWidth="1" />
          </>
        )}

        {domain === "systems" && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <circle
                key={i}
                cx={40 + i * 55}
                cy={60}
                r={4}
                fill="#4F8CFF"
                className="animate-pulse-dot"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
            <line x1="20" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          </>
        )}
      </svg>
    </div>
  );
}
