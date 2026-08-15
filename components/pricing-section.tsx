type PricingPackage = {
  tier: string;
  name: string;
  tagline: string;
  price: string;
  cadence: string;
  cta: string;
  featured: boolean;
  accent: string;
  included: string[];
  excluded: string[];
  period?: string;
  priceUsd?: string | null;
  discoverySprint?: string;
  valueStatement?: string;
};

const packages: PricingPackage[] = [
  {
    tier: "Starter",
    name: "Starter",
    tagline:
      "For small businesses that need a simple, credible online presence without unnecessary complexity.",
    price: "3,000",
    cadence: "Estimated 5–7 business days",
    cta: "Start with Starter",
    featured: false,
    accent: "cyan",
    included: [
      "1–3 responsive pages",
      "Mobile-first responsive implementation",
      "WhatsApp click-to-chat",
      "Contact details and social links",
      "Google Maps integration",
      "Basic on-page SEO",
      "Basic performance optimisation",
      "Custom favicon",
      "1 revision round",
      "Deployment",
      "Client supplies all text, images, logo and business information",
    ],
    excluded: [
      "Domain registration and hosting",
      "E-commerce or online payments",
      "Booking systems",
      "CMS or blog functionality",
      "User accounts or logins",
      "Databases or dashboards",
      "Custom API integrations",
      "Advanced animations",
      "Copywriting or content creation",
      "Logo or brand design",
      "Professional email setup",
      "Advanced SEO",
      "More than 3 pages",
      "Ongoing maintenance",
      "Additional revision rounds",
    ],
  },
  {
    tier: "Most popular",
    name: "Launchpad",
    tagline:
      "For businesses ready for a stronger website built to establish credibility and generate enquiries.",
    price: "5,000",
    cadence: "Estimated 7–10 business days",
    cta: "Choose Launchpad",
    featured: true,
    accent: "cyan",
    included: [
      "Up to 5 responsive pages",
      "Mobile-first responsive implementation",
      "WhatsApp integration",
      "Contact or enquiry form",
      "Google Maps integration",
      "Basic on-page SEO",
      "Analytics integration",
      "Basic performance optimisation",
      "Social media links",
      "Custom favicon",
      "2 revision rounds",
      "30 days of post-launch defect support",
    ],
    excluded: [
      "Domain registration",
      "Hosting",
      "Professional email",
      "E-commerce",
      "Online booking",
      "Logo design",
      "Photography",
      "Copywriting",
      "Ongoing maintenance",
    ],
  },
  {
    tier: "Scope-based",
    name: "Transmutation",
    tagline:
      "For businesses that need functionality beyond a standard marketing website.",
    price: "From 12,500",
    cadence: "Estimated 4–8 weeks",
    discoverySprint:
      "Final pricing is confirmed after discovery and depends on features, integrations and complexity.",
    cta: "Book a Discovery Call",
    featured: false,
    accent: "gold",
    included: [
      "Booking systems",
      "Content management",
      "Payment gateway integration",
      "Customer portals",
      "Advanced forms",
      "Workflow automation",
      "API integrations",
      "Database functionality",
      "Custom dashboards",
      "Advanced analytics",
      "Technical discovery",
      "3 revision rounds",
      "60 days of post-launch defect support",
    ],
    excluded: [
      "Final pricing is confirmed after discovery",
      "Custom feature scope quoted separately",
      "Third-party service fees",
    ],
  },
  {
    tier: "Enterprise",
    name: "Custom systems",
    tagline:
      "For organisations requiring custom digital systems or complex software architecture.",
    price: "From 25,000",
    cadence: "Final proposal after technical discovery",
    cta: "Discuss a Custom System",
    featured: false,
    accent: "premium",
    included: [
      "CRM systems",
      "Internal dashboards",
      "Inventory systems",
      "Customer or staff portals",
      "Workflow automation",
      "Role-based systems",
      "SaaS products",
      "Complex database architecture",
      "Third-party integrations",
      "Custom reporting",
      "Ongoing technical ownership",
    ],
    excluded: [
      "Pricing depends on scope and complexity",
      "Large system upgrades quoted separately",
    ],
  },
];

const carePlans = [
  {
    name: "Care Essential",
    price: "750",
    period: "/month",
    tagline:
      "Stability and monitoring for websites that need dependable upkeep.",
    cta: "Talk about Essential",
    featured: false,
    accent: "cyan",
    included: [
      "Website uptime monitoring",
      "Dependency and security updates",
      "Backups where applicable",
      "Up to 30 minutes of minor content changes",
      "Basic technical support",
      "Monthly maintenance check",
    ],
  },
  {
    name: "Care Growth",
    price: "1,500",
    period: "/month",
    tagline:
      "Proactive improvements, monitoring and a faster response rhythm.",
    cta: "Talk about Growth",
    featured: false,
    accent: "gold",
    included: [
      "Everything in Essential",
      "Up to 2 hours of content or design updates",
      "Performance monitoring",
      "Basic SEO monitoring",
      "Analytics summary",
      "Priority response",
      "Monthly improvement recommendations",
    ],
  },
  {
    name: "Technical Partner",
    price: "From 3,500",
    tagline:
      "A trusted technical partner for ongoing performance, strategy and growth.",
    cta: "Talk about Technical Partner",
    featured: false,
    accent: "premium",
    included: [
      "Priority technical support",
      "Feature improvements",
      "Hosting and deployment oversight",
      "Performance optimisation",
      "Analytics review",
      "Monthly strategy session",
      "Technical roadmap guidance",
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
          <p className="pricing-summary-note">
            Custom quotes are available when a project does not fit neatly into one package.
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
                  {item.period ? <small>{item.period}</small> : null}
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

        <div className="pricing-care">
          <div className="pricing-care-heading">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Website Care Plans
            </p>
            <h3 className="care-heading-title">Keep Your Website Performing at Its Best</h3>
            <p className="care-heading-desc">
              Your website should continue working long after launch. Choose a maintenance plan that provides proactive updates, security, performance monitoring and priority technical support as your business grows.
            </p>
          </div>

          <div className="pricing-care-grid">
            {carePlans.map((plan) => (
              <article
                className={`pricing-card accent-${plan.accent}`}
                key={plan.name}
              >
                <header>
                  <span className="pricing-tier">Care plan</span>
                  <h3>{plan.name}</h3>
                  <p>{plan.tagline}</p>
                  <div className="pricing-price">
                    <span>R</span>
                    <strong>{plan.price}</strong>
                    {plan.period && <small>{plan.period}</small>}
                  </div>
                </header>

                <div className="pricing-features">
                  <p>What’s included</p>
                  <ul>
                    {plan.included.map((feature) => (
                      <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>
                    ))}
                  </ul>
                </div>

                <a className="button button-secondary" href="#contact">
                  {plan.cta}<span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
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

        <p className="pricing-scope-note">
          All projects require an agreed scope and deposit before work begins. Additional requests outside the approved scope are quoted separately.
        </p>

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
