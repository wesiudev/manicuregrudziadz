"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PortfolioOpen({
  setPortfolioOpen,
}: {
  setPortfolioOpen: Function;
}) {
  const [currentOpen, setCurrentOpen] = useState(-1);
  return (
    <button
      onClick={(e: any) => {
        e.stopPropagation(), setPortfolioOpen(false), setCurrentOpen(-1);
      }}
      className={`z-[100] px-[5vw] lg:px-[25vw] py-[100px] fixed left-0 top-0 bg-black h-screen w-screen overflow-y-scroll scrollbar-rounded bg-opacity-90 ${
        currentOpen > -1 && "pt-[70vh]"
      }
      ${
        currentOpen > -1
          ? "flex flex-row space-x-2 overflow-x-scroll"
          : "grid grid-cols-2 sm:grid-cols-3  gap-3 sm:gap-2 lg:gap-1"
      }`}
    >
      {currentOpen > -1 && (
        <div className="left-[50%] top-[100px] -translate-x-[50%] fixed px-[5vw] lg:px-[25vw] w-full max-h-[80vh] flex items-center justify-center">
          <Image
            src={`/images/portfolio/img${currentOpen}.jpg`}
            width={1024}
            height={1024}
            alt=""
            className="lg:max-h-[80vh] lg:w-auto rounded-xl"
          />
        </div>
      )}
    </button>
  );
}
