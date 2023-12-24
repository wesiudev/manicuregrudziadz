/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { IService } from ".";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
export const GridElement = ({
  index,
  serviceName,
  serviceDesc,
  duration,
  url,
}: IService) => {
  return (
    <div className="bg-white flex flex-col justify-between min-w-[300px] lg:min-w-[400px] cursor-grab rounded-xl">
      <h2 className="text-xl sm:text-2xl p-3 pb-0 font-bold flex flex-row justify-between items-center">
        <span className="flex flex-row items-center text-base">
          <FaClock className="mr-2 text-zinc-800 w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-green-600">{duration}</span>
        </span>
        {serviceName}
      </h2>
      <p className="text-xl h-full flex flex-col  mt-3">
        <Image
          src={`/images/portfolio/img${index + 2}.jpg`}
          width={1024}
          height={1024}
          alt=""
          className=""
        />
        <span className="hidden sm:block mt-3 text-sm px-3">{serviceDesc}</span>
      </p>
      <Link
        className="w-full py-2 bg-black rounded-b-xl text-white font-light text-center mt-0 sm:mt-3"
        href={url}
        title={`Manicure ${serviceName} trwa zazwyczaj ${duration}`}
      >
        Sprawdź
      </Link>
    </div>
  );
};
