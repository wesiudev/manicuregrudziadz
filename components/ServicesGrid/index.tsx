"use client";
import { GridElement } from "./GridElement";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export const ServicesGrid = ({ services }: { services: any[] }) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <div className="bg-heroImage font-sans w-full h-[200vh] bg-cover bg-bottom flex flex-col pt-24">
      <h2 className="w-max mx-auto text-2xl lg:text-3xl font-light text-zinc-800 drop-shadow-xl shadow-black text-center px-6 md:px-8 xl:px-32 ">
        OFEROWANE USŁUGI <br className="block sm:hidden" /> MANICURE
      </h2>
      <div
        {...events}
        ref={ref}
        className="relative w-[90%] mx-auto mt-20 flex flex-row overflow-x-scroll space-x-6 scrollbar-rounded pb-4"
      >
        {services.map((item: any, i: number) => (
          <GridElement
            key={i}
            index={i}
            duration={item.duration}
            serviceDesc={item.serviceDesc}
            serviceName={item.serviceName}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
};
