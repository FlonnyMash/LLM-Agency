import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { ServicesPage } from "@/components/pages/ServicesPage";

export const metadata: Metadata = pageMetadata("de", { key: "services" });

export default function Page() {
  return <ServicesPage locale="de" />;
}
