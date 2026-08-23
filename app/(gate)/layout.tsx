import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontClassName } from "@/lib/fonts";
import { gateRedirectScript } from "@/lib/i18n/redirect-script";
import "../globals.css";

export const metadata: Metadata = {
  title: "LLM Agency",
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f6f4",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function GateLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontClassName} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: gateRedirectScript }} />
      </head>
      <body className="min-h-full bg-paper text-ink">{children}</body>
    </html>
  );
}
