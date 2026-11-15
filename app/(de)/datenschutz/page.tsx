import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { PrivacyPage } from "@/components/pages/LegalPages";

export const metadata: Metadata = pageMetadata("de", { key: "privacy" });

export default function Page() {
  return <PrivacyPage locale="de" />;
}
