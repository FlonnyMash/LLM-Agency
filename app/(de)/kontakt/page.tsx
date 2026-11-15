import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = pageMetadata("de", { key: "contact" });

export default function Page() {
  return <ContactPage locale="de" />;
}
