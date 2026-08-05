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

    architecture: [],
    technologies: ["TypeScript", "Node.js"],

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
