import Image from "next/image";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import Link from "next/link";
import { GoogleAuthProvider } from "firebase/auth";
import GoToPortfolioBtn from "./GoToPortfolioBtn";

export const Hero = () => {
  return (
    <div className="w-full flex flex-col lg:h-screen lg:pb-24 lg:flex-row bg-zinc-700">
      <div className="w-full h-full px-6 md:px-8 xl:px-32 flex flex-col lg:flex-row items-center justify-center relative py-12">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="/images/anna_zebrowska2.png"
            width={1024}
            height={1024}
            alt=""
            className="h-auto w-full mx-auto pr-12 pt-12"
          />
        </div>

        <div className=" text-white rounded-xl mt-6 lg:mt-3 w-full flex flex-col h-full justify-center">
          <span className="text-3xl md:text-4xl xl:text-5xl font-bold font-sans ">
            Cześć!
          </span>
          <p className="my-3 font-sans pt-2">
            Jestem Anna Żebrowska, prowadzę salon kosmetyczny w Grudziądzu
            specjalizujący się w usługach manicure i pedicure. Jeśli marzysz o
            perfekcyjnie zadbanym wyglądzie swoich paznokci lub planujesz
            stylizację na nadchodzącą imprezę, serdecznie zapraszam do
            zarezerwowania wizyty. Wybierz dogodny termin, abyśmy mogły wspólnie
            stworzyć wyjątkową stylizację dla Twoich paznokci.
          </p>
          <div className="w-full h-max font-sans flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row w-full text-zinc-800 drop-shadow-md shadow-black space-x-3">
                <Link
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=100093117955227"
                  className="flex flex-row items-center text-2xl w-max rounded-md p-1 relative font-bold"
                >
                  <FaFacebook className="h-8 w-8 text-white " />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.instagram.com/piekniej_aniazebrowska/"
                  className="flex flex-row items-center text-2xl w-max rounded-md p-1 relative font-bold"
                >
                  <FaInstagramSquare className="text-white h-8 w-8 bg-gradient-to-b bg-opacity-75 rounded-full " />
                </Link>
              </div>
              <Link
                href="/rezerwacje"
                className="flex flex-row items-center text-2xl w-max rounded-md relative font-bold text-yellow-400"
              >
                Zarezerwuj
              </Link>
            </div>
            <GoToPortfolioBtn>
              <div className="grid grid-cols-4 gap-3 w-full mt-6">
                {[1, 2, 3, 4].map((item: any, i: any) => (
                  <div key={i}>
                    <Image
                      style={{ boxShadow: "0px 0px 3px yellow" }}
                      src={`/images/portfolio/img${item}.jpg`}
                      width={222}
                      height={222}
                      alt=""
                      className="rounded-xl w-full"
                    />
                  </div>
                ))}
              </div>
            </GoToPortfolioBtn>
          </div>
        </div>
      </div>
    </div>
  );
};
