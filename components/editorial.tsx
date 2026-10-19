import Link from "next/link";
import { inquiryHref, processSteps, strategies } from "@/lib/site";

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
export function PropertyImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width="1672"
      height="941"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
export function ImageNote() {
  return (
    <p className="image-note">
      AI-generated illustrative property imagery. No company ownership, tenant
      relationship or existing lease is represented.
    </p>
  );
}
export function PageIntro({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="intro-copy">{intro}</p>
      </div>
    </section>
  );
}
export function Process({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={detailed ? "process process-detailed" : "process"}>
      {processSteps.map(([title, text]) => (
        <article key={title}>
          <span className="process-dot" aria-hidden="true" />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}
export function StrategyPanels() {
  return (
    <div className="strategy-panels">
      {strategies.map((s, i) => (
        <article
          className={`strategy-panel ${i === 2 ? "residential-panel" : ""}`}
          key={s.slug}
        >
          {i < 2 && (
            <div className="strategy-image">
              <PropertyImage src={s.image} alt={s.alt} />
            </div>
          )}
          <div className="strategy-panel-copy">
            <p className="eyebrow">{s.eyebrow}</p>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <Link className="text-link" href={`/strategies/${s.slug}`}>
              Explore the strategy <Arrow />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
export function BusinessCTA() {
  return (
    <section className="section business-cta">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OPPORTUNITIES & RELATIONSHIPS</p>
            <h2>
              Let’s explore
              <br />
              <em>what’s possible.</em>
            </h2>
          </div>
          <p>
            A property. An expansion plan. A shared perspective. Start a
            conversation around the opportunity you see.
          </p>
        </div>
        <div className="audience-links">
          {[
            ["Property Owners", "Multifamily Opportunity"],
            ["Franchise Operators", "Net Lease / Franchise Opportunity"],
            ["Real Estate Investors", "Investment / Joint Venture"],
            ["Strategic Partners", "Investment / Joint Venture"],
          ].map(([audience, category]) => (
            <Link key={audience} href={inquiryHref(category, audience)}>
              {audience}
              <Arrow />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link href="/" className="footer-wordmark">
            CLEARSTONE<span>VENTURES LTD</span>
          </Link>
          <p>Real. Deal. Done.</p>
          <Link href="/contact" className="text-link">
            Start a conversation <Arrow />
          </Link>
        </div>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/strategies">Strategies</Link>
          <Link href="/our-approach">Our Approach</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <a href="mailto:info@clearstone-ventures.com">
            info@clearstone-ventures.com
          </a>
        </div>
        <div className="footer-legal">
          <p>© {new Date().getFullYear()} Clearstone Ventures LTD.</p>
          <p>
            For general informational purposes only. This website is not an
            offer to sell securities, a solicitation to invest or investment
            advice. Strategy descriptions reflect areas of interest and intended
            activity, not a record of completed transactions, committed capital
            or available investment products.
          </p>
        </div>
      </div>
    </footer>
  );
}
