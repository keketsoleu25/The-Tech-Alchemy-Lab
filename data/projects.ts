export type ProjectCategory = "Education" | "Business" | "Non-profit" | "Technology";

export type Project = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  categories: ProjectCategory[];
  tags: string[];
  summary: string;
  introduction: string;
  liveUrl: string;
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
    summary: "A trust-building website for parents with fast performance, clear enrolment details and contact integration.",
    introduction: "A professional website for a registered daycare that builds parent trust, improves usability and supports fast local discovery.",
    liveUrl: "https://bambananidaycare.co.za",
    focus: "Trust, mobile performance, SEO",
    overview: "A registered daycare and aftercare centre needed a polished digital front door that reassures parents and simplifies enquiries.",
    challenge: "Parents needed fast access to programme information, enrolment steps, contact details and proof of the centre’s professionalism.",
    result: "A modern website designed for speed, clarity and conversion, with a strong parent-focused story and clear action paths.",
    detailedChallenge: "Young families needed confidence before visiting the centre. The previous online presence was dated, slow and unclear about enrolment procedures.",
    solution: ["Designed a clean parent-first homepage with trust signals, programmes and FAQs.", "Built a mobile-first experience that works quickly on low-bandwidth devices.", "Structured content for local SEO and enquiries with visible calls to action.", "Implemented a polished gallery and clear enrolment sections so parents can decide quickly."],
    stack: ["HTML5", "Tailwind CSS", "JavaScript", "Schema.org SEO"],
    process: ["Research and parent journey mapping", "Information architecture and content hierarchy", "Visual design and performance-first implementation"],
    impact: "The website positions Bambanani Day Care as a professional, modern and trustworthy option for parents. It makes enquiries easier and supports local search discovery.",
    lessons: "For education brands, confidence is earned through clarity. Fast pages, simple enrolment flows and proof points keep busy parents moving towards contact.",
    highlights: [{ title: "Parent-first homepage", description: "Trust-driven content with clear programme information." }, { title: "Mobile enrolment", description: "A focused journey designed for busy parents." }, { title: "Local discovery", description: "Structured information supporting daycare and aftercare searches." }],
  },
  {
    slug: "ith-academic-foundation",
    name: "Ith Academic Foundation",
    client: "Ith Academic Foundation",
    industry: "Education / Non-profit",
    categories: ["Education", "Non-profit"],
    tags: ["Education", "Non-profit", "Community"],
    summary: "A clean, informative website that highlights the mission, programmes and a donation-ready structure.",
    introduction: "A mission-led website designed to showcase educational programmes, community impact and donor readiness.",
    liveUrl: "https://www.ithacademic-foundation.co.za",
    focus: "Mission, programmes, donations",
    overview: "An educational foundation focused on youth development, tutoring and community upliftment across South Africa.",
    challenge: "The brand needed clarity around its programmes, stronger storytelling and a website that felt professional and approachable.",
    result: "A polished digital experience supporting mission communication, programme discovery and donation readiness.",
    detailedChallenge: "Education nonprofits can struggle to present their work clearly. Ith needed a website that felt premium without losing the warmth of its community mission.",
    solution: ["Designed a structured homepage that elevates the mission, programmes and impact stories.", "Built a donation-ready architecture with clear calls to action and trust elements.", "Used visual hierarchy to guide visitors from values to programme details and contact.", "Optimised performance for donors and parents visiting on mobile devices."],
    stack: ["HTML5", "CSS3", "JavaScript", "EmailJS"],
    process: ["Audience review and messaging alignment", "Content structure for programmes and impact", "Clean interface focused on community"],
    impact: "The website gives Ith Academic Foundation a stronger public presence, making sponsorship, donations and community engagement easier to access.",
    lessons: "For mission-driven brands, professional digital design must still feel human. Clear structure and emotional storytelling are essential.",
    highlights: [{ title: "Impact storytelling", description: "Programme and community content built for clarity." }, { title: "Donation readiness", description: "A visible giving path supported by trust details." }, { title: "Mobile navigation", description: "Fast access to programmes, contact and mission pages." }],
  },
  {
    slug: "afromillionial",
    name: "Afromillionial",
    client: "Afromillionial",
    industry: "Business",
    categories: ["Business"],
    tags: ["Business", "Brand", "Performance"],
    summary: "A bold brand website communicating African innovation through polished layouts and performance.",
    introduction: "A modern brand website for African entrepreneurship, designed to feel premium, fast and memorable.",
    liveUrl: "https://afromillionial.co.za",
    focus: "Brand identity, performance",
    overview: "A modern website for an entrepreneur-focused business showcasing African innovation and ambition.",
    challenge: "The brand needed a premium digital identity marrying sophistication with bold storytelling across devices.",
    result: "A polished website concept balancing refinement with energy, fast performance and strong brand presence.",
    detailedChallenge: "Positioning a business brand in a crowded market required a website that felt modern, premium and built for conversion.",
    solution: ["Created a distinctive visual system with premium gradients, clean typography and a motion-ready layout.", "Built clear sections for brand values, services and business impact with strong CTA placement.", "Optimised for speed and accessibility so the brand feels premium on every screen.", "Added subtle transitions and polished interactions for a refined experience."],
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    process: ["Brand direction and identity alignment", "Interface concept and premium hero design", "Performance-first build and CTA refinement"],
    impact: "The website supports the brand’s premium positioning and gives visitors a confident first impression of the business’s expertise and ambition.",
    lessons: "Strong brands need a digital experience that is aspirational and easy to use. Performance must support premium storytelling.",
    highlights: [{ title: "Premium hero", description: "A bold opening designed to establish brand positioning." }, { title: "Business story", description: "Clear service communication within a modern structure." }, { title: "Mobile performance", description: "A fast experience for decision-makers on the move." }],
  },
  {
    slug: "alchemy-job-finder",
    name: "Alchemy Job Finder",
    client: "The Tech Alchemy Lab",
    industry: "Technology",
    categories: ["Technology"],
    tags: ["Job discovery", "Automation", "Career tools"],
    summary: "A practical job-discovery platform that brings suitable opportunities into one focused workspace.",
    introduction: "An in-house career tool designed to make job discovery more focused, structured and useful for South African job seekers.",
    liveUrl: "https://alchemy-job-finder.vercel.app",
    focus: "Job discovery, workflow, opportunity tracking",
    overview: "Alchemy Job Finder is a Tech Alchemy Lab product for turning scattered job searches into a clear, actionable pipeline.",
    challenge: "Job seekers lose time moving between portals, duplicate listings and incomplete application information.",
    result: "A focused product direction that centralises discovery, provides clearer job information and supports intentional applications.",
    detailedChallenge: "Finding relevant work should not depend on manually checking many sites every day. The product needed a dependable, simple path from discovery to a prepared application.",
    solution: ["Built a structured job-discovery experience around useful job details.", "Created a foundation for source-based job collection and filtering.", "Designed the product as a practical tool rather than another noisy job board.", "Connected the product to the Lab’s wider mission of creating useful digital systems."],
    stack: ["Next.js", "TypeScript", "Prisma", "Neon PostgreSQL"],
    process: ["Opportunity mapping", "Data model and source design", "Product interface and workflow iteration"],
    impact: "Alchemy Job Finder demonstrates the Lab’s ability to turn a real-world pain point into a useful, modern digital product.",
    lessons: "The strongest internal products solve a repeated problem first, then earn their expansion through daily usefulness.",
    highlights: [{ title: "Focused discovery", description: "A clearer route from job search to relevant opportunities." }, { title: "Product thinking", description: "A real workflow built around a genuine market need." }, { title: "Technical foundation", description: "Modern full-stack architecture ready for iteration." }],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
