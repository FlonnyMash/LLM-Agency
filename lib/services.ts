import type { Dictionary } from "@/lib/i18n/getDictionary";

export type Service = Dictionary["services"][number];

export function getServices(dict: Dictionary): Service[] {
  return dict.services;
}
