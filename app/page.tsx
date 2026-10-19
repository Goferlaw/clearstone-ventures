import Link from "next/link";
import {
  Arrow,
  BusinessCTA,
  ImageNote,
  Process,
  PropertyImage,
  StrategyPanels,
} from "@/components/editorial";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Real Estate Investment & Acquisitions",
  "Clearstone Ventures LTD is developing a disciplined real estate platform focused on multifamily communities of 30+ units, franchise-driven net lease and Florida residential acquisitions.",
  "/",
);

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <PropertyImage
          src="/multifamily-community.webp"
          alt="Illustrative landscaped, low-rise multifamily community"
          className="hero-image"
          priority
        />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow">REAL ESTATE INVESTMENT & ACQUISITIONS</p>
          <h1>
            Finding value.
            <br />
            Creating opportunity.
            <br />
            <em>Building for the long term.</em>
          </h1>
          <p className="hero-copy">
            Clearstone Ventures is a real estate investment and acquisition
            platform focused on multifamily properties, franchise-driven net
            lease opportunities, and strategically sourced real estate
            investments.
          </p>
          <div className="button-row">
            <Link className="button button-gold" href="/strategies">
              Explore Our Strategies <Arrow />
            </Link>
            <Link className="button button-outline" href="/contact">
              Connect With Clearstone <Arrow />
            </Link>
          </div>
          <div className="hero-foot">
            <span>MULTIFAMILY · NET LEASE · RESIDENTIAL</span>
            <a href="#philosophy">
              Our perspective <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>
      <section id="philosophy" className="section philosophy">
        <div className="container editorial-grid">
          <div>
            <p className="eyebrow">THE CLEARSTONE PERSPECTIVE</p>
            <h2>
              Opportunity begins
              <br />
              <em>with perspective.</em>
            </h2>
            <Link href="/about" className="text-link">
              Meet Clearstone <Arrow />
            </Link>
          </div>
          <div>
            <p className="large-copy">
              A considered approach to the asset.
              <br />A clear view of what it could become.
            </p>
            <p className="body-copy">
              Clearstone Ventures LTD is an early-stage, privately held real
              estate investment and acquisition company. We are building our
              platform through disciplined sourcing, market research,
              underwriting and thoughtful execution.
            </p>
            <div className="editorial-principles">
              {[
                [
                  "Disciplined Sourcing",
                  "Look beyond the listing. Understand the market, the property and the circumstances behind the opportunity.",
                ],
                [
                  "Strategic Structuring",
                  "Align the acquisition basis, financing and ownership structure with the realities of the investment.",
                ],
                [
                  "Long-Term Value Creation",
                  "Focus on sustainable operating improvements, considered capital investment and patient decision-making.",
                ],
              ].map(([title, text]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="focus" className="section strategy-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">INVESTMENT STRATEGIES</p>
              <h2>
                Three strategies.
                <br />
                <em>One investment philosophy.</em>
              </h2>
            </div>
            <p>
              Different property types. A consistent emphasis on fundamentals,
              execution and the potential to create enduring value.
            </p>
          </div>
          <StrategyPanels />
          <ImageNote />
        </div>
      </section>
      <section id="approach" className="section approach-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR INVESTMENT APPROACH</p>
              <h2>
                From opportunity
                <br />
                <em>to value creation.</em>
              </h2>
            </div>
            <Link className="text-link" href="/our-approach">
              Inside our approach <Arrow />
            </Link>
          </div>
          <Process />
        </div>
      </section>
      <section className="vision-section">
        <div className="vision-photo">
          <PropertyImage
            src="/franchise-nnn.webp"
            alt="Illustrative freestanding franchise-style restaurant with drive-through"
          />
        </div>
        <div className="vision-copy">
          <p className="eyebrow">A LONG-TERM VISION</p>
          <h2>
            Building with purpose.
            <br />
            <em>Investing with discipline.</em>
          </h2>
          <p>
            Our objective is to develop a diversified real estate investment
            platform through disciplined acquisitions, thoughtful structuring
            and strategic partnerships.
          </p>
          <p>
            We are building the operating infrastructure, strategies and
            relationships to support that ambition. Future growth will depend on
            opportunities, resources and execution readiness.
          </p>
          <Link href="/about#vision" className="text-link">
            The longer view <Arrow />
          </Link>
        </div>
      </section>
      <BusinessCTA />
    </>
  );
}
