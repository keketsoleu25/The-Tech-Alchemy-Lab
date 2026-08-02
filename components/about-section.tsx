import Image from "next/image";

const values = [
  {
    number: "01",
    title: "Craft over speed",
    description:
      "I would rather deliver one excellent product than five mediocre ones. Your reputation deserves deliberate, careful work.",
  },
  {
    number: "02",
    title: "Partnership, not transaction",
    description:
      "A client engagement should feel collaborative. I stay close to the problem, communicate clearly and remain invested in the result.",
  },
  {
    number: "03",
    title: "African excellence",
    description:
      "Proudly South African and internationally competitive—building digital work that reflects the ambition already present across Africa.",
  },
  {
    number: "04",
    title: "Results above aesthetics",
    description:
      "Beautiful design matters, but it must support trust, clearer decisions and measurable business goals.",
  },
  {
    number: "05",
    title: "Radical transparency",
    description:
      "No hidden costs or mystery process. Scope, progress and trade-offs should remain visible throughout the project.",
  },
  {
    number: "06",
    title: "Continuous alchemisation",
    description:
      "The craft keeps moving. I keep learning, testing and carrying stronger engineering practices into every new build.",
  },
];

const journey = [
  { year: "2014", title: "Matriculated", description: "Completed matric at Simunye Secondary." },
  {
    year: "2015–2018",
    title: "Finding the path",
    description: "Explored different career paths before finding a lasting direction in technology.",
  },
  {
    year: "2019",
    title: "The spark",
    description:
      "Enrolled for a BSc in Computer Science and Statistics at North-West University’s Vaal campus. I studied there from 2019 to 2022 but did not complete the degree.",
  },
  {
    year: "2020–2022",
    title: "The foundation",
    description:
      "Built a base in problem-solving, mathematics, economics and statistics, then left the degree programme before graduating to pursue a practical, project-led route.",
  },
  {
    year: "2022–2023",
    title: "CodeSpace Academy",
    description:
      "Deepened frontend engineering, modern JavaScript, interface design and the discipline of shipping working products.",
  },
  {
    year: "2023",
    title: "The Lab is born",
    description:
      "Founded The Tech Alchemy Lab and began turning technical skills into real client deliveries.",
  },
  {
    year: "2024–2025",
    title: "Digital Associate",
    description:
      "Completed a 12-month YES Programme placement through UVU Africa, expanding professional and cybersecurity experience.",
  },
  {
    year: "2026",
    title: "Full-stack expansion",
    description:
      "Shipped the Tech Alchemy CRM with authentication, database design, authorisation, invoicing and production deployment.",
  },
];

export function AboutSection() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-aura" aria-hidden="true" />
      <div className="shell about-story">
        <div className="about-copy">
          <p className="eyebrow">
            <span aria-hidden="true" />
            The Alchemist’s story
          </p>
          <h2 id="about-title">
            Meet Keketso
            <strong>“The Alchemist” Leu.</strong>
          </h2>
          <div className="about-text">
            <p>
              From Westonaria and raised in Matatiele, I grew up seeing ambitious South
              African organisations struggle to access digital work that could compete globally.
            </p>
            <p>
              That observation became the foundation of The Tech Alchemy Lab: a focused studio
              combining full-stack engineering, interface design and practical strategy to help
              African businesses show up with greater clarity and confidence.
            </p>
          </div>
          <blockquote>
            <p>“I don’t just write code—I transmute ideas into digital gold.”</p>
            <cite>Keketso Leu · Founder and developer</cite>
          </blockquote>
        </div>

        <div className="about-portrait">
          <div className="portrait-frame">
            <Image
              src="/images/profile_photo.jpg"
              alt="Keketso Leu, founder of The Tech Alchemy Lab"
              fill
              sizes="(max-width: 900px) 85vw, 460px"
              priority={false}
            />
            <div className="portrait-overlay" aria-hidden="true" />
            <div className="portrait-caption">
              <span>Founder / Full-stack developer</span>
              <strong>Keketso Leu</strong>
              <small>Johannesburg · South Africa</small>
            </div>
          </div>
          <div className="portrait-code" aria-hidden="true">
            <span>EST.</span><strong>2023</strong>
          </div>
        </div>
      </div>

      <div className="philosophy">
        <div className="shell philosophy-inner">
          <p className="case-label">The philosophy</p>
          <h2>
            Technology is the modern
            <strong>philosopher’s stone.</strong>
          </h2>
          <p>
            Ancient alchemy pursued transformation through knowledge, patience and craft.
            I apply that same discipline to digital products—because ambitious African
            businesses deserve technology that strengthens their position, not another template.
          </p>
        </div>
      </div>

      <div className="shell values" aria-labelledby="values-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span aria-hidden="true" />Core values</p>
            <h2 id="values-title">What the Lab<strong>stands for.</strong></h2>
          </div>
          <p>
            These principles shape the decisions behind every strategy, interface and line of code.
          </p>
        </div>
        <div className="values-grid">
          {values.map((value) => (
            <article key={value.number}>
              <span>{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="journey">
        <div className="shell journey-grid">
          <div className="journey-heading">
            <p className="eyebrow"><span aria-hidden="true" />The journey</p>
            <h2>From developer<strong>to Alchemist.</strong></h2>
            <p>A nonlinear path, built through study, client work, setbacks and increasingly ambitious products.</p>
          </div>
          <ol className="timeline">
            {journey.map((item, index) => (
              <li key={item.year}>
                <div className="timeline-marker"><span>0{index + 1}</span><i aria-hidden="true" /></div>
                <div>
                  <time>{item.year}</time>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
