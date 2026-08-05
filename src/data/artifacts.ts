import { Artifact } from "./artifact-schema";

export const artifacts: Artifact[] = [
  {
    id: "dns-http-vertical-slice",
    title: "Computer Networking Vertical Slice — DNS/HTTP",
    summary:
      "One topic from Kurose & Ross taken through the full evidence pipeline instead of just read.",
    motivation:
      "Reading a networking textbook chapter tells you what DNS resolution or HTTP request handling is supposed to do. It doesn't tell you what happens when you actually build the thing and it doesn't do that. I wanted one real experiment — source to concept to a question I couldn't answer from the book alone to something I actually ran to an artifact I can point at.",
    problem:
      "Deciding between DNS and HTTP as the first real vertical slice, and scoping it narrowly enough to actually finish rather than sprawling into a full protocol stack implementation before any of it is proven out.",

    architecture: [
      {
        component: "Wire-format encoder",
        description:
          "Hand-builds the 12-byte DNS header and question section as raw bytes — no dns library. Sets RD=0 deliberately, so root/TLD servers return a referral instead of doing recursion for us; that's the whole point of an iterative resolver.",
      },
      {
        component: "Wire-format decoder",
        description:
          "Parses the header, then walks answer/authority/additional resource records. The one non-trivial part is DNS name compression — a name in a response can be a pointer (top two bits of the length byte set) into an earlier part of the message instead of repeating bytes. Decoding this correctly is what makes referral responses parseable at all.",
      },
      {
        component: "UDP query layer",
        description:
          "Sends the encoded query over UDP/53 via Node's dgram module, matches the response by query ID (rejecting mismatched IDs, since an unmatched ID could mean a stale or spoofed packet), and times out after 4 seconds per hop.",
      },
      {
        component: "Iterative resolver loop",
        description:
          "Starts from a hardcoded root server, follows NS referrals hop by hop (root → TLD → authoritative), using glue A records from the additional section to avoid a second lookup where possible. Falls back to resolving a nameserver's own address separately when no glue record is given — the case most simplified resolvers skip. Follows CNAME chains by restarting resolution from root under the target name. Caps at 10 hops to avoid infinite referral loops.",
      },
      {
        component: "CLI",
        description:
          "Takes a domain and record type (A/AAAA) as arguments, prints the final answer plus the full referral chain it walked to get there — the part a normal `dns.lookup()` call hides.",
      },
    ],
    technologies: ["Node.js", "dgram (UDP sockets)", "no external DNS libraries"],

    benchmarks: [],
    diagrams: [],
    screenshots: [],

    relatedConcepts: ["networking", "systems"],
    lessonsLearned: [],

    references: [
      {
        title: "Computer Networking: A Top-Down Approach (Kurose & Ross)",
        url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networking-a-top-down-approach/P200000003335",
      },
    ],

    status: "building",
    difficulty: "solid",
    engineeringDomain: "networking",
    tags: ["DNS", "HTTP", "Evidence Graph", "Vertical Slice"],

    startedAt: "2026-07-01",
  },
];
