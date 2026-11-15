import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = pageMetadata("en", { key: "home" });

export default function Page() {
  return <HomePage locale="en" />;
}
