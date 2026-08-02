const crmStack = ["Next.js 16", "Auth.js", "Prisma 7", "PostgreSQL", "Resend", "PDFKit"];
const authStack = ["Next.js 16", "Auth.js", "Prisma 7", "Neon", "Zod"];

export function FeaturedBuildsSection() {
  return (
    <section className="featured-builds" id="featured-builds" aria-labelledby="featured-builds-title">
      <div className="featured-builds-aura" aria-hidden="true" />
      <div className="shell">
        <div className="section-heading featured-builds-heading">
          <div>
            <p className="eyebrow"><span aria-hidden="true" />Systems forged in production</p>
            <h2 id="featured-builds-title">Proof lives in<strong>the build.</strong></h2>
          </div>
          <p>
            Two live full-stack systems showing how I approach connected data, secure access and
            real business workflows—not just polished landing pages.
          </p>
        </div>

        <div className="featured-builds-grid">
          <article className="featured-build featured-build-primary">
            <div className="featured-build-topline">
              <span>Flagship system / 01</span>
              <strong><i aria-hidden="true" />Live</strong>
            </div>

            <div className="featured-build-content">
              <div className="featured-build-copy">
                <p className="build-kicker">Business operations platform</p>
                <h3>Tech Alchemy CRM</h3>
                <p>
                  A full-stack CRM connecting clients, projects, tasks, invoices, notifications
                  and secure user access inside one relational workflow.
                </p>

                <div className="build-stack" aria-label="Tech Alchemy CRM technologies">
                  {crmStack.map((technology) => <span key={technology}>{technology}</span>)}
                </div>

                <div className="build-actions">
                  <a className="button button-primary" href="https://tech-alchemy-crm.vercel.app" target="_blank" rel="noreferrer">
                    Launch live CRM <span aria-hidden="true">↗</span>
                  </a>
                  <a className="build-source-link" href="https://github.com/keketsoleu25/tech-alchemy-crm" target="_blank" rel="noreferrer">
                    Inspect source <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>

              <div className="crm-console" aria-label="Tech Alchemy CRM workflow preview">
                <div className="console-bar">
                  <span>TA / CRM</span>
                  <span className="console-status"><i aria-hidden="true" />Core workflow online</span>
                </div>
                <div className="pipeline">
                  <span>Client</span><i aria-hidden="true">→</i>
                  <span>Project</span><i aria-hidden="true">→</i>
                  <span>Task</span><i aria-hidden="true">→</i>
                  <span>Invoice</span>
                </div>
                <div className="crm-module-grid">
                  <div><small>Access</small><strong>Role-aware</strong><span>USER / ADMIN</span></div>
                  <div><small>Data</small><strong>Relational</strong><span>OWNERSHIP SCOPED</span></div>
                  <div><small>Documents</small><strong>PDF invoices</strong><span>SERVER GENERATED</span></div>
                  <div><small>Delivery</small><strong>Resend</strong><span>EMAIL WORKFLOWS</span></div>
                </div>
              </div>
            </div>
          </article>

          <article className="featured-build featured-build-secondary">
            <div className="featured-build-topline">
              <span>Security system / 02</span>
              <strong><i aria-hidden="true" />Live</strong>
            </div>

            <div className="auth-console" aria-label="Tech Alchemy Auth System flow preview">
              <div className="auth-lock" aria-hidden="true"><span>◇</span></div>
              <div className="auth-flow" aria-hidden="true">
                <span>Register</span><i>→</i><span>Verify</span><i>→</i><span>Session</span>
              </div>
              <div className="auth-roles"><span>USER</span><span>ADMIN</span></div>
            </div>

            <div className="featured-build-copy auth-build-copy">
              <p className="build-kicker">Authentication architecture</p>
              <h3>Tech Alchemy Auth System</h3>
              <p>
                A focused authentication build with credentials and Google sign-in, email
                verification, password recovery and role-protected routes.
              </p>

              <div className="build-stack" aria-label="Tech Alchemy Auth System technologies">
                {authStack.map((technology) => <span key={technology}>{technology}</span>)}
              </div>

              <div className="build-actions">
                <a className="button button-secondary" href="https://auth-system-cyan-one.vercel.app" target="_blank" rel="noreferrer">
                  Open live system <span aria-hidden="true">↗</span>
                </a>
                <a className="build-source-link" href="https://github.com/keketsoleu25/Auth-System" target="_blank" rel="noreferrer">
                  Inspect source <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
