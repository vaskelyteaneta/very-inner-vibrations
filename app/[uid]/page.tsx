import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import BackButton from "@/app/components/BackButton";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  // Project pages get a Back button; top-level pages linked directly from the
  // nav (Music/About) don't need one — you reach those from the nav, and the
  // circle button handles moving between the two sites.
  //
  // Matched on the linked document's uid, not its resolved .url: this repo's
  // client can't pass `routes` (see prismicio.ts), so document links never
  // carry a url and the old url-based check matched nothing — which made
  // every page look like a project page and showed Back everywhere.
  const settings = await client.getSingle("settings");
  const navUids = new Set(
    settings.data.navigation.flatMap((item) =>
      item.link.link_type === "Document" && item.link.uid ? [item.link.uid] : []
    )
  );
  const isProjectPage = !navUids.has(uid);

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      {isProjectPage && <BackButton />}
    </>
  );
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
