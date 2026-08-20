export type ProjectCategory = "Education" | "Business" | "Platform" | "Non-profit";

export type Project = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  categories: ProjectCategory[];
  tags: string[];
  summary: string;
  introduction: string;
  projectUrl: string;
  projectLinkLabel?: string;
  focus: string;
  overview: string;
  challenge: string;
  result: string;
  detailedChallenge: string;
  solution: string[];
  stack: string[];
  process: string[];
  impact: string;
  lessons: string;
  highlights: { title: string; description: string }[];
};

export const projects: Project[] = [
  {
    slug: "bambanani-day-care",
    name: "Bambanani Day Care",
    client: "Bambanani Day Care",
    industry: "Education",
    categories: ["Education"],
    tags: ["Education", "SEO", "Mobile-first"],
    summary:
      "A trust-building website for parents with fast performance, clear enrolment details and contact integration.",
    introduction:
      "A professional website for a registered daycare that builds parent trust, improves usability and supports fast local discovery.",
    projectUrl: "https://bambananidaycare.co.za",
    focus: "Trust, mobile performance, SEO",
    overview:
      "A registered daycare and aftercare centre needed a polished digital front door that reassures parents and simplifies enquiries.",
    challenge:
      "Parents needed fast access to programme information, enrolment steps, contact details and proof of the centre’s professionalism.",
    result:
      "A modern website designed for speed, clarity and conversion, with a strong parent-focused story and clear action paths.",
    detailedChallenge:
      "Young families needed confidence before visiting the centre. The previous online presence was dated, slow and unclear about enrolment procedures.",
    solution: [
      "Designed a clean parent-first homepage with trust signals, programmes and FAQs.",
      "Built a mobile-first experience that works quickly on low-bandwidth devices.",
      "Structured content for local SEO and enquiries with visible calls to action.",
      "Implemented a polished gallery and clear enrolment sections so parents can decide quickly.",
    ],
    stack: ["HTML5", "Tailwind CSS", "JavaScript", "Schema.org SEO"],
    process: [
      "Research and parent journey mapping",
      "Information architecture and content hierarchy",
      "Visual design and performance-first implementation",
    ],
    impact:
      "The website positions Bambanani Day Care as a professional, modern and trustworthy option for parents. It makes enquiries easier and supports local search discovery.",
    lessons:
      "For education brands, confidence is earned through clarity. Fast pages, simple enrolment flows and proof points keep busy parents moving towards contact.",
    highlights: [
      { title: "Parent-first homepage", description: "Trust-driven content with clear programme information." },
      { title: "Mobile enrolment", description: "A focused journey designed for busy parents." },
      { title: "Local discovery", description: "Structured information supporting daycare and aftercare searches." },
    ],
  },
  {
    slug: "ith-academic-foundation",
    name: "Ith Academic Foundation",
    client: "Ith Academic Foundation",
    industry: "Education / Non-profit",
    categories: ["Education", "Non-profit"],
    tags: ["Education", "Non-profit", "Community"],
    summary:
      "A clean, informative website that highlights the mission, programmes and a donation-ready structure.",
    introduction:
      "A mission-led website designed to showcase educational programmes, community impact and donor readiness.",
    projectUrl: "https://www.ithacademic-foundation.co.za",
    focus: "Mission, programmes, donations",
    overview:
      "An educational foundation focused on youth development, tutoring and community upliftment across South Africa.",
    challenge:
      "The brand needed clarity around its programmes, stronger storytelling and a website that felt professional and approachable.",
    result:
      "A polished digital experience supporting mission communication, programme discovery and donation readiness.",
    detailedChallenge:
      "Education nonprofits can struggle to present their work clearly. Ith needed a website that felt premium without losing the warmth of its community mission.",
    solution: [
      "Designed a structured homepage that elevates the mission, programmes and impact stories.",
      "Built a donation-ready architecture with clear calls to action and trust elements.",
      "Used visual hierarchy to guide visitors from values to programme details and contact.",
      "Optimised performance for donors and parents visiting on mobile devices.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "EmailJS"],
    process: [
      "Audience review and messaging alignment",
      "Content structure for programmes and impact",
      "Clean interface focused on community",
    ],
    impact:
      "The website gives Ith Academic Foundation a stronger public presence, making sponsorship, donations and community engagement easier to access.",
    lessons:
      "For mission-driven brands, professional digital design must still feel human. Clear structure and emotional storytelling are essential.",
    highlights: [
      { title: "Impact storytelling", description: "Programme and community content built for clarity." },
      { title: "Donation readiness", description: "A visible giving path supported by trust details." },
      { title: "Mobile navigation", description: "Fast access to programmes, contact and mission pages." },
    ],
  },
  {
    slug: "afromillionial",
    name: "Afromillionial",
    client: "Afromillionial",
    industry: "Business",
    categories: ["Business"],
    tags: ["Business", "Brand", "Performance"],
    summary:
      "A bold brand website communicating African innovation through polished layouts and performance.",
    introduction:
      "A modern brand website for African entrepreneurship, designed to feel premium, fast and memorable.",
    projectUrl: "https://afromillionial.co.za",
    focus: "Brand identity, performance",
    overview:
      "A modern website for an entrepreneur-focused business showcasing African innovation and ambition.",
    challenge:
      "The brand needed a premium digital identity marrying sophistication with bold storytelling across devices.",
    result:
      "A polished website concept balancing refinement with energy, fast performance and strong brand presence.",
    detailedChallenge:
      "Positioning a business brand in a crowded market required a website that felt modern, premium and built for conversion.",
    solution: [
      "Created a distinctive visual system with premium gradients, clean typography and a motion-ready layout.",
      "Built clear sections for brand values, services and business impact with strong CTA placement.",
      "Optimised for speed and accessibility so the brand feels premium on every screen.",
      "Added subtle transitions and polished interactions for a refined experience.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    process: [
      "Brand direction and identity alignment",
      "Interface concept and premium hero design",
      "Performance-first build and CTA refinement",
    ],
    impact:
      "The website supports the brand’s premium positioning and gives visitors a confident first impression of the business’s expertise and ambition.",
    lessons:
      "Strong brands need a digital experience that is aspirational and easy to use. Performance must support premium storytelling.",
    highlights: [
      { title: "Premium hero", description: "A bold opening designed to establish brand positioning." },
      { title: "Business story", description: "Clear service communication within a modern structure." },
      { title: "Mobile performance", description: "A fast experience for decision-makers on the move." },
    ],
  },
  {
    slug: "tech-alchemy-academy",
    name: "Tech Alchemy Academy",
    client: "The Tech Alchemy Lab",
    industry: "Education Technology",
    categories: ["Education", "Platform"],
    tags: ["LMS", "Full-stack", "Gamification"],
    summary:
      "A full-stack learning platform combining structured DSA lessons, quizzes, coding challenges, progression and an audited admin workspace.",
    introduction:
      "A gamified learning management system designed to turn Data Structures and Algorithms into a structured, measurable learning journey.",
    projectUrl: "https://github.com/keketsoleu25/tech-alchemy-academy",
    projectLinkLabel: "View source",
    focus: "Learning flows, reward integrity, administration",
    overview:
      "Tech Alchemy Academy is an internal product built to make technical learning more structured, motivating and operationally manageable.",
    challenge:
      "Technical learners need more than disconnected notes: they need guided progression, practice, feedback and rewards that cannot be manipulated.",
    result:
      "A database-backed LMS pilot with authenticated learners, persistent progress, server-scored quizzes, coding challenges, achievements, analytics and an admin control room.",
    detailedChallenge:
      "Learning DSA can feel fragmented when lessons, practice and progress tracking live in separate places. The platform needed one coherent journey while keeping assessment answers, challenge tests and XP awards authoritative on the server.",
    solution: [
      "Structured courses into modules and reusable lessons with XP-based progression gates.",
      "Built persisted quiz attempts, server-side scoring and first-pass-only XP rewards.",
      "Created a Challenge Arena that delegates code execution to an isolated runner and protects hidden tests.",
      "Added an Academy Control Room for curriculum publishing, learner roles, achievements, analytics and audit history.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Prisma 7", "Neon PostgreSQL", "NextAuth", "Zod"],
    process: [
      "Learning-journey and progression design",
      "Data modelling for curriculum, attempts and rewards",
      "Learner experience and administration implementation",
    ],
    impact:
      "The Academy demonstrates the Lab’s ability to engineer a multi-role product with real data, guarded business rules and operational tooling—not only marketing websites.",
    lessons:
      "Gamification is only useful when its rules are trustworthy. Progress, scoring and rewards must be enforced by the server while the interface keeps the learner focused.",
    highlights: [
      { title: "Guided mastery", description: "Courses, modules, lessons and progression tracked per learner." },
      { title: "Challenge Arena", description: "Authenticated submissions with isolated execution and protected tests." },
      { title: "Academy control room", description: "Publishing, roles, analytics and audit history in one workspace." },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
