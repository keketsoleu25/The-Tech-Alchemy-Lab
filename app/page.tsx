import { AboutSection } from "@/components/about-section";
import { ClientPathsSection } from "@/components/client-paths-section";
import { ContactSection } from "@/components/contact-section";
import { FeaturedBuildsSection } from "@/components/featured-builds-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { PricingSection } from "@/components/pricing-section";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Prisma",
  "PostgreSQL",
  "Tailwind CSS",
];

const services = [
  {
    number: "01",
    mark: "⌘",
    title: "Web Development",
    description:
      "Fast, responsive websites and full-stack applications engineered around your business goals—not a recycled template.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    number: "02",
    mark: "◇",
    title: "Brand & UI/UX Design",
    description:
      "Distinct visual systems and intuitive interfaces that make your business credible, memorable and easy to trust.",
    tags: ["UI Systems", "Prototyping", "Identity"],
  },
  {
    number: "03",
    mark: "▱",
    title: "Mobile Experiences",
    description:
      "Focused cross-platform product experiences that keep the essential journey clear on every screen size.",
    tags: ["Responsive", "PWA", "Flutter"],
  },
  {
    number: "04",
    mark: "↗",
    title: "Digital Strategy",
    description:
      "Practical roadmaps shaped by your audience, competitors and conversion goals so every build has a reason to exist.",
    tags: ["SEO", "Analytics", "Growth"],
  },
  {
    number: "05",
    mark: "◫",
    title: "E-Commerce Solutions",
    description:
      "Clear storefronts and reliable buying journeys designed to reduce friction and turn attention into revenue.",
    tags: ["Payments", "Catalogue", "Conversion"],
  },
  {
    number: "06",
    mark: "∞",
    title: "Ongoing Retainer",
    description:
      "A dependable technical partner for improvements, maintenance and new ideas after the first launch goes live.",
    tags: ["Support", "Optimisation", "Iteration"],
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-ZA",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      image: `${SITE_URL}/opengraph-image`,
      email: "keketsoleu25@gmail.com",
      telephone: "+27 69 260 2709",
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Johannesburg",
        addressRegion: "Gauteng",
        addressCountry: "ZA",
      },
      areaServed: { "@type": "Country", name: "South Africa" },
      founder: { "@id": `${SITE_URL}/#founder` },
      sameAs: ["https://github.com/keketsoleu25"],
      serviceType: [
        "Web development",
        "Full-stack application development",
        "UI and UX design",
        "E-commerce development",
        "Digital strategy",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Keketso Leu",
      jobTitle: "Full-Stack Developer",
      url: `${SITE_URL}/#about`,
      sameAs: ["https://github.com/keketsoleu25"],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-aura hero-aura-cyan" aria-hidden="true" />
        <div className="hero-aura hero-aura-violet" aria-hidden="true" />

        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Johannesburg-based digital studio
            </p>

            <h1
              id="hero-title"
              style={{
                fontSize: "clamp(3.6rem, 5.3vw, 4.25rem)",
                lineHeight: 0.94,
                letterSpacing: "-0.055em",
              }}
            >
              We build digital systems that help businesses
              <strong>look credible, work smarter & grow.</strong>
            </h1>

            <p className="hero-intro">
              The Tech Alchemy Lab helps African businesses build professional websites,
              improve their digital presence and turn manual processes into practical
              digital systems — from business websites and online bookings to dashboards,
              portals and custom software.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="/start-project">
                Start a project
                <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href="#portfolio">
                View our work
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="technology-list" aria-label="Core technologies">
              {technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="Digital product transformation system">
            <div className="visual-topline">
              <span>Alchemy blueprint</span>
              <span className="system-live">
                <i aria-hidden="true" /> System online
              </span>
            </div>

            <div className="forge-stage" aria-hidden="true">
              <div className="orbit orbit-outer">
                <i />
              </div>
              <div className="orbit orbit-inner">
                <i />
              </div>
              <div className="forge-core">
                <span>Idea</span>
                <b>✦</b>
                <strong>Impact</strong>
              </div>
              <span className="formula formula-one">01 / DISCOVER</span>
              <span className="formula formula-two">02 / FORGE</span>
              <span className="formula formula-three">03 / SCALE</span>
            </div>

            <div className="visual-metrics">
              <div>
                <span>Build mode</span>
                <strong>Full-stack</strong>
              </div>
              <div>
                <span>Core focus</span>
                <strong>Conversion</strong>
              </div>
              <div>
                <span>Output</span>
                <strong>Growth</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="shell hero-stats" aria-label="Studio statistics">
          <div>
            <strong>10+</strong>
            <span>Projects delivered</span>
          </div>
          <div>
            <strong>Full-stack</strong>
            <span>Design to deployment</span>
          </div>
          <div>
            <strong>3+ years</strong>
            <span>Building experience</span>
          </div>
          <div>
            <strong>🇿🇦</strong>
            <span>Based in Joburg</span>
          </div>
        </div>
      </section>

      <FeaturedBuildsSection />

      <section className="services" id="services" aria-labelledby="services-title">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span aria-hidden="true" />
                What I alchemise
              </p>
              <h2 id="services-title">
                Services built for
                <strong>digital dominance.</strong>
              </h2>
            </div>
            <p>
              From the first strategic sketch to a production launch, every layer is
              designed to make your business clearer, stronger and easier to choose.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <span className="service-number">{service.number}</span>
                  <span className="service-mark" aria-hidden="true">
                    {service.mark}
                  </span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-tags" aria-label={`${service.title} capabilities`}>
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a href="#contact" aria-label={`Discuss ${service.title}`}>
                  Discuss this service
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PortfolioSection />
      <PricingSection />
      <AboutSection />
      <ClientPathsSection />
      <ContactSection />
    </>
  );
}
