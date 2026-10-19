import {
  BusinessCTA,
  ImageNote,
  PageIntro,
  StrategyPanels,
} from "@/components/editorial";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Investment Strategies",
  "Explore Clearstone’s multifamily, franchise-driven net lease and Florida residential acquisition strategies.",
  "/strategies",
);
export default function Strategies() {
  return (
    <>
      <PageIntro
        eyebrow="INVESTMENT STRATEGIES"
        title="Three strategies. One investment philosophy."
        intro="Our commercial focus centers on multifamily communities of 30+ units and franchise-driven net lease real estate, complemented by an intended Florida residential acquisition strategy."
      />
      <section className="section strategy-section">
        <div className="container">
          <StrategyPanels />
          <ImageNote />
          <p className="fine-print">
            These strategies describe our intended approach and areas of
            interest. Actual activity depends on diligence, resources, market
            conditions and execution readiness.
          </p>
        </div>
      </section>
      <BusinessCTA />
    </>
  );
}
