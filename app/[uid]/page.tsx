import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getSiteMode } from "@/app/lib/site-mode";

type Params = { uid: string };

// A slice's "Show on version" field lets the same page render different content
// per theme: White (light = Malak Haynes) vs Black (dark = Very Inner
// Vibrations). "Both" (or unset) always shows.
function visibleForMode(slice: { primary?: { visible_on?: string | null } }, mode: "light" | "dark"): boolean {
  const v = slice.primary?.visible_on ?? "Both";
  if (v === "White only") return mode === "light";
  if (v === "Black only") return mode === "dark";
  return true;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  const mode = await getSiteMode();
  const slices = page.data.slices.filter((slice) => visibleForMode(slice, mode));

  return <SliceZone slices={slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");
  return pages.map((page) => ({ uid: page.uid }));
}
