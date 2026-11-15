import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, idFromSlug, serviceIds, serviceRef, slugOf } from "@/lib/i18n";
import { pageMetadata } from "@/lib/site";
import { ServiceDetailPage } from "@/components/pages/ServiceDetailPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceIds.map((id) => ({ slug: slugOf("en", id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const id = idFromSlug("en", slug);
  const s = id ? getService("en", id) : undefined;
  if (!s) return {};
  return pageMetadata("en", serviceRef(s.id), {
    title: `${s.title}: ${s.tag}`,
    description: `${s.lead} ${s.what}`.slice(0, 200),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = idFromSlug("en", slug);
  const s = id ? getService("en", id) : undefined;
  if (!s) notFound();
  return <ServiceDetailPage locale="en" s={s} />;
}
