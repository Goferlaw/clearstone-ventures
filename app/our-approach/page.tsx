import { BusinessCTA, PageIntro, Process } from "@/components/editorial";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Our Investment Approach",
  "How Clearstone develops an opportunity through sourcing, evaluation, structuring, execution and potential value creation.",
  "/our-approach",
);
export default function Approach() {
  return (
    <>
      <PageIntro
        eyebrow="OUR INVESTMENT APPROACH"
        title="From opportunity to value creation."
        intro="A clear process helps connect an investment thesis to the realities of a property, a market and a transaction. This is the framework we are developing to guide our decisions."
      />
      <section className="section">
        <div className="container">
          <Process detailed />
        </div>
      </section>
      <section className="section dark-section">
        <div className="container editorial-grid">
          <div>
            <p className="eyebrow">DISCIPLINE BEFORE COMMITMENT</p>
            <h2>
              The right questions
              <br />
              <em>come first.</em>
            </h2>
          </div>
          <div className="prose">
            <p className="large-copy">
              An opportunity must make sense under more than one set of
              assumptions.
            </p>
            <p>
              Our intended diligence process considers acquisition basis,
              property condition, income quality, operating costs, required
              capital, financing exposure and alternative outcomes. We seek to
              understand what must go right, what could go wrong and what
              resources execution will require.
            </p>
            <p>
              We aim to align ownership, financing and partner responsibilities
              before moving forward. Appropriate legal, tax, engineering and
              other professional advice remains essential to
              transaction-specific decisions.
            </p>
            <p>
              Value creation is an objective, not a promise. No process removes
              market, financing, operational or execution risk.
            </p>
          </div>
        </div>
      </section>
      <BusinessCTA />
    </>
  );
}
