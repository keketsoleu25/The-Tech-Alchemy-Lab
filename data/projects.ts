export type ProjectCategory = "Education" | "Business" | "Facility" | "Non-profit";

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
    summary:
      "A trust-building website for parents with fast performance, clear enrolment details and contact integration.",
    introduction:
      "A professional website for a registered daycare that builds parent trust, improves usability and supports fast local discovery.",
    liveUrl: "https://bambananidaycare.co.za",
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
    liveUrl: "https://www.ithacademic-foundation.co.za",
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
    liveUrl: "https://afromillionial.co.za",
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
    slug: "gtv-fms",
    name: "GTV FMS",
    client: "GTV FMS",
    industry: "Facility Management",
    categories: ["Facility"],
    tags: ["Facility Management", "Corporate", "Credibility"],
    summary:
      "A modern website concept positioning a facilities company as trusted, capable and mobile-ready.",
    introduction:
      "A facilities management website concept focused on corporate credibility, service clarity and mobile responsiveness.",
    liveUrl: "https://gtvfms.netlify.app",
    focus: "Corporate branding, CTAs",
    overview:
      "A facilities management company required a polished digital presence to build trust with corporate buyers.",
    challenge:
      "The company needed a website that looked premium, communicated services clearly and generated confident enquiries.",
    result:
      "A structured website concept with clear service pages, visible calls to action and modern corporate branding.",
    detailedChallenge:
      "Facilities management audiences need fast access to services, team credibility and evidence of reliability. The previous concept lacked this clarity.",
    solution: [
      "Created a corporate homepage leading with services, credibility and contact.",
      "Structured service pages around clear benefits and outcomes for decision-makers.",
      "Built mobile-first navigation so prospects can enquire from any device.",
      "Used refined layouts and brand cues to communicate trust quickly.",
    ],
    stack: ["HTML5", "Tailwind CSS", "Responsive Design", "Corporate UI"],
    process: [
      "Service mapping and trust audit",
      "Corporate information-hierarchy prototype",
      "Responsive implementation with clear CTAs",
    ],
    impact:
      "The website concept positions GTV FMS as a modern, credible facilities partner and encourages enquiries from enterprise buyers.",
    lessons:
      "Corporate brands win when service clarity, trust signals and user flow align. Every page should quickly answer why the company is the right choice.",
    highlights: [
      { title: "Corporate homepage", description: "A professional first impression for corporate buyers." },
      { title: "Service clarity", description: "Clear service descriptions focused on trust and outcomes." },
      { title: "Mobile CTA flow", description: "Responsive enquiry paths available on any device." },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
