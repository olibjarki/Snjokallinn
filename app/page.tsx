import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { PrismicLink } from "@prismicio/react";

export default async function HomePage() {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return (
    <>
    <main className="flex flex-col gap-10">
      <video
        src="https://res.cloudinary.com/dkad4re2i/video/upload/kLIPPA_FYRIR_WEBSITE_smolTallShort_xvc0bq.mp4"
        autoPlay loop muted playsInline
        className="w-full h-full object-cover"
      />
      <div className="flex flex-col gap-4 mx-8">
        <PrismicRichText
          field={page.data.heading}
          components={{
            heading1: ({ children }) => (
            <h1 className="font-bubblegum text-3xl text-black leading-tight text-center">{children}</h1>
            ),
          }}
        />
        <PrismicRichText
          field={page.data.body_paragraph}
          components={{
            paragraph: ({ children }) => (
              <p className="font-nunito text-[16px]">{children}</p>
            ),
          }}
        />
      </div>
      <div className="flex justify-center">
          <PrismicLink 
              field={page.data.boka_sjut} 
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
  const page = await client.getSingle("homepage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}