"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/brand-mark";

const navigation = [
  { label: "Home", href: "/#home" },
  { label: "Systems", href: "/#featured-builds" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Client intake", href: "/client-intake" },
  { label: "Client support", href: "/client-support" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/#home" aria-label="The Tech Alchemy Lab home">
          <BrandMark /><span>Tech Alchemy<small>Lab</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="header-cta" href="/client-intake">Start a project<span aria-hidden="true">↗</span></Link>
        <button className="menu-toggle" type="button" aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen((open) => !open)}><span /><span /></button>
      </div>
      <div className={`mobile-nav ${isOpen ? "is-open" : ""}`} id="mobile-navigation">
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => <Link href={item.href} key={item.href} onClick={() => setIsOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</Link>)}
          <Link className="mobile-cta" href="/client-intake" onClick={() => setIsOpen(false)}>Start a project<span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
