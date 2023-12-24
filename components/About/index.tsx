"use client";
import { cutSentence } from "@/app/utils/cutSentence";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDraggable } from "react-use-draggable-scroll";
export default function About({ carousel }: { carousel: any }) {
  const [currentOpen, setCurrentOpen] = useState(-1);
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  return (
    <div className=" bg-white pb-24 font-sans select-none">
      <h2 className="bg-black text-white font-light text-center w-[85vw] lg:w-[900px] p-3 mx-auto">
        Parę słów o paznokciach - manicure, który oferuję.
      </h2>
      <div
        {...events}
        ref={ref}
        className="flex flex-row  overflow-x-scroll space-x-6 w-[85vw] lg:w-[900px] mx-auto scrollbar-rounded cursor-grab"
      >
        {carousel.map((item: any, i: any) => (
          <div className="" key={i}>
            <button
              onClick={() => setCurrentOpen(i)}
              key={i}
              className="text-left min-w-[300px] flex flex-col h-full py-4 cursor-grab"
            >
              <h2 className="font-bold bg-black p-3 text-white h-max cursor-pointer">
                {item.title}
              </h2>
              <p className="p-2 pt-4 bg-gray-300 h-full">
                {cutSentence(item.content)}
              </p>
            </button>
            {currentOpen === i && (
              <div
                onClick={(e) => {
                  e.stopPropagation(), setCurrentOpen(-1);
                }}
                className="cursor-default fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-80 z-[1500] flex items-center justify-center"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="max-h-[80vh] overflow-x-hidden overflow-y-scroll scrollbar w-[100vw] sm:w-[85vw] lg:w-[900px]  bg-white"
                >
                  <h2 className="bg-black text-white text-center w-full lg:w-[900px] py-3 font-bold">
                    {item.title}
                  </h2>
                  <div className="grid grid-cols-2">
                    <Image
                      src={`/images/portfolio/img${i + 3}.jpg`}
                      width={516}
                      height={516}
                      alt="Hybrydy Grudziądz Rezerwacje"
                      className=""
                    />
                    <Image
                      src={`/images/portfolio/img${i + 2}.jpg`}
                      width={516}
                      height={516}
                      alt="Hybrydy Grudziądz Rezerwacje"
                      className=""
                    />
                  </div>

                  <p className="p-2 sm:p-4">{item.content}</p>
                  <div className="grid grid-cols-2 gap-2 p-2 sm:p-4 mt-2">
                    <Link
                      title="Sprawdź manicure hybrydowe w Grudziądzu"
                      href="/rezerwacje/paznokcie-hybrydowe-grudziadz"
                      className="bg-black text-white p-1"
                    >
                      #Hybrydy
                    </Link>
                    <Link
                      title="Sprawdź manicure zelowy w Grudziądzu"
                      href="/rezerwacje/paznokcie-zelowe-grudziadz"
                      className="bg-black text-white p-1"
                    >
                      #Zelowe
                    </Link>
                    <Link
                      title="Sprawdź manicure francuski w Grudziądzu"
                      href="/rezerwacje/paznokcie-francuskie-grudziadz"
                      className="bg-black text-white p-1"
                    >
                      #Francuskie
                    </Link>
                    <Link
                      title="Sprawdź manicure klasyczne w Grudziądzu"
                      href="/rezerwacje/paznokcie-klasyczne-grudziadz"
                      className="bg-black text-white p-1"
                    >
                      #Klasyczne
                    </Link>
                    <Link
                      title="Sprawdź manicure naturalny w Grudziądzu"
                      href="/rezerwacje/paznokcie-naturalne-grudziadz"
                      className="bg-black text-white p-1"
                    >
                      #Naturalne
                    </Link>
                    <Link
                      title="Sprawdź manicure zdobiony w Grudziądzu"
                      href="/rezerwacje/paznokcie-zdobione-grudziadz"
                      className="bg-black text-white p-1"
                    >
                      #Zdobione
                    </Link>
                  </div>
                  <button
                    onClick={() => setCurrentOpen(-1)}
                    className="h-12 w-12 rounded-full border border-gray-400 flex items-center justify-center mt-6 mb-6 mx-auto"
                  >
                    <IoMdClose className="w-8 h-8" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
