import { KnowledgeTree, TreeNode } from "@/components/KnowledgeTree";

const tree: TreeNode[] = [
  {
    name: "Protocols",
    children: [
      {
        name: "DNS",
        href: "/knowledge/dns",
        state: "TESTED",
        badge: "2 experiments",
        children: [
          { name: "RFC1035", leaf: true, badge: "source" },
          { name: "Iterative resolution trace", href: "/laboratory/dns-iterative-resolution", leaf: true, badge: "TESTED", state: "TESTED" },
        ],
      },
      {
        name: "HTTP",
        href: "/knowledge/http",
        state: "ENCOUNTERED",
        unverified: true,
        badge: "unverified",
        children: [
          { name: "Waterfall analysis", leaf: true, badge: "not yet run", unverified: true },
        ],
      },
    ],
  },
  {
    name: "RF & Spectrum",
    children: [
      {
        name: "RF propagation in occluded terrain",
        href: "/knowledge/rf-propagation-occluded-terrain",
        state: "STUDIED",
        badge: "1 source",
        children: [
          { name: "TV White Space allocation", href: "/knowledge/tvws-allocation", leaf: true, badge: "STUDIED", state: "STUDIED" },
        ],
      },
    ],
  },
];

export default function KnowledgePage() {
  return (
    <div>
      <div className="mb-7">
        <div className="text-[11px] uppercase tracking-wide text-text-3 mb-2">Knowledge</div>
        <h1 className="text-[30px] font-semibold tracking-tight mb-2">Networking</h1>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[600px]">
          Hierarchical concept tree — expand to see how each concept connects to the experiments and
          evidence that tested it.
        </p>
      </div>
      <KnowledgeTree nodes={tree} />
    </div>
  );
}
