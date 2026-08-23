import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of service" updated="placeholder date">
      <p>
        This is placeholder terms-of-service content for {siteConfig.name}.
        Replace this page with your studio&apos;s actual terms governing use
        of this website and any services described on it.
      </p>
      <p>
        Until real legal copy is added, this page should not be treated as a
        binding agreement.
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
