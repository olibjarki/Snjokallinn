import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink } from "@prismicio/react";

export default async function Brudkaup() {
  const client = createClient();
  const page = await client.getSingle("weddingpage").catch(() => notFound());

  return(
    <>
    <main className="flex flex-col gap-10">
        <PrismicNextImage
            field={page.data.brudkauphero}
        />
        <div className="flex flex-col gap-4 mx-8">
            <PrismicRichText
                field={page.data.heading}
                components={{
                    heading1: ({ children }) => (
                    <h1 className="font-bubblegum text-3xl text-black leading-4 text-center">{children}</h1>
                    ),
                }}
            />
            <PrismicRichText
                field={page.data.body}
                components={{
                    paragraph: ({ children }) => (
                    <p className="font-nunito text-[16px]">{children}</p>
                    ),
                }}
            />
        </div>
        <PrismicNextImage
            field={page.data.brudkaupimage}
        />
        <div className="flex justify-center">
            <PrismicLink 
                field={page.data.bokabutton} 
                className="bg-primary text-white no-underline font-nunito font-bold text-2xl px-8 py-3 rounded-full uppercase tracking-wide hover:bg-primary-hover" 
            /> 
        </div>
        <SliceZone slices={page.data.slices} components={components} />
        <div className="h-100"></div>
    </main>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("weddingpage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}