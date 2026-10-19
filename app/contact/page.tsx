import { InquiryForm } from "@/components/inquiry-form";
import { PageIntro } from "@/components/editorial";
import { inquiryCategories, pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Contact Clearstone",
  "Discuss a multifamily property, franchise real estate opportunity, Florida residential acquisition or prospective joint venture with Clearstone Ventures LTD.",
  "/contact",
);
export const dynamic = "force-dynamic";
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; audience?: string }>;
}) {
  const query = await searchParams;
  const category = (inquiryCategories as readonly string[]).includes(
    query.category || "",
  )
    ? query.category!
    : "General Inquiry";
  const allowedAudiences = [
    "Property Owners",
    "Franchise Operators",
    "Real Estate Investors",
    "Strategic Partners",
    "Property Owners / Landowners",
    "Development Partners",
  ];
  const audience = allowedAudiences.includes(query.audience || "")
    ? query.audience!
    : "";
  return (
    <>
      <PageIntro
        eyebrow="CONTACT CLEARSTONE"
        title="Let’s explore what’s possible."
        intro="Introduce a property, discuss an expansion plan or start a conversation about potential alignment."
      />
      <section className="section contact-section">
        <div className="container contact-layout">
          <aside>
            <p className="eyebrow">A DIRECT CONNECTION</p>
            <h2>
              Start with{" "}
              <br />
              <em>the opportunity.</em>
            </h2>
            <p>
              Share enough context to begin a useful conversation. For
              properties, include the location, asset type and proposed
              transaction when available.
            </p>
            <a
              className="contact-email"
              href="mailto:info@clearstone-ventures.com"
            >
              info@clearstone-ventures.com <span aria-hidden="true">↗</span>
            </a>
            <p className="fine-print">
              Clearstone Ventures LTD
              <br />
              Real estate investment & acquisitions
            </p>
          </aside>
          <div id="inquiry-form">
            <InquiryForm initialCategory={category} audience={audience} />
          </div>
        </div>
      </section>
    </>
  );
}
