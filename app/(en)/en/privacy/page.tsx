import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { PrivacyPage } from "@/components/pages/LegalPages";

export const metadata: Metadata = pageMetadata("en", { key: "privacy" });

export default function Page() {
  return <PrivacyPage locale="en" />;
}
