"use client";
import { useState } from "react";
import Image from "next/image";
import { PrismicNextLink } from "@prismicio/next";
import type { LinkField } from "@prismicio/client";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

type NavLink = { label: string | null; link: LinkField };
type Props = { links: NavLink[]; background: ImageField };

export default function NavToggle({ links, background }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex flex-col cursor-pointer lg:hidden relative z-50"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <Image src={open ? "/Icons/HamburgerClose.png" : "/Icons/HamburgerMenu.png"} alt="Menu" width={40} height={29} />
      </button>

      {/* Mobile */}
      <div
        className={`fixed inset-0 z-40 bg-cover bg-top bg-black lg:hidden ${open ? "flex" : "hidden"}`}
        style={background?.url ? { backgroundImage: `url(${background.url})` } : undefined}
      >
        <ul className="flex flex-col gap-4 pt-40 pl-10 list-none">
          {links.map((item, i) => (
            <li key={i}>
              <PrismicNextLink
                field={item.link}
                className="no-underline text-white font-nunito font-semibold text-3xl"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop */}
      <ul className="hidden lg:flex flex-row gap-3 list-none">
        {links.map((item, i) => (
          <li key={i}>
            <PrismicNextLink
              field={item.link}
              className="no-underline text-white font-nunito font-semibold text-xl pr-10 hover:text-primary"
            >
              {item.label}
            </PrismicNextLink>
          </li>
        ))}
      </ul>
    </>
  );
}
