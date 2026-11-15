import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = pageMetadata("de", { key: "about" });

export default function Page() {
  return <AboutPage locale="de" />;
}
