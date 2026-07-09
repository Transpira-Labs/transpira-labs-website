import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Transpira" },
      { name: "description", content: "Transpira privacy policy." },
      { property: "og:title", content: "Privacy Policy | Transpira" },
      { property: "og:description", content: "Transpira privacy policy." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="pt-28 pb-24 px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl tracking-tight mb-10 text-foreground">
            Privacy Policy
          </h1>
          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <p className="text-sm text-muted-foreground">
              Last updated: June 9, 2026
            </p>

            <section>
              <h2 className="font-display text-xl mb-3 text-foreground">1. Introduction</h2>
              <p>
                Classhopper Technologies Inc. ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-3 text-foreground">2. Information We Collect</h2>
              <p className="mb-3">
                We may collect the following types of information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Personal Information:</strong> Name, email address, and contact details you provide when requesting access or contacting us.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent.</li>
                <li><strong>Cookies and Similar Technologies:</strong> We use cookies to enhance your browsing experience and analyze site traffic.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl mb-3 text-foreground">3. How We Use Your Information</h2>
              <p className="mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Provide, operate, and maintain our website and services</li>
                <li>Respond to your inquiries and fulfill access requests</li>
                <li>Improve and personalize your experience</li>
                <li>Communicate updates, research, and relevant information about our platform and services</li>
                <li>Monitor and analyze usage trends and website performance</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl mb-3 text-foreground">4. Data Sharing and Disclosure</h2>
              <p>
                We do not sell your personal information. We may share your information with trusted service providers who assist us in operating our website and services, subject to strict confidentiality obligations. We may also disclose information when required by law or to protect our rights and safety.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-3 text-foreground">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-3 text-foreground">6. Your Rights</h2>
              <p>
                Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict the processing of your personal information. To exercise these rights, please contact us at adi@transpiralabs.com.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-3 text-foreground">7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-3 text-foreground">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-3 text-foreground">9. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
                <a href="mailto:adi@transpiralabs.com" className="text-foreground hover:underline">
                  adi@transpiralabs.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
