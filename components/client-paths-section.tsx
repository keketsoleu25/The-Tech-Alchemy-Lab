import Link from "next/link";

export function ClientPathsSection() {
  return (
    <section className="client-paths" aria-labelledby="client-paths-title">
      <div className="shell">
        <div className="section-heading">
          <div><p className="eyebrow"><span aria-hidden="true" />Choose your path</p><h2 id="client-paths-title">Start clearly.<strong>Get help quickly.</strong></h2></div>
          <p>New ideas and existing projects need different conversations. Use the route built for where you are now.</p>
        </div>
        <div className="client-paths-grid">
          <article><span>01 / NEW PROJECT</span><h3>Turn the idea into a clear website brief.</h3><p>Work through goals, pages, features, budget and timing so we can assess the right scope before the first call.</p><Link className="button button-primary" href="/start-project">Start your website brief <b aria-hidden="true">↗</b></Link></article>
          <article><span>02 / EXISTING CLIENT</span><h3>Log a support request with useful context.</h3><p>Report a website issue, request a content change or ask for help with domains, access, billing and existing systems.</p><Link className="button button-secondary" href="/support">Get client support <b aria-hidden="true">↗</b></Link></article>
        </div>
      </div>
    </section>
  );
}
