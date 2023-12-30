"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaCalendarCheck,
  FaCog,
  FaPhone,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";

export default function HowItWorks() {
  const [currentHover, setCurrentHover] = useState<any>(1);
  return (
    <div className="font-sans h-max py-12 w-screen lg:min-h-[60vh] px-3 md:px-8  xl:px-32 ">
      <h2 className=" text-zinc-800 font-bold text-2xl text-center px-6 sm:text-4xl">
        Jak działają rezerwacje sesji manicure na stronie?
      </h2>
      <div className="flex flex-row lg:grid grid-cols-2 mt-12 h-full">
        <div className="flex flex-col lg:p-3 lg:bg-gray-300 rounded-xl relative">
          {howItWorks.map((item: any, i: number) => (
            <div
              className={`${
                currentHover === i
                  ? "z-[300] -translate-y-0 duration-300 opacity-100 h-max"
                  : "z-[-300] -translate-y-12 opacity-0 h-0"
              }`}
              key={i}
            >
              {" "}
              <Link
                href={item.url}
                className="text-2xl bg-indigo-600 p-2 px-3 w-full flex items-center justify-center lg:block lg:text-left lg:w-max text-white lg:rounded-xl"
              >
                <strong className="flex flex-row items-center text-center">
                  <item.icon className="mr-2 hidden lg:block" /> {item.title}
                </strong>
              </Link>
              <p className="text-sm sm:text-base lg:text-lg my-3">
                {item.description}
              </p>
              <div className="lg:w-full h-auto flex items-center bg-opacity-60 rounded-xl">
                <Image
                  src={item.image}
                  width={1024}
                  height={1024}
                  alt="Paznokcie Hybrydowe Grudziądz"
                  className="rounded-xl w-full min-h-[300px] lg:w-auto"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:space-y-3 pl-3 lg:px-6 lg:mt-0">
          {howItWorks.map((item: any, i: number) => (
            <button
              key={i}
              onMouseEnter={() => setCurrentHover(i)}
              className={`${
                currentHover === i
                  ? "opacity-100 scale-105 lg:translate-x-[21PX]"
                  : "opacity-60 scale-100"
              } duration-200 p-5 lg:p-3 aspect-square lg:aspect-auto lg:rounded-xl justify-center bg-indigo-600 text-2xl text-white drop-shadow-xl shadow-black flex flex-row items-center lg:justify-between`}
            >
              <strong className=" flex flex-row items-center">
                <item.icon className="lg:mr-2" />{" "}
                <span className="hidden lg:block">{item.title}</span>
              </strong>
              <span className="text-white italic text-4xl hidden lg:block">
                {i + 1}.
              </span>{" "}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
const howItWorks = [
  {
    title: "Wybierz termin",
    description:
      "Korzystając z narzędzia dostępnego na stronie, wybierz dzień i godzinę, w którym chcesz zarezerwaować sesję manicure.",
    image: "/images/page/bookingView.png",
    url: "/rezerwacje",
    icon: FaCalendarCheck,
  },
  {
    title: "Wpisz numer telefonu",
    description:
      "Po wybraniu terminu, podaj swój numer telefonu, który będzie połączony z Twoim kontem.",
    image: "/images/page/bookingInput.png",
    url: "/rezerwacje",
    icon: FaPhone,
  },
  {
    title: "Utwórz konto",
    description:
      "Zarejestruj się, wypełniając formularz prawdziwymi danymi, aby w przyszłości zarządzać swoimi rezerwacjami.",
    image: "/images/page/bookingRegister.png",
    url: "/register",
    icon: FaUser,
  },
  {
    title: "Zarządzaj rezerwacjami",
    description:
      "Po zalogowaniu się na swoje konto, odwołuj i zmieniaj terminy jednym kliknięciem!",
    image: "/images/page/userBookings.png",
    url: "/register",
    icon: FaCalendarCheck,
  },
  {
    title: "Zapraszaj znajomych",
    description:
      "Zapraszaj swoich znajomych i zdobywaj kody promocyjne na następne sesje.",
    image: "/images/page/userInvites.png",
    url: "/register",
    icon: FaUserFriends,
  },
];
