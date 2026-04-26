"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export type ImageCarouselProps = SliceComponentProps<Content.ImageCarouselSlice>;

const ImageCarousel: FC<ImageCarouselProps> = ({ slice }) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ speed: 0.75, stopOnInteraction: false }),
  ]);

  const slides = slice.primary.repeatablezone.map((item) => ({
    src: (item.image as { url?: string }).url ?? "",
  }));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex gap-2 pl-2">
        {slice.primary.repeatablezone.map((item, i) => (
          <div
            key={i}
            className="flex-none h-40 cursor-pointer"
            onClick={() => setLightboxIndex(i)}
          >
            <PrismicNextImage field={item.image} className="h-40 w-auto object-cover" />
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </section>
  );
};

export default ImageCarousel;
