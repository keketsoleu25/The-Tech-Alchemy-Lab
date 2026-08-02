import { PortfolioSection } from "@/components/portfolio-section";

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

export default function HomePage() {
  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-aura hero-aura-cyan" aria-hidden="true" />
        <div className="hero-aura hero-aura-violet" aria-hidden="true" />

        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Johannesburg-based digital studio
            </p>

            <h1 id="hero-title">
              I turn code into
              <strong>digital gold.</strong>
            </h1>

            <p className="hero-intro">
              I forge strategic websites and digital products that help ambitious
              African businesses earn trust, capture opportunities and grow.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Start your transformation
                <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href="#portfolio">
                View my work
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
    </>
  );
}
