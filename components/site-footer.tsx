import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

const footerNavigation = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-lead">
          <div>
            <p className="footer-kicker">Have an ambitious idea?</p>
            <h2>
              Let&apos;s turn it into
              <span>digital gold.</span>
            </h2>
          </div>
          <a className="footer-contact" href="mailto:techalchemist407@gmail.com">
            Start a conversation
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="#home" aria-label="The Tech Alchemy Lab home">
              <BrandMark />
              <span>
                Tech Alchemy
                <small>Lab</small>
              </span>
            </Link>
            <p>
              Strategic websites and digital products, forged in Johannesburg for
              African businesses with global ambition.
            </p>
          </div>

          <div className="footer-column">
            <p>Explore</p>
            {footerNavigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="footer-column">
            <p>Connect</p>
            <a href="mailto:techalchemist407@gmail.com">Email</a>
            <a
              href="https://wa.me/27692602709?text=Hello%20Tech%20Alchemy%20Lab%2C%20I%20am%20interested%20in%20your%20services"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a href="https://github.com/keketsoleu25" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>

          <div className="footer-column">
            <p>Location</p>
            <span>Johannesburg, Gauteng</span>
            <span>South Africa</span>
            <span>Mon–Fri · 08:00–17:00</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 The Tech Alchemy Lab. All rights reserved.</p>
          <p>Turning code into digital gold.</p>
        </div>
      </div>
    </footer>
  );
}
