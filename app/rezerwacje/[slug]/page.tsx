import Link from "next/link";
import serviceSlugs from "@/public/serviceSlugs.json";
import { FaClock } from "react-icons/fa";
export async function generateStaticParams() {
  return serviceSlugs.content.map((item) => ({
    slug: item.url,
  }));
}
async function getServicesList() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/content`);

  const services = req.json();
  return services;
}
export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getServicesList();

  return (
    <div className="">
      {data.content.map((item: any, i: any) => (
        <>
          {params.slug === item.url && (
            <div
              key={i}
              className="font-sans py-12 h-[100vh] px-6 md:px-8 xl:px-32 bg-slug bg-cover bg-center"
            >
              <div className="flex flex-row items-center mb-6 text-sm">
                <Link
                  href="/rezerwacje"
                  className=" text-zinc-800 drop-shadow-xl shadow-black"
                >
                  /rezerwacje
                </Link>
                <Link
                  href={`/rezerwacje/${item.url}`}
                  className=" text-zinc-800 drop-shadow-xl shadow-black"
                >
                  /{item.url}
                </Link>
              </div>
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-zinc-800 drop-shadow-xl shadow-black">
                {item.service}
              </h1>
              <div className="font-bold text-xl text-green-600 flex flex-row items-center mt-2">
                <FaClock className="h-8 w-8 text-zinc-800 mr-2" />
                {item.additionalInfo.duration}
              </div>
              <p className="text-lg lg:text-xl lg:w-2/3 mt-3 lg:mt-6 text-zinc-800 drop-shadow-xl shadow-black">
                {item.serviceDesc}
              </p>
              <div className="">
                <h2 className="text-2xl text-zinc-800 drop-shadow-xl shadow-black mt-8 font-bold">
                  {item.service}, czyli:
                </h2>
                <div className="text-lg text-zinc-800 drop-shadow-xl shadow-black flex flex-col mt-2">
                  <span className="grid grid-cols-2 gap-2 lg:flex lg:space-x-3">
                    {item.additionalInfo.optionsAvailable.map(
                      (option: string, i: number) => (
                        <span
                          className="bg-zinc-800 drop-shadow-md shadow-black p-1 px-2 text-white"
                          key={i}
                        >
                          {" "}
                          {option}
                        </span>
                      )
                    )}
                  </span>
                </div>
              </div>
              <div className="mt-12">
                <Link
                  href="/rezerwacje"
                  className="bg-black p-3 text-white font-light border-4 border-transparent hover:border-white duration-300"
                >
                  ZAREZERWUJ
                </Link>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
}
