"use client";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagramSquare,
  FaMap,
  FaPhone,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <div
      className={`px-6 md:px-8 xl:px-32 w-full bg-[#FFE5B4] text-black font-sans font-light flex flex-col items-center justify-center ${
        pathname.includes("admin") && "hidden"
      }`}
    >
      <div className="py-12 grid grid-cols-1 lg:grid-cols-3">
        <div className="px-3 w-full flex flex-col justify-center text-center items-center lg:items-start lg:text-left mb-6 lg:mb-0">
          <h2 className="text-3xl text-zinc-800 font-bold">KONTAKT</h2>
          <div className="flex flex-row items-center mt-[9px]">
            <FaPhone className="text-zinc-800 h-4 w-4 mr-2" />{" "}
            <a href="tel:+48 664 205 952">+48 664 205 952</a>
          </div>
          <div className="flex flex-row items-center mt-[3px]">
            <FaEnvelope className="text-zinc-800 h-4 w-4 mr-2" />{" "}
            <a href="mailto:a.zebrovvska@gmail.com">a.zebrovvska@gmail.com</a>
          </div>
        </div>
        <div className="px-3 flex flex-col items-center justify-center lg:border-x border-gray-700 border-opacity-20 w-full">
          <div className="font-light space-x-3 lg:space-x-0 flex flex-row lg:flex-col text-zinc-800 drop-shadow-md shadow-black">
            <Link
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100093117955227"
              className="flex flex-row items-center text-base font-bold sm:font-normal sm:text-2xl w-max rounded-md p-1 relative "
            >
              <FaFacebook className="h-8 w-8 text-zinc-800 mr-2" />
              /piekniej
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/piekniej_aniazebrowska/"
              className="flex flex-row items-center text-base font-bold sm:font-normal sm:text-2xl w-max rounded-md p-1 relative "
            >
              <FaInstagramSquare className="text-zinc-800 h-8 w-8 rounded-full mr-2" />
              /piekniej
            </Link>
          </div>
        </div>
        <div className="mt-6 lg:mt-0 px-3 w-full lg:border-r border-gray-700 border-opacity-20 flex items-center justify-center text-center">
          <Link
            href="/sitemap-xml"
            className="text-xl text-zinc-800  flex flex-row items-center"
          >
            <FaMap className="h-6 w-6 mr-2 text-zinc-800 font-light" /> MAPA
            STRONY
          </Link>
        </div>
      </div>
      <div className="bg-black bg-opacity-50 pt-1 px-1 rounded-t-xl text-white">
        <Link
          target="_blank"
          title="Quixy - Strony Internetowe, Web Development"
          href="https://quixy.pl/grudziadz"
        >
          Wykonanie: <span className="text-yellow-400">Quixy</span>
        </Link>
      </div>
    </div>
  );
}
