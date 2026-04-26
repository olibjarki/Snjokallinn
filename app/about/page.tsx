import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export default async function About() {
  const client = createClient();
  const page = await client.getSingle("aboutpage").catch(() => notFound());

  return (
    <>
    <main className="flex flex-col gap-10">
        <PrismicNextImage 
            field={page.data.profile}
        />
        <div className="flex flex-col gap-4 mx-8">
            <PrismicRichText 
                field={page.data.header} 
                components={{
                    heading1: ({ children }) => (
                    <h1 className="font-bubblegum text-3xl text-black text-center">{children}</h1>
                    )
                }}
            />
            <PrismicRichText 
                field={page.data.body} 
                components={{
                    paragraph: ({ children }) => (
                    <p className="font-nunito text-[16px]">{children}</p>
                    )
                }}
            />
        </div>
    </main>
    </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("aboutpage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
