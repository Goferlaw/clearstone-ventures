import Link from "next/link";
import {
  Arrow,
  BusinessCTA,
  ImageNote,
  PageIntro,
  PropertyImage,
} from "@/components/editorial";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "About Clearstone",
  "The mission, philosophy and long-term vision behind Clearstone Ventures LTD, an early-stage real estate investment and acquisition company.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT CLEARSTONE"
        title="A clear perspective. A considered ambition."
        intro="Clearstone Ventures LTD is an early-stage, privately held real estate investment and acquisition company, building a platform around sound fundamentals and thoughtful execution."
      />
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <p className="eyebrow">OUR MISSION</p>
            <h2>
              See the potential.
              <br />
              <em>Respect the fundamentals.</em>
            </h2>
          </div>
          <div className="prose">
            <p className="large-copy">
              Our mission is to identify and pursue real estate opportunities
              where disciplined analysis and intentional execution can support
              long-term value.
            </p>
            <p>
              We focus on multifamily communities of 30 or more units,
              franchise-driven net lease opportunities and an intended Florida
              residential acquisition strategy. Each area brings different
              operating realities; all require a clear acquisition basis, a
              realistic plan and careful attention to risk.
            </p>
            <p>
              We are developing our operating infrastructure, acquisition
              processes and relationships with owners, brokers, operators and
              prospective partners. We describe our ambitions openly while
              distinguishing them from capabilities and results we have yet to
              establish.
            </p>
          </div>
        </div>
      </section>
      <div className="container wide-property">
        <PropertyImage
          src="/multifamily-community.webp"
          alt="Illustrative low-rise apartment community"
        />
        <ImageNote />
      </div>
      <section id="vision" className="section dark-section">
        <div className="container editorial-grid">
          <div>
            <p className="eyebrow">THE LONGER VIEW</p>
            <h2>
              A platform developed
              <br />
              <em>with purpose.</em>
            </h2>
          </div>
          <div className="prose">
            <p className="large-copy">
              The objective is a diversified investment platform, built
              deliberately as opportunities and operating capabilities develop.
            </p>
            <p>
              Our long-term vision includes the potential to participate in
              development, joint ventures and complementary private investment
              opportunities. Lending and structured capital may be considered in
              future phases, subject to resources, expertise and applicable
              requirements.
            </p>
            <p>
              These are areas of potential expansion, not currently offered
              financial services or a representation of institutional scale. We
              do not claim an established investment portfolio or institutional
              assets under management.
            </p>
            <Link className="text-link" href="/our-approach">
              Explore our investment approach <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <BusinessCTA />
    </>
  );
}
