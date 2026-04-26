"use client";

import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type FormProps = SliceComponentProps<Content.FormSlice>;

const Form: FC<FormProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col gap-4 px-10 py-6 mt-30"
    >
      {slice.primary.form?.map((item, i) => (
        <div key={i} className="flex flex-col gap-1">
          <PrismicRichText field={item.question} />
          <input
            type="text"
            placeholder={asText(item.input)}
            className="border-b-2 border-primary"
          />
        </div>
      ))}
    </section>
  );
};

export default Form;
