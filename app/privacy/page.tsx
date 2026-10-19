import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Privacy & Inquiries",
  "How contact information is handled when you inquire through the Clearstone Ventures LTD website.",
  "/privacy",
);
export default function Privacy() {
  return (
    <>
      <PageIntro
        eyebrow="PRIVACY & INQUIRIES"
        title="A considered approach to your information."
        intro="This notice describes the website’s inquiry features and the information involved in contacting Clearstone Ventures LTD."
      />
      <section className="section">
        <div className="container narrow prose">
          <h2>Information you provide</h2>
          <p>
            The inquiry form requests your name, email address, inquiry category
            and message, with optional phone, company and property or site
            address. Please provide only information appropriate for an initial
            business conversation.
          </p>
          <h2>Email drafts</h2>
          <p>
            Preparing an email draft opens your own email application. The
            website does not send that draft or save it as an inquiry. Your
            email provider handles the message when you choose to send it.
          </p>
          <h2>Online inquiries</h2>
          <p>
            When online delivery is configured, submitting an inquiry transmits
            the form information to our server for validation and then to the
            configured email delivery provider for delivery to Clearstone’s
            designated inbox. Until that integration is configured, the form
            identifies delivery as pending.
          </p>
          <h2>Spam protection & technical data</h2>
          <p>
            The server uses short-lived signed form tokens, a hidden anti-spam
            field and temporary submission limits. Short-lived token identifiers
            and keyed email hashes are held in server memory to limit repeat
            submissions. Hosting and email providers may process technical
            request and delivery information under their own policies. No
            advertising analytics or third-party tracking scripts are included
            in this implementation.
          </p>
          <h2>Use & contact</h2>
          <p>
            Inquiry information is intended for evaluating and responding to the
            conversation you initiate. Do not submit confidential financial
            information or sensitive personal documents. For questions about
            your inquiry or to request deletion of related correspondence,
            contact{" "}
            <a href="mailto:info@clearstone-ventures.com">
              info@clearstone-ventures.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
