import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";
import { RootShell } from "@/components/RootShell";

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: { icon: "/favicon.svg" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
