import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy policy" updated="placeholder date">
      <p>
        This is placeholder privacy policy content for {siteConfig.name}.
        Replace this page with your studio&apos;s actual data-handling
        practices, including what information is collected through the
        contact form, how it is stored, and how visitors can request its
        removal.
      </p>
      <p>
        Until real legal copy is added, this page should not be treated as a
        binding privacy policy.
      </p>
      <p>
        Questions about this placeholder can be directed to{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-accent underline">
          {siteConfig.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
