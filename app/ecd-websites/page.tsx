import type { Metadata } from "next";
import Link from "next/link";
import "./ecd.css";

export const metadata: Metadata = {
  title: "ECD Website Design & Development | The Tech Alchemy Lab",
  description:
    "Professional, mobile-friendly websites for South African ECD centres and daycares. Explore transparent packages, a proposed 50% sponsorship model and our Bambanani Day Care project.",
  alternates: { canonical: "/ecd-websites" },
  openGraph: {
    type: "website",
    url: "/ecd-websites",
    title: "ECD Website Solutions | The Tech Alchemy Lab",
    description:
      "Help parents find, understand and connect with your ECD centre through a clear, professional website.",
  },
};

const packages = [
  {
    name: "ECD Essentials",
    featured: false,
    price: "R4,500",
    pages: "Up to 3 pages",
    description: "A clear first online presence for smaller centres.",
    features: [
      "Mobile-responsive website",
      "About the centre and programmes",
      "Photo gallery",
      "Contact details and WhatsApp link",
      "Social media links",
      "Basic on-page SEO setup",
      "Two revision rounds",
    ],
  },
  {
    name: "ECD Growth",
    price: "R6,000",
    pages: "Up to 5 pages",
    description: "A fuller parent journey, from discovering the centre to making an enquiry.",
    featured: true,
    features: [
      "Everything in Essentials",
      "Admissions and enrolment information",
      "Staff and educator profiles",
      "Enquiry form",
      "Programme and age-group information",
      "Google indexing setup",
      "Two revision rounds",
    ],
  },
  {
    name: "ECD Plus",
    featured: false,
    price: "R9,500",
    pages: "Up to 8 pages",
    description: "A more comprehensive digital presence for centres with broader information needs.",
    features: [
      "Everything in Growth",
      "Expanded programme pages",
      "Downloadable admissions information",
      "Testimonials section (approved content)",
      "Enhanced gallery and content structure",
      "Analytics integration",
      "Three revision rounds",
    ],
  },
];

const process = [
  ["01", "Understand the centre", "We gather the centre's details, audience, programmes and goals."],
  ["02", "Agree scope and funding", "The package, responsibilities, content and payment arrangements are confirmed in writing."],
  ["03", "Design and build", "We create the agreed website and share it for review."],
  ["04", "Review and launch", "Approved revisions are completed, then the website is deployed and handed over."],
];

