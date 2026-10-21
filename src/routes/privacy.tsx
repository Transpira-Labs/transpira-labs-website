import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT_EMAIL } from "@/components/site-chrome";
import { LegalPage, LegalSection, LegalList } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Transpira" },
      { name: "description", content: "How Transpira Labs collects, uses and protects data on its website and in Manifest." },
      { property: "og:title", content: "Privacy Policy | Transpira" },
      { property: "og:description", content: "How Transpira Labs collects, uses and protects data on its website and in Manifest." },
    ],
  }),
  component: PrivacyPage,
});

const mail = (
  <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2">
    {CONTACT_EMAIL}
  </a>
);

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 21, 2026"
      intro={
        <>
          <p>
            Classhopper Technologies Inc., doing business as Transpira Labs ("Transpira", "we", "us"), makes Manifest: a
            workspace and AI agent that helps freight brokerages answer quote requests and manage shipments. This policy
            explains what we collect through transpiralabs.com and through Manifest (including company workspaces at
            *.transpiralabs.com and our text line), how we use it, and the choices you have.
          </p>
          <p>
            When a business uses Manifest, that business (our "customer") decides which mailboxes, systems and phone
            numbers to connect. We process that data on the customer's behalf and under our agreement with them.
          </p>
        </>
      }
    >
      <LegalSection n={1} title="Information we collect">
        <LegalList>
          <li>
            <strong>Account information:</strong> your name, email address and sign-in provider when you sign in to
            Manifest, and the company you belong to.
          </li>
          <li>
            <strong>Connected mailboxes:</strong> if you connect a Google (Gmail) or Microsoft (Outlook) mailbox, we read
            email messages and their attachments in that mailbox: senders, recipients, subjects, dates and message
            content. See section 3 for what we do and do not do with Google data.
          </li>
          <li>
            <strong>Connected business systems:</strong> credentials and data from systems you connect, such as a TMS,
            a brokerage platform (for example Priority1) or a load board. That includes quotes, rates, shipments and
            carriers.
          </li>
          <li>
            <strong>Text messages:</strong> if you connect a phone to our text line, we keep your phone number and the
            messages you send to and receive from the line.
          </li>
          <li>
            <strong>Files you upload:</strong> carrier lists, rate sheets, past emails and anything else you send us
            during setup.
          </li>
          <li>
            <strong>Website and usage data:</strong> IP address, browser type, pages visited and similar technical data,
            collected through cookies and server logs.
          </li>
          <li>
            <strong>Contact details:</strong> anything you send us when you book a call or email us.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection n={2} title="How we use information">
        <LegalList>
          <li>
            To provide Manifest: find quote requests in your mailbox, look up prices in the systems you connect, draft
            replies and show them to you for approval.
          </li>
          <li>To text you when a draft is ready or something needs your attention, and to answer what you text the line.</li>
          <li>To keep your workspace secure, prevent abuse and fix problems.</li>
          <li>To respond to you and to tell you about changes to the service.</li>
          <li>To meet legal obligations.</li>
        </LegalList>
        <p>
          Manifest does not send email, book freight or change anything in a connected system without a person at your
          company approving it. We do not sell personal information and we do not use your data for advertising.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Google user data">
        <p>
          If you connect a Google account, Manifest requests read-only access to Gmail
          (<code>gmail.readonly</code>) and permission to manage drafts and send email (<code>gmail.compose</code>).
          It uses the first to find and read quote requests and related shipment emails, including their attachments,
          and the second to put the replies it writes in your Gmail Drafts, in the customer&rsquo;s thread, for you to
          review, edit and send, and to send a reply only after you approve it. We use this access only to provide and
          improve the user-facing features of Manifest described above.
        </p>
        <p>
          Transpira's use and transfer to any other app of information received from Google APIs will adhere to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. In particular:
        </p>
        <LegalList>
          <li>We do not use Google user data for advertising, and we do not sell it.</li>
          <li>
            We do not transfer Google user data to others except to provide or improve Manifest's features, to comply
            with law, or as part of a merger or acquisition with notice to you.
          </li>
          <li>
            No person at Transpira reads your Google user data unless you ask us to (for example for support), it is
            needed for security or to comply with law, or it has been aggregated and anonymized.
          </li>
          <li>
            We do not use Google user data to train or improve generalized or non-personalized AI or machine learning
            models.
          </li>
        </LegalList>
        <p>
          You can disconnect Google at any time in Manifest's Setup page or at{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2"
          >
            myaccount.google.com/permissions
          </a>
          . Microsoft accounts are treated the same way and can be disconnected in Setup or in your Microsoft account
          settings.
        </p>
      </LegalSection>

      <LegalSection n={4} title="AI processing">
        <p>
          Manifest uses AI models from Anthropic to read emails and draft replies. The content needed for each task is
          sent to Anthropic's API to produce a result. Under Anthropic's commercial terms, data sent through its API is
          not used to train its models. We do not use your company's data to train models for other customers.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Text messages">
        <p>
          You connect a phone by texting a token from your workspace to our line. We then text that number about your
          company's quote requests and drafts. Message frequency varies with your email volume. Message and data rates
          may apply. Text DISCONNECT to the line to stop messages, or remove the phone in Settings. We do not share mobile
          numbers or text messaging consent with third parties for marketing.
        </p>
      </LegalSection>

      <LegalSection n={6} title="How information is shared">
        <p>We share information only with service providers that help us run Manifest, under confidentiality and data protection terms:</p>
        <LegalList>
          <li>Google Cloud (hosting, file storage and secrets)</li>
          <li>Neon (database)</li>
          <li>Clerk (sign-in and account management)</li>
          <li>Anthropic (AI processing)</li>
          <li>Our text messaging provider (delivering texts)</li>
          <li>Vercel (hosting this website)</li>
        </LegalList>
        <p>
          We may also disclose information if required by law, to protect the rights and safety of our users or the
          public, or as part of a merger or acquisition. Within Manifest, each company's data is kept separate and is
          visible only to that company's members.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Security">
        <p>
          Data is encrypted in transit and at rest. Credentials for connected systems are encrypted before they are
          stored. Each company's records are separated at the database level, so one company's workspace cannot read
          another's. Access inside Transpira is limited to people who need it to run the service. No system is perfectly
          secure, and we will notify affected customers of a breach as the law requires.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Retention and deletion">
        <p>
          We keep customer data while the company uses Manifest. When a company stops using Manifest, or asks us to, we
          delete its mailbox data, connected-system data, uploads and text history within 30 days, except where the law
          requires us to keep it. Disconnecting a mailbox stops all further reading of it right away.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Your rights">
        <p>
          Depending on where you live, you may have the right to access, correct, delete or export your personal
          information, or to object to how it is used. If your data is in Manifest because your employer uses it, we
          may refer your request to them. Email {mail} and we will reply within 30 days.
        </p>
      </LegalSection>

      <LegalSection n={10} title="Children">
        <p>Manifest is a business service and is not directed to anyone under 16. We do not knowingly collect their data.</p>
      </LegalSection>

      <LegalSection n={11} title="Changes">
        <p>
          We will post changes here and update the date above. For material changes we will tell customers by email or
          in Manifest before they take effect. See also our{" "}
          <Link to="/terms" className="text-foreground underline underline-offset-2">
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection n={12} title="Contact">
        <p>Questions about this policy or your data: {mail}.</p>
      </LegalSection>
    </LegalPage>
  );
}
