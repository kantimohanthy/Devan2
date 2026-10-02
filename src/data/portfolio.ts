/**
 * Public portfolio content for the personal homepage and case studies.
 *
 * Rules for this file:
 *  - Every status is stated in words (Ongoing, Early stage, Shipped), never as a percentage.
 *  - Only claim what can be pointed to. If a write up isn't ready, say so in `writeUpStatus`
 *    instead of padding the section.
 *  - Keep demo / seeded data clearly labelled.
 */

export type Status = "Ongoing" | "Shipped" | "Early stage" | "Submitted" | "Completed";

export interface LinkRef {
  label: string;
  href: string;
  external?: boolean;
}

export interface CaseStudySection {
  heading: string;
  body?: string;
  points?: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  context: string; // where / for whom
  period: string;
  status: Status;
  summary: string; // one or two sentences for the card
  tags: string[];
  sections: CaseStudySection[]; // Problem → Built → Decisions → What broke → Evidence → Open
  links: LinkRef[];
  writeUpStatus?: string;
}

export const person = {
  name: "Ujwal Kantimohanthy",
  fullName: "Ujwal Shyam Kantimohanthy",
  handle: "UJ",
  headline: "Network & systems engineer",
  thread:
    "I build dependable systems and make their behaviour verifiable, across networking, web products and AI research.",
  intro: [
    "ICT engineer with a focus on network administration and infrastructure, studying Engineering Sciences at the University of Rome Tor Vergata. My thesis looks at wireless mesh networks over TV White Space spectrum for connectivity in hard to reach terrain.",
    "Right now I'm a web development intern at Zidio Development, a research collaborator training models for text, speech and emotion recognition, and building CosmoHub through STATION F's Landing Zone programme in Paris.",
  ],
  location: "Rome · Paris",
  email: "hello@kantimohanthy.dev",
  linkedin: "https://www.linkedin.com/in/ujwalshyam-kantimohanthy/",
  github: "https://github.com/kantimohanthy",
  updated: "October 2026",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "project-loop",
    title: "Project LOOP",
    context: "Zidio Development · Web development internship",
    period: "2026",
    status: "Ongoing",
    summary:
      "A full stack product covering data ingestion, role aware interfaces, analytics and question answering grounded in the ingested data.",
    tags: ["Full stack", "Role based UX", "Analytics", "Grounded Q&A"],
    sections: [
      {
        heading: "What I'm building",
        points: [
          "Ingestion: getting source data into a shape the rest of the product can rely on.",
          "Role aware UX: different users see the views and actions that match their role.",
          "Analytics: summaries over the ingested data.",
          "Grounded Q&A: answers are drawn from the ingested material, not free form generation.",
        ],
      },
      {
        heading: "Evidence",
        body:
          "The evaluator demo runs on seeded sample data, not production data. It shows the flows end to end; it is not a usage or performance claim.",
      },
    ],
    links: [],
    writeUpStatus:
      "A full case study with the architecture diagram, key decisions and what broke is being written up.",
  },
  {
    slug: "wireless-mesh-tvws",
    title: "Wireless Mesh + TV White Space",
    context: "Thesis research · University of Rome Tor Vergata",
    period: "Since 2026",
    status: "Ongoing",
    summary:
      "Can a wireless mesh running over unused broadcast spectrum reach places conventional links don't? Modelling and simulation in MATLAB.",
    tags: ["Wireless mesh", "TVWS", "RF propagation", "MATLAB"],
    sections: [
      {
        heading: "Problem",
        body:
          "Rural and mountainous areas are expensive to connect: line of sight links get blocked by terrain and fibre doesn't pay back. TV White Space, the unused spectrum in the broadcast bands, propagates further and through obstacles better than typical WiFi frequencies. The question is whether a mesh topology on top of it can extend coverage into challenging terrain.",
      },
      {
        heading: "Approach",
        points: [
          "Literature review of wireless mesh topologies and the TVWS regulatory landscape.",
          "A propagation model for occluded terrain.",
          "MATLAB experiments simulating a hybrid mesh + TVWS topology.",
        ],
      },
      {
        heading: "Progress",
        points: [
          "Done: literature review: mesh topologies",
          "Done: literature review: TVWS regulation",
          "Done: propagation model for occluded terrain",
          "Next: simulate the hybrid mesh + TVWS topology",
          "Next: bench test, write up, review and defence",
        ],
      },
    ],
    links: [{ label: "Mission view in DEVAN", href: "/missions/wireless-mesh-tvws/" }],
    writeUpStatus: "Results will be published here as experiments complete.",
  },
  {
    slug: "devan",
    title: "DEVAN",
    context: "Personal engineering workspace · this site",
    period: "Since 2026",
    status: "Ongoing",
    summary:
      "An evidence graph behind this portfolio: concepts, experiments and artifacts linked so that a claim like “tested” is derived from evidence, not typed in.",
    tags: ["Next.js", "TypeScript", "Prisma", "Evidence graph", "CI validation"],
    sections: [
      {
        heading: "Problem",
        body:
          "Portfolios say “proficient in DNS” and leave it there. I wanted every claim on my site to point at something checkable: the source I learned from, the experiment I ran, and the raw output.",
      },
      {
        heading: "What I built",
        points: [
          "A schema for sources, concepts, questions, experiments, outcomes and artifacts, with JSON Schema (Ajv) as the single structural authority.",
          "A graph validator that runs in CI and checks ID uniqueness, reference resolution and provenance before anything is published.",
          "Evidence states (Encountered, Studied, Implemented, Tested) derived by code from the attached records rather than set by hand.",
          "A Next.js + TypeScript interface over the graph, with Prisma for the data layer.",
        ],
      },
      {
        heading: "First real record",
        body:
          "Iterative DNS resolution: I ran dig +trace against example.com while capturing port 53 with tshark, then pushed it through source → concept → question → experiment → outcome → artifact. The state came back TESTED from the derivation function.",
      },
      {
        heading: "What broke",
        points: [
          "My first capture missed the opening hop: the local systemd resolver answered on the loopback interface, so capturing on eth0 saw nothing. Capturing on all interfaces fixed it.",
          "An early version of the interface showed confidence badges and hardcoded “live” numbers that no evidence supported. I pulled them out; the site now states status in words and links to the record.",
          "The site is a static export on GitHub Pages, so API routes don't run in production. The client falls back to seeded records, and those are labelled as such.",
        ],
      },
      {
        heading: "Still open",
        points: [
          "Publishing the raw dig log and packet capture as downloadable files.",
          "More records beyond DNS before adding any question answering layer on top.",
        ],
      },
    ],
    links: [
      { label: "Open DEVAN", href: "/devan/" },
      { label: "DNS evidence record", href: "/evidence/" },
      { label: "Source on GitHub", href: "https://github.com/kantimohanthy/Devan2", external: true },
    ],
  },
];

