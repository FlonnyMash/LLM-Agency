import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { ImprintPage } from "@/components/pages/LegalPages";

export const metadata: Metadata = {
  ...pageMetadata("en", { key: "imprint" }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ImprintPage locale="en" />;
}
