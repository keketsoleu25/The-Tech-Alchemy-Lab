const packages = [
  {
    tier: "Launch",
    name: "Launchpad",
    tagline: "For startups and side hustles ready to establish a credible digital presence.",
    price: "7,500",
    cadence: "Once-off project",
    cta: "Get started",
    featured: false,
    included: [
      "5-page responsive website",
      "Mobile-first design",
      "Contact form setup",
      "Basic SEO setup",
      "Google Analytics integration",
      "2 revision rounds",
      "30-day post-launch support",
    ],
    excluded: ["E-commerce functionality", "Custom animations", "Brand identity design"],
  },
  {
    tier: "Growth",
    name: "Accelerator",
    tagline: "For established businesses ready to strengthen and expand their digital reach.",
    price: "15,000",
    cadence: "Once-off project",
    cta: "Start accelerating",
    featured: true,
    included: [
      "Up to 12-page website",
      "Custom UI/UX design",
      "Advanced animations",
      "E-commerce for up to 50 products",
      "Full SEO implementation",
      "CMS integration",
      "4 revision rounds",
      "60-day post-launch support",
      "Performance monitoring setup",
    ],
    excluded: ["Custom third-party integrations"],
  },
  {
    tier: "Enterprise",
    name: "Transmutation",
    tagline: "A scoped digital transformation for organisations with complex requirements.",
    price: "25,000",
    cadence: "Starting investment",
    cta: "Request proposal",
    featured: false,
    included: [
      "Scope-defined page architecture",
      "Full brand identity design",
      "Custom web application",
      "Advanced e-commerce",
      "Custom API integrations",
      "Mobile product planning",
      "Dedicated project ownership",
      "90-day post-launch support",
      "Monthly strategy sessions",
      "Priority scheduling",
    ],
    excluded: [],
  },
  {
    tier: "Retainer",
    name: "The Philosopher’s Stone",
    tagline: "A dedicated digital partnership for continuous improvement after launch.",
    price: "8,500",
    period: "/month",
    cadence: "Minimum 3-month commitment",
    cta: "Enquire now",
    featured: false,
    included: [
      "40 hours/month development and design",
      "Priority support with 24-hour response",
      "Monthly strategy session",
      "Ongoing SEO and content support",
      "Performance reporting",
      "Hosting management",
      "Security and updates",
      "A/B testing and optimisation",
    ],
    excluded: ["New project builds", "Social media management"],
  },
];

export function PricingSection() {
  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="pricing-aura" aria-hidden="true" />
      <div className="shell">
        <div className="pricing-heading">
          <p className="eyebrow">
            <span aria-hidden="true" />
            Investment packages
          </p>
          <h2 id="pricing-title">
            Transparent pricing.
            <strong>Zero surprises.</strong>
          </h2>
          <p>
            Every package starts with a complimentary 30-minute strategy call. Prices
            are shown in South African Rand and final scope is confirmed before work begins.
          </p>
        </div>

        <div className="pricing-grid">
          {packages.map((item) => (
            <article className={`pricing-card ${item.featured ? "is-featured" : ""}`} key={item.name}>
              {item.featured && <div className="pricing-popular">✦ Most popular</div>}
              <header>
                <span className="pricing-tier">{item.tier}</span>
                <h3>{item.name}</h3>
                <p>{item.tagline}</p>
                <div className="pricing-price">
                  <span>R</span>
                  <strong>{item.price}</strong>
                  {item.period && <small>{item.period}</small>}
                </div>
                <p className="pricing-cadence">{item.cadence}</p>
              </header>

              <div className="pricing-features">
                <p>What’s included</p>
                <ul>
                  {item.included.map((feature) => (
                    <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>
                  ))}
                  {item.excluded.map((feature) => (
                    <li className="is-excluded" key={feature}><span aria-hidden="true">×</span>{feature}</li>
                  ))}
                </ul>
              </div>

              <a className={item.featured ? "button button-primary" : "button button-secondary"} href="#contact">
                {item.cta}<span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        <div className="pricing-note">
          <div>
            <span aria-hidden="true">?</span>
            <p>
              <strong>Not sure which package fits?</strong>
              The strategy call maps your real requirements without sales pressure.
            </p>
          </div>
          <a href="#contact">Book your free strategy call <span aria-hidden="true">↗</span></a>
        </div>

        <p className="pricing-terms">
          Starting prices exclude third-party subscriptions, paid licences, hosting and content
          production unless they are included in the written proposal.
        </p>
      </div>
    </section>
  );
}
