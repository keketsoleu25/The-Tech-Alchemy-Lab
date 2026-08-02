const packages = [
  {
    tier: "Launch",
    name: "Launchpad",
    tagline: "For startups establishing a credible first presence.",
    price: "12,500",
    priceUsd: "approx. $680",
    cadence: "Once-off project · 2-week delivery",
    cta: "Start with Launchpad",
    featured: false,
    accent: "cyan",
    included: [
      "Up to 5 responsive pages",
      "Mobile-first implementation",
      "Contact / enquiry form",
      "Foundational on-page SEO",
      "Analytics integration",
      "2 revision rounds",
      "30 days of post-launch defect support",
    ],
    excluded: [
      "E-commerce",
      "CMS integration",
      "Custom web applications",
      "Complex third-party integrations",
      "Advanced custom animation",
    ],
  },
  {
    tier: "Growth",
    name: "Accelerator",
    tagline: "For established businesses ready to scale their digital reach.",
    price: "24,000",
    priceUsd: "approx. $1,300",
    cadence: "Once-off project · 4-week delivery",
    cta: "Build with Accelerator",
    featured: true,
    accent: "cyan",
    included: [
      "Up to 8 pages",
      "Custom UI/UX design",
      "CMS integration",
      "Full on-page SEO implementation",
      "E-commerce catalogue, up to 20 products",
      "Analytics integration",
      "3 revision rounds",
      "30 days of post-launch defect support",
    ],
    excluded: ["Custom third-party integrations", "50+ product catalogues", "Unlimited animation"],
  },
  {
    tier: "Enterprise",
    name: "Transmutation",
    tagline: "For organisations requiring custom systems, integrations or complex digital architecture.",
    price: "45,000",
    priceUsd: null,
    cadence: "Projects start at this investment · scope confirmed after discovery",
    discoverySprint: "Paid discovery sprint: R3,500 — credited toward the final invoice if approved within 30 days.",
    cta: "Book a discovery sprint",
    featured: false,
    accent: "gold",
    included: [
      "Custom web applications",
      "Customer or staff portals",
      "API integrations",
      "Workflow automation",
      "Advanced database functionality",
      "E-commerce catalogues exceeding 20 products",
      "Complex role-based systems",
      "Weekly project check-ins",
      "Dedicated ownership",
      "Estimated 6–10 week delivery",
      "90 days of post-launch defect support",
    ],
    excluded: [],
  },
  {
    tier: "Retainer",
    name: "The Philosopher’s Stone",
    tagline: "An ongoing technical partnership for businesses that need continuity, maintenance and regular improvements.",
    price: "14,500",
    priceUsd: "approx. $800/month",
    period: "/month",
    cadence: "3-month minimum commitment",
    cta: "Discuss an ongoing partnership",
    featured: false,
    accent: "premium",
    valueStatement:
      "Keep the developer who built and understands your system available, so the product doesn’t become outdated, unstable or disconnected from the business.",
    included: [
      "Up to 25 hours per month",
      "Priority support, response within 1 business day",
      "Monthly strategy session",
      "Monthly performance summary",
      "Continuous improvements",
      "Security and dependency maintenance",
      "SEO maintenance",
      "Hosting management",
      "Direct access to the developer who understands the system",
    ],
    excluded: [
      "Guaranteed resolution time (response window only)",
      "Unused hours carried over (they expire monthly)",
      "Hours beyond 25/month (billed at R750/hr or quoted separately)",
      "Third-party hosting, domain and subscription costs",
    ],
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
            <article
              className={`pricing-card accent-${item.accent} ${item.featured ? "is-featured" : ""}`}
              key={item.name}
            >
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
                {item.priceUsd && <p className="pricing-price-usd">{item.priceUsd}</p>}
                <p className="pricing-cadence">{item.cadence}</p>
              </header>

              {item.discoverySprint && (
                <p className="pricing-discovery">{item.discoverySprint}</p>
              )}

              {item.valueStatement && (
                <p className="pricing-value-statement">{item.valueStatement}</p>
              )}

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

        <div className="pricing-scope-policy">
          <h3>Clear scope. No surprise invoices.</h3>
          <dl>
            <div>
              <dt>Revision rounds</dt>
              <dd>
                One revision round means one consolidated collection of feedback submitted at
                the same time — not unlimited individual changes sent across multiple days.
              </dd>
            </div>
            <div>
              <dt>Support period</dt>
              <dd>
                Post-launch support covers defects where delivered work doesn’t behave
                according to the approved scope. It doesn’t include new pages, new features,
                redesigns, new integrations, content creation, or requirements introduced
                after approval.
              </dd>
            </div>
            <div>
              <dt>Timelines</dt>
              <dd>
                Delivery timelines begin only once the required deposit has cleared, content
                has been supplied, required accounts and access have been provided, and scope
                has been approved.
              </dd>
            </div>
            <div>
              <dt>Additional scope</dt>
              <dd>
                Requests outside the approved package or proposal are estimated and approved
                separately before work begins.
              </dd>
            </div>
            <div>
              <dt>Third-party costs</dt>
              <dd>
                Domains, hosting, paid plugins, external APIs and subscription services are
                billed separately unless the proposal explicitly states otherwise.
              </dd>
            </div>
            <div>
              <dt>Client delays</dt>
              <dd>Delays in content, feedback, approvals or access may move the delivery date.</dd>
            </div>
          </dl>
        </div>

        <p className="pricing-terms">
          Prices are shown in South African Rand. USD figures are approximate estimates only —
          final invoices are issued in ZAR unless otherwise agreed. Starting prices exclude
          third-party subscriptions, paid licences, hosting and content production unless
          included in the written proposal.
        </p>
      </div>
    </section>
  );
}
