// Opportunity radar — programmes Ujwal is tracking.
// Deadlines come from the original posts and were checked against listings on 2026-11-20.
// Always confirm on the official page before applying.

export type OpportunityStatus = "open" | "rolling" | "opens-soon" | "closed";

export interface Opportunity {
  id: string;
  org: string;
  programme: string;
  field: "Finance" | "Banking" | "FinTech" | "Research";
  length: string;
  deadline: string; // ISO date, or "rolling"
  deadlineNote?: string;
  focus: string;
  eligibilityNote: string;
  url: string;
  status: OpportunityStatus;
}

export const OPPORTUNITIES_REVIEWED = "2026-11-20";

export const opportunities: Opportunity[] = [
  {
    id: "broadridge-business-2027",
    org: "Broadridge",
    programme: "Summer 2027 Business Internship Program",
    field: "FinTech",
    length: "10 weeks, paid",
    deadline: "2026-11-27",
    deadlineNote: "One guide lists 13 Nov 2026. Confirm on the posting.",
    focus: "FinTech across finance, business operations, risk management and innovation projects.",
    eligibilityNote: "Bachelor's students graduating Fall 2027 to Spring 2028.",
    url: "https://www.extern.com/post/broadridge-internship-guide",
    status: "open",
  },
  {
    id: "jpmc-cadp-2027",
    org: "JPMorganChase",
    programme: "2027 Corporate Analyst Development Program",
    field: "Finance",
    length: "9 weeks",
    deadline: "2026-11-30",
    focus: "Analytics, project management and process improvement across corporate functions.",
    eligibilityNote: "US roles: no employment-based visa sponsorship. A London cohort also exists.",
    url: "https://www.builtinnyc.com/job/2027-corporate-analyst-development-program-summer-analyst-new-york-metro/10308063",
    status: "open",
  },
  {
    id: "jpmc-fadp-2027",
    org: "JPMorganChase",
    programme: "2027 Financial Advisor Development Program",
    field: "Finance",
    length: "9 weeks",
    deadline: "2026-11-30",
    focus: "Wealth management: client service, investment training and group projects.",
    eligibilityNote: "No employment-based visa sponsorship.",
    url: "https://www.jpmorganchase.com/careers/explore-opportunities/programs/wealth-management-summer-financial-advisor-development-program",
    status: "open",
  },
  {
    id: "bmo-ignite-2027",
    org: "BMO",
    programme: "2027 U.S. Banking Ignite Internship",
    field: "Banking",
    length: "10 weeks, paid, rotational",
    deadline: "2026-12-03",
    focus: "Rotations through commercial banking, wealth management and business operations.",
    eligibilityNote: "US banking roles usually require US work authorisation.",
    url: "https://jobs.bmo.com/us/en/commercial-banking",
    status: "open",
  },
  {
    id: "uw-ipd-summer-2027",
    org: "Institute for Protein Design, University of Washington",
    programme: "Summer Research Program 2027",
    field: "Research",
    length: "June to August 2027, paid, housing covered",
    deadline: "2027-01-10",
    focus: "Computational and experimental protein design, with a mentor, weekly seminars and a final poster.",
    eligibilityNote: "Open to undergraduates anywhere aged 18+. Sophomores and juniors get priority.",
    url: "https://www.ipd.uw.edu/undergraduate-research/",
    status: "open",
  },
  {
    id: "amazon-frp-accounting-2027",
    org: "Amazon",
    programme: "2027 Finance Rotation Program: Accounting Intern",
    field: "Finance",
    length: "12 weeks, Seattle or Arlington",
    deadline: "rolling",
    focus: "Corporate accounting, financial operations and Amazon's finance organisation.",
    eligibilityNote: "Graduation between Dec 2027 and Jun 2028. No visa sponsorship.",
    url: "https://www.wayup.com/i-Technology-j-2027-Amazon-Finance-Rotation-Program-Accounting-Intern-Amazon-631176956522536/",
    status: "rolling",
  },
];

export function formatDeadline(d: string): string {
  if (d === "rolling") return "Rolling";
  const date = new Date(`${d}T12:00:00Z`);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
