import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";

export default async function Boka() {
  const client = createClient();
  const page = await client.getSingle("bookingpage");

  return (
        <>
            <SliceZone slices={page.data.slices} components={components} />
        </>
    );
}