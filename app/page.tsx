export default function HomePage() {
  return (
    <section className="foundation" id="home" aria-labelledby="foundation-title">
      <div className="foundation-glow" aria-hidden="true" />
      <div className="shell foundation-inner">
        <p className="eyebrow">
          <span aria-hidden="true" />
          Johannesburg-based digital studio
        </p>
        <h1 id="foundation-title">
          The new laboratory
          <strong>is taking shape.</strong>
        </h1>
        <p>
          The Tech Alchemy Lab is being reforged as a modern Next.js experience.
          The full hero and services presentation arrive in Phase 2.
        </p>
        <div className="foundation-status" aria-label="Rebuild status">
          <span>01</span>
          <div>
            <b>Foundation forged</b>
            <small>Next.js · TypeScript · Tailwind CSS</small>
          </div>
        </div>
      </div>
    </section>
  );
}