export interface ListItem {
  title: string;
  context: string;
  period?: string;
  status?: Status;
  body: string;
  links?: LinkRef[];
}

export const research: ListItem[] = [
  {
    title: "Wireless Mesh + TV White Space",
    context: "Thesis · Tor Vergata",
    status: "Ongoing",
    body: "Extending connectivity into rural and mountainous terrain with mesh networks over TV White Space spectrum.",
    links: [{ label: "Case study", href: "/work/wireless-mesh-tvws/" }],
  },
  {
    title: "DASER-Net",
    context: "Research collaboration · INFERENCE Lab",
    status: "Ongoing",
    body: "Collaborative work on models for text, speech and emotion recognition. Planned experiments are listed as planned until results exist.",
  },
];

export const ventures: ListItem[] = [
  {
    title: "CosmoHub",
    context: "STATION F · Landing Zone",
    period: "Since Jul 2026",
    status: "Early stage",
    body: "A learning platform for anyone who wants to get into space technology, from first principles onward. Started in the Universeh Student Fellowship. There is no user facing prototype yet; earlier backend experiments are on GitHub.",
    links: [{ label: "Earlier experiments", href: "https://github.com/kantimohanthy/Cosmohub", external: true }],
  },
];

export const experience: ListItem[] = [
  {
    title: "Web Development Intern",
    context: "Zidio Development · Bengaluru (hybrid)",
    period: "Since Aug 2026",
    body: "Full stack work on Project LOOP.",
    links: [{ label: "Project LOOP", href: "/work/project-loop/" }],
  },
  {
    title: "Research Collaborator",
    context: "Text, speech & emotion recognition",
    period: "Ongoing",
    body: "Training and evaluating language and speech models, including the DASER-Net collaboration.",
  },
  {
    title: "Events Lead",
    context: "EuroTech Federation",
    period: "Since 2026",
    body: "First point of contact for inbound event requests; designing the submission and intake process for the team.",
  },
  {
    title: "Website diagnostic audit",
    context: "ZiShop",
    period: "Sep 2026",
    body: "Diagnosed reliability, performance, accessibility and SEO issues on the public web platform and delivered a written audit to the founders.",
  },
];

export const otherWork: ListItem[] = [
  {
    title: "CineForge AI Pro",
    context: "IBM SkillsBuild AI Builders Challenge",
    period: "Jul 2026",
    status: "Submitted",
    body: "Bilingual Arabic/English preproduction assistant for filmmakers. FastAPI pipeline from script upload through scene reasoning to storyboard generation, with Hugging Face as the primary model provider.",
    links: [{ label: "Repository", href: "https://github.com/kantimohanthy/ClineForge-Pro", external: true }],
  },
];

export const talks: ListItem[] = [
  {
    title: "Building a Sustainable Space Economy",
    context: "Sustainable Space Conference · Tor Vergata, with Universeh",
    period: "Sep 2026",
    body: "Balancing commercial growth, orbital responsibility and innovation. Student talk in the “Next generation in space” block.",
  },
];

export const notes: ListItem[] = [
  {
    title: "Tracing an iterative DNS resolution",
    context: "Engineering note · Networking",
    period: "Aug 2026",
    body: "dig +trace and a tshark capture side by side: four referral hops from root to authoritative, and why my first capture missed the first hop.",
    links: [{ label: "Read the record", href: "/evidence/" }],
  },
];
