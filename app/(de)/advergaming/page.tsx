import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { AdvergamingPage } from "@/components/pages/AdvergamingPage";

export const metadata: Metadata = pageMetadata("de", { key: "advergaming" });

export default function Page() {
  return <AdvergamingPage locale="de" />;
}
