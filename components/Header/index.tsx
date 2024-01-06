"use client";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
export const Header = () => {
  const [user, loading] = useAuthState(auth);
  const pathname = usePathname();

  return (
    <div className={`${pathname.includes("admin") && "hidden"} w-full`}>
      <div className="h-[75px] flex flex-row w-full justify-between mx-auto items-center bg-zinc-800 fixed top-0 left-0 z-[999] px-3 md:px-8  xl:px-32 drop-shadow-md shadow-zinc-400">
        <Link
          href="/"
          className="flex flex-col h-max text-3xl sm:text-4xl relative"
        >
          <div className="text-white !font-pars">Piękniej</div>
        </Link>

        <div className="flex flex-row space-x-6">
          <Link
            href="/blog"
            className="text-white p-1 rounded-xl text-lg sm:text-2xl font-sans hover:bg-zinc-700 duration-100"
          >
            Blog
          </Link>
          <Link
            href="/rezerwacje"
            className="text-white p-1 rounded-xl text-lg sm:text-2xl font-sans hover:bg-zinc-700 duration-100"
          >
            Zarezerwuj
          </Link>
          {user && pathname !== "/dashboard" && (
            <Link
              href="/dashboard"
              className="text-white p-1 flex flex-row items-center rounded-xl font-bold text-lg sm:text-2xl font-sans hover:bg-zinc-700 duration-100"
            >
              <FaUser className="mr-2" /> Moje konto
            </Link>
          )}
          {!user && (
            <Link
              href="/login"
              className="text-white p-1 flex flex-row items-center rounded-xl font-bold text-lg sm:text-2xl font-sans hover:bg-zinc-700 duration-100"
            >
              <FaUser className="mr-2" /> Zaloguj
            </Link>
          )}
          {pathname === "/dashboard" && user && (
            <button
              onClick={() => signOut(auth)}
              className="text-white p-1 flex flex-row items-center rounded-xl font-bold text-lg sm:text-2xl font-sans hover:bg-zinc-700 duration-100"
            >
              <FaSignOutAlt className="mr-2" />
              Wyloguj
            </button>
          )}
        </div>
        {/* <button
          className={`menu ${opened ? "opened" : ""} lg:hidden`}
          onClick={toggleMenu}
          aria-expanded={opened}
          aria-label="Main Menu"
        >
          <svg width="75" height="75" viewBox="0 0 100 100">
            <path
              className="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path className="line line2" d="M 20,50 H 80" />
            <path
              className="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button> */}
      </div>
      {/* <div
        className={`${
          opened ? "z-[500]" : "z-[-500]"
        } fixed lg:hidden left-0 top-0 h-screen w-screen bg-zinc-700 bg-opacity-90 backdrop-blur-md flex flex-col items-center justify-center lg:flex-row lg:space-x-6 space-y-12 lg:space-y-0`}
      >
        <Link
          href="/blog"
          className="text-white font-bold text-4xl font-sans hover:underline p-2"
        >
          Blog
        </Link>
        <Link
          href="/rezerwacje"
          className="text-white bg-indigo-600 p-2 px-3 rounded-xl font-bold text-4xl font-sans hover:bg-indigo-500 duration-100"
        >
          Rezerwacje
        </Link>
      </div> */}
    </div>
  );
};
