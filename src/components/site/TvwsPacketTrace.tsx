"use client";

import { useState } from "react";

const clusters = [1, 2, 3];
const devices = [1, 2, 3];
const clusterX = (cluster: number) => 110 + (cluster - 1) * 190;
const deviceX = (cluster: number, device: number) => clusterX(cluster) + (device - 2) * 52;

export function TvwsPacketTrace() {
  const [selected, setSelected] = useState(1);
  const [failed, setFailed] = useState(false);
  const cluster = Math.ceil(selected / 3);
  const device = (selected - 1) % 3 + 1;

  return (
    <section aria-labelledby="tvws-trace" className="mt-12 rounded-2xl border border-ivory/15 p-4 sm:p-6">
      <h2 id="tvws-trace" className="display text-3xl text-ivory">Trace a packet</h2>
      <p className="mt-2 text-ivory-2">
        Choose a device to follow its local mesh hop and the TV white space uplink to the gateway.
      </p>
      <div className="mt-5 flex flex-wrap items-end gap-4">
        <label className="grid gap-1 text-sm text-ivory">
          Source device
          <select
            value={selected}
            onChange={(event) => {
              setSelected(Number(event.target.value));
              setFailed(false);
            }}
            className="min-h-[44px] rounded-lg border border-ivory/30 bg-[#181613] px-3 text-ivory focus-visible:outline-2 focus-visible:outline-teal"
          >
            {clusters.map((group) => (
              <optgroup key={group} label={`Cluster ${group}`}>
                {devices.map((node) => {
                  const id = (group - 1) * 3 + node;
                  return <option key={id} value={id}>Device {id}</option>;
                })}
              </optgroup>
            ))}
          </select>
        </label>
        <button
          type="button"
          aria-pressed={failed}
          onClick={() => setFailed(!failed)}
          className="min-h-[44px] rounded-lg border border-ivory/30 px-3 text-sm text-ivory hover:border-teal focus-visible:outline-2 focus-visible:outline-teal"
        >
          Simulate uplink failure
        </button>
      </div>
      <figure className="mt-5">
        <svg aria-hidden="true" viewBox="0 0 600 240" className="w-full rounded-xl bg-[#181613] font-mono">
          {clusters.map((group) => (
            <g key={group}>
              <line x1="300" y1="40" x2={clusterX(group)} y2="119"
                stroke={group === cluster ? (failed ? "#fb8181" : "#F2A65A") : "#77716a"}
                strokeWidth={group === cluster ? 4 : 2} strokeDasharray="8 5" />
              {devices.map((node) => (
                <line key={node} x1={clusterX(group)} y1="119" x2={deviceX(group, node)} y2="192"
                  stroke={group === cluster && node === device ? "#F2A65A" : "#77716a"}
                  strokeWidth={group === cluster && node === device ? 4 : 2} />
              ))}
              <rect x={clusterX(group) - 8} y="111" width="16" height="16" rx="2" fill="#80c9ff" />
              <text x={clusterX(group)} y="151" textAnchor="middle" fill="#eee7db" fontSize="18">Head {group}</text>
              {devices.map((node) => {
                const id = (group - 1) * 3 + node;
                return (
                  <g key={node}>
                    <circle cx={deviceX(group, node)} cy="192" r={id === selected ? 9 : 6}
                      fill={id === selected ? "#F2A65A" : "#9ecba6"} />
                    <text x={deviceX(group, node)} y="220" textAnchor="middle" fill="#eee7db" fontSize="18">{id}</text>
                  </g>
                );
              })}
            </g>
          ))}
          <circle cx="300" cy="40" r="9" fill="#fb8181" />
          <text x="300" y="23" textAnchor="middle" fill="#eee7db" fontSize="18">Gateway</text>
        </svg>
        <figcaption className="mt-3 text-sm text-ivory-2">
          Solid lines show local wireless mesh links. Dashed lines show TVWS uplinks.
          Illustrative redraw based on the thesis draft’s Figure 5.2.
        </figcaption>
      </figure>
      <p role="status" className="mt-4 text-sm text-ivory">
        {failed
          ? `Device ${selected} reaches cluster head ${cluster}. Its TVWS uplink is down and this topology has no alternate path to the gateway.`
          : `Device ${selected} → cluster head ${cluster} (local mesh) → gateway (TVWS uplink).`}
      </p>
    </section>
  );
}