export default function EcdWebsitesPage() {
  return (
    <main className="ecd-page">
      <section className="ecd-hero">
        <div className="ecd-glow ecd-glow-one" aria-hidden="true" />
        <div className="ecd-glow ecd-glow-two" aria-hidden="true" />
        <div className="shell ecd-hero-inner">
          <p className="eyebrow"><span aria-hidden="true" /> Digital solutions for early learning</p>
          <p className="ecd-overline">THE TECH ALCHEMY LAB · ECD DIGITAL SOLUTIONS</p>
          <h1>Give your ECD centre <strong>a digital home.</strong></h1>
          <p className="ecd-lede">
            Help parents discover your centre, understand your programmes and contact your team.
            We build practical, mobile-friendly websites for South African early childhood development
            centres and daycares.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#packages">Explore packages <span aria-hidden="true">↓</span></a>
            <a className="button button-secondary" href="#contact">Discuss a website <span aria-hidden="true">↗</span></a>
          </div>
          <div className="ecd-proof-row">
            <span>Designed for parents on mobile</span>
            <span>Clear information</span>
            <span>Direct enquiry paths</span>
          </div>
        </div>
      </section>

      <section className="ecd-intro section-padding">
        <div className="shell ecd-two-col">
          <div>
            <p className="eyebrow"><span aria-hidden="true" /> Why a website matters</p>
            <h2>Make the important information <strong>easy to find.</strong></h2>
          </div>
          <div className="ecd-intro-copy">
            <p>
              Parents and caregivers often want to understand a centre before making contact.
              A well-organised website gives them one place to learn about your programmes,
              facilities, educators, admissions process and contact details.
            </p>
            <p>
              We work with each centre to present accurate, approved information in a welcoming
              online experience. No inflated promises. Just a useful website built around the
              people who need it.
            </p>
          </div>
        </div>
        <div className="shell ecd-benefit-grid">
          <article><span>01</span><h3>Build confidence</h3><p>Present your centre, team and learning environment clearly.</p></article>
          <article><span>02</span><h3>Explain your offering</h3><p>Make programmes, age groups and admissions information easier to understand.</p></article>
          <article><span>03</span><h3>Make contact simple</h3><p>Give families clear ways to call, message or send an enquiry.</p></article>
        </div>
      </section>

      <section className="ecd-packages section-padding" id="packages">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow"><span aria-hidden="true" /> Straightforward scope</p><h2>Choose the right <strong>starting point.</strong></h2></div>
            <p>Every project begins with an agreed scope. Additional pages, copywriting, photography, integrations and custom functionality are quoted separately.</p>
          </div>
          <div className="ecd-package-grid">
            {packages.map((item) => (
              <article className={`ecd-package-card ${item.featured ? "is-featured" : ""}`} key={item.name}>
                {item.featured && <span className="ecd-package-label">CAMPAIGN RECOMMENDATION</span>}
                <p className="ecd-package-pages">{item.pages}</p>
                <h3>{item.name}</h3>
                <p className="ecd-package-description">{item.description}</p>
                <p className="ecd-price">{item.price}<span> once-off</span></p>
                <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                <a className="button button-secondary" href="#contact">Enquire about {item.name} <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
          <p className="ecd-pricing-note">Prices are proposed development fees in South African Rand. Domain registration, hosting, renewals and paid third-party services are not included unless specified in a written quote.</p>
        </div>
      </section>

      <section className="ecd-sponsor section-padding">
        <div className="shell ecd-sponsor-panel">
          <div>
            <p className="eyebrow"><span aria-hidden="true" /> Proposed community sponsorship</p>
            <h2>Make a professional website <strong>more accessible.</strong></h2>
            <p>
              We are exploring a sponsorship model where a donor covers 50% of an approved
              website project and the participating ECD centre contributes the remaining 50%.
              This arrangement is a proposal and only applies once the campaign partners,
              sponsor and centre have confirmed the funding and terms.
            </p>
          </div>
          <div className="ecd-split">
            <div><span>SPONSOR CONTRIBUTION</span><strong>50%</strong><small>R3,000 on ECD Growth</small></div>
            <div><span>CENTRE CONTRIBUTION</span><strong>50%</strong><small>R3,000 on ECD Growth</small></div>
            <p>Illustrative split for the R6,000 ECD Growth package.</p>
          </div>
        </div>
      </section>

      <section className="ecd-case section-padding">
        <div className="shell ecd-case-grid">
          <div className="ecd-case-visual" aria-label="Bambanani Day Care project preview">
            <div className="ecd-browser-bar"><i /><i /><i /><span>BAMBANANI DAY CARE</span></div>
            <div className="ecd-case-screen">
              <span className="ecd-case-kicker">A DAYCARE WEBSITE PROJECT</span>
              <strong>A welcoming digital front door.</strong>
              <p>Programmes · Parent information · Enquiries</p>
              <div className="ecd-case-lines"><i /><i /><i /></div>
            </div>
          </div>
          <div className="ecd-case-copy">
            <p className="eyebrow"><span aria-hidden="true" /> Selected education work</p>
            <h2>Bambanani Day Care <strong>project example.</strong></h2>
            <p>
              Our Bambanani project is an example of how a daycare's information can be brought
              together into a dedicated online destination. The case study explains the project
              approach, content structure and website features.
            </p>
            <Link className="button button-primary" href="/portfolio/bambanani-day-care">Read the case study <span aria-hidden="true">↗</span></Link>
            <a className="ecd-live-link" href="https://bambananidaycare.co.za" target="_blank" rel="noreferrer">Visit Bambanani Day Care's website ↗</a>
            <p className="ecd-permission-note">Project imagery, client quotations and detailed outcome claims will only be published with the centre's approval.</p>
          </div>
        </div>
      </section>

      <section className="ecd-process section-padding">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow"><span aria-hidden="true" /> From brief to launch</p><h2>A clear, managed <strong>process.</strong></h2></div><p>You know what is included, what is needed from the centre and when the project can move forward.</p></div>
          <div className="ecd-process-grid">
            {process.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="ecd-care section-padding">
        <div className="shell ecd-care-inner">
          <div><p className="eyebrow"><span aria-hidden="true" /> After launch</p><h2>Keep your website <strong>looked after.</strong></h2><p>Optional website care plans start from R350 per month, subject to an agreed support scope. Hosting and domain renewals remain separate.</p></div>
          <div className="ecd-care-price"><strong>R350–R650</strong><span>per month · optional care plans</span></div>
        </div>
      </section>

      <section className="ecd-contact section-padding" id="contact">
        <div className="shell ecd-contact-panel">
          <p className="eyebrow"><span aria-hidden="true" /> Start a conversation</p>
          <h2>Let's build a clearer digital presence <strong>for your centre.</strong></h2>
          <p>Tell us about your ECD centre, the website you need and whether you are enquiring as a centre, donor or campaign partner.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/client-intake">Submit a project enquiry <span aria-hidden="true">↗</span></Link>
            <a className="button button-secondary" href="https://wa.me/27692602709?text=Hello%20Tech%20Alchemy%20Lab%2C%20I%20would%20like%20to%20discuss%20an%20ECD%20website." target="_blank" rel="noreferrer">WhatsApp the Lab <span aria-hidden="true">↗</span></a>
          </div>
          <p className="ecd-contact-email">Johannesburg, South Africa · Serving ECD centres nationwide</p>
        </div>
      </section>
    </main>
  );
}
