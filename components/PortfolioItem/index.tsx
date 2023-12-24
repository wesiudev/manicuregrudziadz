"use client";
import { generateRandomDescription } from "@/app/utils/generateRandomDescription";
import Image from "next/image";
import { useState } from "react";

export default function PortfolioItem({ item }: { item: number }) {
  const [currentOpen, setCurrentOpen] = useState(-1);
  return (
    <div>
      {currentOpen > -1 && (
        <button
          onClick={() => setCurrentOpen(-1)}
          className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-80 z-[100]"
        >
          <Image
            src={`/images/portfolio/img${item}.jpg`}
            width={1024}
            height={1024}
            alt=""
            className="w-[90vw] sm:max-h-[70vh] sm:w-auto rounded-xl"
          />
        </button>
      )}
      <button onClick={() => setCurrentOpen(item)}>
        <Image
          src={`/images/portfolio/img${item}.jpg`}
          width={512}
          height={512}
          className={`cursor-default rounded-xl aspect-square w-full h-full hover:scale-105 duration-150`}
          alt={generateRandomDescription()}
        />
      </button>
    </div>
  );
}
