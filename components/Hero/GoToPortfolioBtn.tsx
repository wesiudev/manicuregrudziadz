"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoToPortfolioBtn({
  children,
}: {
  children: React.ReactNode;
}) {
  const [goToPortfolio, setGoToPortfolio] = React.useState(false);
  const router = useRouter();
  return (
    <>
      {goToPortfolio && (
        <div className="bg-white w-[90vw] sm:w-max shadow-sm shadow-black rounded-xl flex flex-col items-center justify-center p-3 lg:p-6 fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
          <h2 className="text-zinc-700 drop-shadow-xl shadow-black text-2xl text-center font-bold">
            Chcesz przejść do portfolio?
          </h2>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => {
                setGoToPortfolio(false), router.push("/rezerwacje/portfolio");
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl mt-4 rounded-xl w-full p-2 px-3"
            >
              Zobacz portfolio
            </button>
            <button
              onClick={() => setGoToPortfolio(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold text-xl mt-4 rounded-xl w-full p-2 px-3"
            >
              Zamknij
            </button>
            <span className="text-sm text-gray-600 text-center mt-4">
              (Portfolio znajduje się w sekcji rezerwacji)
            </span>
          </div>
        </div>
      )}
      <button onClick={() => setGoToPortfolio(true)} className="">
        {children}
      </button>
    </>
  );
}
