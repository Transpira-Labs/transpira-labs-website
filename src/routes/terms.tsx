import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT_EMAIL } from "@/components/site-chrome";
import { LegalPage, LegalSection, LegalList } from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Transpira" },
      { name: "description", content: "The terms for using transpiralabs.com and Manifest." },
      { property: "og:title", content: "Terms of Service | Transpira" },
      { property: "og:description", content: "The terms for using transpiralabs.com and Manifest." },
    ],
  }),
  component: TermsPage,
});

const mail = (
  <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2">
    {CONTACT_EMAIL}
  </a>
);

function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 13, 2026"
      intro={
        <p>
          These terms govern your use of transpiralabs.com and Manifest, including company workspaces at
          *.transpiralabs.com and our text line (together, the "Service"). The Service is provided by Classhopper
          Technologies Inc., doing business as Transpira Labs ("Transpira", "we", "us"). By using the Service you agree
          to these terms. If you use it for a company, you agree on that company's behalf and confirm you are allowed
          to. Where a company has signed a separate agreement with us, that agreement controls if it conflicts with
          these terms.
        </p>
      }
    >
      <LegalSection n={1} title="The Service">
        <p>
          Manifest reads the mailboxes and business systems your company connects, finds quote requests and other
          freight work, looks up prices in those systems and drafts replies and actions. Drafts, bookings and other
          changes wait for a person at your company to approve them. Features may change as we improve the Service,
          and some are offered as previews or in a sandbox.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Accounts">
        <LegalList>
          <li>You must give accurate information and keep your sign-in secure.</li>
          <li>
            Your company decides who can sign in to its workspace. You are responsible for activity under your account
            and for telling us promptly about any unauthorized use.
          </li>
          <li>Text-line tokens are personal. Do not share them; disconnect a phone you no longer use.</li>
        </LegalList>
      </LegalSection>

      <LegalSection n={3} title="Your data and connections">
        <p>
          Your company owns the data it brings to the Service: emails, attachments, quotes, shipments, files and
          messages ("Customer Data"). You give us permission to access, store and process Customer Data only to provide,
          secure and support the Service for you, as described in our{" "}
          <Link to="/privacy" className="text-foreground underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          You confirm that you have the right to connect each mailbox, system and phone number you connect, and that
          doing so does not breach your agreements with those providers or with your customers. Use of a connected
          system (for example a TMS, Priority1 or a load board) is also governed by that provider's own terms.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Review before you rely on it">
        <p>
          Manifest uses AI and data from third-party systems. Drafts, prices, freight classes, carrier details and other
          outputs can be incomplete or wrong. You are responsible for reviewing every draft and action before you
          approve it, and for the quotes, commitments and bookings your company makes. Prices shown come from the
          systems you connect or from rules you set; we do not guarantee any rate, capacity or carrier performance.
          Manifest is not a broker, carrier or freight forwarder and does not take part in your transactions.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Acceptable use">
        <p>You agree not to:</p>
        <LegalList>
          <li>use the Service for anything unlawful, deceptive or to send spam;</li>
          <li>connect accounts or systems you are not authorized to use;</li>
          <li>try to access another company's workspace or data, or get around security or usage limits;</li>
          <li>reverse engineer, copy or resell the Service, or use it to build a competing product;</li>
          <li>upload malware or interfere with the Service's operation.</li>
        </LegalList>
        <p>We may suspend access that breaks these rules or puts the Service or other users at risk.</p>
      </LegalSection>

      <LegalSection n={6} title="Text messages">
        <p>
          By connecting a phone you agree to receive texts about your company's work in Manifest. Message frequency
          varies. Message and data rates may apply. Text DISCONNECT to the line or remove the phone in Settings to stop.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Fees">
        <p>
          Paid plans, pilots and their fees are set out in an order form or written agreement with your company. Unless
          that agreement says otherwise, fees are non-refundable and exclude taxes.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Our property and feedback">
        <p>
          We own the Service, its software and its design. These terms do not give you any rights in them beyond using
          the Service. If you send us suggestions, we may use them without obligation to you.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Confidentiality">
        <p>
          We keep Customer Data and any non-public information about your business confidential and use it only to
          provide the Service, except where disclosure is required by law.
        </p>
      </LegalSection>

      <LegalSection n={10} title="Ending use">
        <p>
          You may stop using the Service at any time by disconnecting your accounts and telling us. We may suspend or
          end access for a breach of these terms, or end a free or preview service with reasonable notice. After your
          company stops using the Service we delete its Customer Data as described in the Privacy Policy. Sections 3, 4,
          8, 9, 11, 12 and 13 survive.
        </p>
      </LegalSection>

      <LegalSection n={11} title="Disclaimers">
        <p>
          The Service is provided "as is" and "as available". To the fullest extent allowed by law, we disclaim all
          warranties, express or implied, including merchantability, fitness for a particular purpose and
          non-infringement, and we do not promise the Service will be uninterrupted or error-free.
        </p>
      </LegalSection>

      <LegalSection n={12} title="Limitation of liability">
        <p>
          To the fullest extent allowed by law, neither party is liable for indirect, incidental, special,
          consequential or punitive damages, or for lost profits, revenue or data. Our total liability for any claim
          about the Service is limited to the amount your company paid us for the Service in the 12 months before the
          claim, or US$100 if it paid nothing.
        </p>
      </LegalSection>

      <LegalSection n={13} title="Indemnity">
        <p>
          You will defend and indemnify Transpira against third-party claims arising from Customer Data you connect
          without authorization, from quotes or bookings you approve, or from your breach of these terms.
        </p>
      </LegalSection>

      <LegalSection n={14} title="Changes to these terms">
        <p>
          We may update these terms. We will post the new version here and update the date above, and tell customers
          about material changes before they take effect. Continuing to use the Service after that means you accept
          the new terms.
        </p>
      </LegalSection>

      <LegalSection n={15} title="Governing law">
        <p>
          These terms are governed by the laws of the state in which Classhopper Technologies Inc. is incorporated,
          without regard to its conflict-of-law rules, and disputes will be resolved in the courts of that state.
        </p>
      </LegalSection>

      <LegalSection n={16} title="Contact">
        <p>Questions about these terms: {mail}.</p>
      </LegalSection>
    </LegalPage>
  );
}
