import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaStar } from "react-icons/fa";

export default function Reserve() {
  return (
    <div className="bg-white min-h-screen w-full flex items-center justify-center font-sans">
      <div className="lg:w-[900px] w-full min-h-screen bg-white lg:-mt-48 flex flex-col lg:flex-row">
        <div className="bg-icecream bg-cover bg-center w-full h-screen relative">
          <h2 className="text-6xl text-zinc-700 drop-shadow-lg shadow-black font-light text-center pt-6">
            TO <br /> PROSTE!
          </h2>
          <p className="text-xl text-zinc-700 drop-shadow-lg shadow-black font-light text-center px-3 mt-4">
            Aby zarezerwować termin, skontaktuj się ze mną telefonicznie lub
            użyj narzędzia na mojej stronie.
          </p>
          <Link
            title="ZAREZERWUJ USŁUGĘ MANICURE NA STORNIE"
            href="/rezerwacje"
            className="flex absolute bottom-0 left-0 min-h-[200px] w-full bg-black duration-300 text-white font-bold items-center justify-center text-3xl text-center"
          >
            ZAREZERWUJ <br /> NA STRONIE
          </Link>
        </div>
        <div className=" flex-col w-full lg:h-screen mb-[70px] flex">
          <Image
            src="/images/page/8.webp"
            width={512}
            height={512}
            alt="Manicure Hybrydowy Grudziądz"
            className="w-full -mt-24 hidden lg:block"
          />
          <Image
            src="/images/page/6.webp"
            width={512}
            height={512}
            alt="Manicure Hybrydowy Grudziądz"
            className="w-full hidden lg:block"
          />

          <div className=" grid-cols-2 hidden lg:grid">
            <Image
              src="/images/page/7.webp"
              width={512}
              height={512}
              alt="Manicure Hybrydowy Grudziądz"
              className="w-full"
            />
            <Image
              src="/images/page/5.webp"
              width={512}
              height={512}
              alt="Manicure Hybrydowy Grudziądz"
              className="w-full"
            />
          </div>
          <div className="flex flex-col px-4 min-h-[200px] lg:min-h-[100px] lg:h-full justify-center bg-[#E3E5E4] py-6 lg:py-0">
            <p className="sm:font-light text-sm font-bold sm:text-2xl italic text-center flex flex-col px-4 min-h-[200px] lg:min-h-[100px] lg:h-full justify-center bg-[#E3E5E4] py-6 lg:py-0">
              #UMOWMYSIENAPAZNOKCIE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
