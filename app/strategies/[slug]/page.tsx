import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Arrow,
  BusinessCTA,
  ImageNote,
  PageIntro,
  PropertyImage,
} from "@/components/editorial";
import { inquiryHref, pageMetadata } from "@/lib/site";
import { strategyContent } from "@/lib/strategy-content";
type Slug = keyof typeof strategyContent;
export function generateStaticParams() {
  return Object.keys(strategyContent).map((slug) => ({ slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = strategyContent[params.slug as Slug];
  return s ? pageMetadata(s.title, s.intro, `/strategies/${params.slug}`) : {};
}
export default function StrategyPage({ params }: { params: { slug: string } }) {
  const s = strategyContent[params.slug as Slug];
  if (!s) notFound();
  return (
    <>
      <PageIntro eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
      {s.image && (
        <div className="container wide-property strategy-banner">
          <PropertyImage src={s.image} alt={s.alt} priority />
          <ImageNote />
        </div>
      )}
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <p className="eyebrow">THE INVESTMENT THESIS</p>
            <h2>{s.heading}</h2>
          </div>
          <div className="prose">
            <p className="large-copy">{s.text}</p>
            <Link className="button button-navy" href={inquiryHref(s.category)}>
              {s.cta}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section className="section criteria-section">
        <div className="container editorial-grid">
          <div>
            <p className="eyebrow">OPPORTUNITY CRITERIA</p>
            <h2>What we look for.</h2>
            <p className="body-copy">
              A framework for the conversation, subject to opportunity-specific
              diligence.
            </p>
          </div>
          <ul className="criteria-list">
            {s.lookFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">HOW WE THINK ABOUT THE OPPORTUNITY</p>
          <div className="detail-rows">
            {s.items.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          {s.audience && (
            <div className="inquiry-paths">
              <h2>
                A conversation tailored
                <br />
                <em>to your role.</em>
              </h2>
              <div className="audience-links">
                {s.audience.map((audience) => (
                  <Link key={audience} href={inquiryHref(s.category, audience)}>
                    {audience}
                    <Arrow />
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="strategy-next">
            <Link className="text-link" href="/strategies">
              Explore all strategies <Arrow />
            </Link>
            <Link className="button button-navy" href={inquiryHref(s.category)}>
              {s.cta}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <BusinessCTA />
    </>
  );
}
