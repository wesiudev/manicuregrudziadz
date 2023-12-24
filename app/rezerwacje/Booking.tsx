"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { IService } from "@/components/ServicesGrid";
import Image from "next/image";
import { cutSentence } from "@/app/utils/cutSentence";
import Link from "next/link";
import { generateRandomDescription } from "@/app/utils/generateRandomDescription";
import MonthView from "./MonthView";
import BookBtn from "@/components/BookBtn";
import { polishToEnglish } from "@/app/utils/polishToEnglish";
import { addDocument, auth } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { checkReliability } from "@/app/utils/checkReliability";
import { FaClock, FaCoins } from "react-icons/fa";
export default function Booking({
  services,
  bookings,
}: {
  services?: IService[];
  bookings?: any;
}) {
  const initialState = {
    name: "",
    time: { month: "", day: "", hour: "" },
  };
  const [user, loading] = useAuthState(auth);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [chosenService, setChosenService] = useState(initialState);
  const [visibleMonths, setVisibleMonths] = useState(2);
  const nodeRef = useRef<any>();
  function setDate(day: any, month: any) {
    setChosenService({
      ...chosenService,
      time: {
        month: month,
        day: day,
        hour: "",
      },
    });
  }
  function setHour(arg: string) {
    setChosenService({
      ...chosenService,
      time: {
        month: chosenService.time.month,
        day: chosenService.time.day,
        hour: arg,
      },
    });
  }
  async function createBooking(isReliable: boolean, uniqueId: string) {
    addDocument("bookings", uniqueId, {
      ...chosenService,
      isCompleted: false,
      isReliable: isReliable,
      phoneNumber: phoneNumber,
      id: uniqueId,
      uid: user?.uid,
      time: { ...chosenService.time },
      price: "150.00 zł",
    });
  }
  const router = useRouter();
  const finalizeOrder = async (phoneNumber: string) => {
    const uniqueId = uuidv4();
    if (user) {
      await checkReliability(user?.uid, bookings)
        .then((isReliable) => createBooking(isReliable, uniqueId))
        .then(() =>
          router.push(
            `/rezerwacje/finalizacja?phoneNumber=${phoneNumber}&bookingId=${uniqueId}`
          )
        );
    } else {
      await addDocument("bookings", uniqueId, {
        ...chosenService,
        isCompleted: false,
        isReliable: false,
        phoneNumber: phoneNumber,
        id: uniqueId,
        time: { ...chosenService.time },
        price: "150.00 zł",
      }).then(() =>
        router.push(
          `/rezerwacje/finalizacja?phoneNumber=${phoneNumber}&bookingId=${uniqueId}`
        )
      );
    }
  };
  const [openedDescriptions, setOpenedDescriptions] = useState<number[]>([]);

  return (
    <div className="relative">
      {chosenService.name && (
        <div className="bg-black bg-opacity-75 fixed top-0 left-0 w-screen h-screen z-[50]" />
      )}
      <h2 className="text-zinc-800 font-bold drop-shadow-lg shadow-black py-3 text-2xl sm:text-4xl mt-6 rounded-lg">
        Usługi Manicure
      </h2>
      <div className="w-1 h-1" ref={nodeRef}></div>

      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex flex-col items-start space-y-4 lg:w-[55vw]">
          {services?.map((service: any, idx: number) => (
            <div
              key={idx}
              className={`w-full flex flex-col rounded-xl bg-gray-300 relative ${
                chosenService.name === service.serviceName
                  ? "border-green-500 scale-105 duration-500 !z-[1000]"
                  : ""
              }`}
            >
              <div
                id={`${polishToEnglish(service.serviceName)}`}
                className="absolute left-0 -top-[100px]"
              />
              <div className="w-full sm:p-3 flex flex-row justify-between text-xl text-zinc-800 drop-shadow-lg shadow-black">
                <div className="flex flex-row items-start justify-between w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between w-full px-3 sm:px-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                        <Link
                          href={service.url}
                          className="text-2xl font-bold sm:font-normal sm:text-2xl lg:text-3xl mt-3 sm:mt-0"
                        >
                          {service.serviceName}
                        </Link>
                        <div className="hidden sm:flex flex-row items-start">
                          <span className="text-sm sm:text-base p-1 rounded-xl font-normal flex flex-row items-center bg-gray-400 text-white px-2 sm:px-3">
                            <FaCoins className="mr-1.5 " /> 150zł
                          </span>

                          <span className="ml-2 text-sm sm:text-base font-normal flex flex-row items-center p-1 rounded-xl bg-gray-400 text-white w-max px-2 sm:px-3">
                            <FaClock className="mr-1.5 " />
                            {service.duration}
                          </span>
                        </div>
                      </div>
                      <div className="sm:block hidden ml-2">
                        <BookBtn
                          setChosenService={setChosenService}
                          service={service}
                          scrollTo={idx}
                          chosenService={chosenService}
                          isMobile={false}
                        />
                      </div>
                    </div>

                    <p className="block sm:hidden font-normal text-sm px-3 mt-2">
                      {openedDescriptions?.some((item) => item === idx) && (
                        <>
                          {service.serviceDescReservations}{" "}
                          {service.serviceDescReservationsInfo}
                        </>
                      )}

                      {!openedDescriptions?.some((item) => item === idx) &&
                        cutSentence(service.serviceDescReservations)}
                      <br className="hidden sm:block ml-1" />
                      {openedDescriptions?.some((item) => item === idx) && (
                        <button
                          className="text-blue-600"
                          onClick={() =>
                            setOpenedDescriptions((a) => [
                              ...a.filter((item) => item !== idx),
                            ])
                          }
                        >
                          ukryj
                        </button>
                      )}
                      {!openedDescriptions?.some((item) => item === idx) && (
                        <button
                          className="text-blue-600"
                          onClick={() =>
                            setOpenedDescriptions((a) => [...a, idx])
                          }
                        >
                          rozwiń
                        </button>
                      )}
                    </p>
                    <p className="hidden sm:block font-normal text-sm px-3 sm:px-0 mt-2">
                      <>
                        {service.serviceDescReservations}{" "}
                        {service.serviceDescReservationsInfo}
                      </>
                    </p>
                    <div className="sm:hidden flex flex-row items-start my-2 px-3">
                      <span className="text-sm sm:text-base p-1 rounded-xl font-normal flex flex-row items-center bg-gray-400 text-white px-1.5 sm:px-3">
                        <FaCoins className="mr-1.5 " /> 150zł
                      </span>

                      <span className="ml-2 text-sm sm:text-base font-normal flex flex-row items-center p-1 rounded-xl bg-gray-400 text-white w-max px-1.5 sm:px-3">
                        <FaClock className="mr-1.5 " />
                        {service.duration}
                      </span>
                    </div>
                    <div className={`block sm:hidden mt-2`}>
                      <BookBtn
                        setChosenService={setChosenService}
                        service={service}
                        scrollTo={idx}
                        chosenService={chosenService}
                        isMobile={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {chosenService.name === service.serviceName && (
                <div
                  className={`rounded-b-xl w-full h-max left-0 top-0 flex items-center duration-1000 justify-center`}
                >
                  <div className={`bg-white w-full rounded-b-xl relative p-3`}>
                    <h2 className="text-zinc-800 font-bold drop-shadow-lg shadow-black py-3 text-2xl mb-3 rounded-lg">
                      Wybierz termin
                    </h2>
                    <MonthView
                      setChosenService={setDate}
                      chosenService={chosenService}
                      setHour={setHour}
                      hour={chosenService.time.hour}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      finalizeOrder={finalizeOrder}
                      bookings={bookings}
                      visibleMonths={visibleMonths}
                      setVisibleMonths={setVisibleMonths}
                    />
                    <button
                      onClick={() => setChosenService(initialState)}
                      className=" bg-black hover:bg-opacity-80 text-white p-2 px-3 mt-3 w-full"
                    >
                      Wyjście
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="lg:w-[45vw] lg:ml-6 mt-4 lg:mt-0 lg:pr-5">
          <div className="drop-shadow-lg shadow-black p-3 bg-zinc-700 bg-opacity-90 rounded-xl text-white">
            <h1 className="font-bold text-xl sm:text-2xl">
              Salon Manicure Piękniej
            </h1>
            <p className="text-sm sm:text-lg mt-2 ">
              Oferuję szeroką gamę profesjonalnych usług manicure, dostępnych w
              moim prywatnym salonie piękności. Jako kosmetyczka stawiam na
              indywidualne podejście, starając się dostarczyć niezapomniane
              doświadczenie pielęgnacyjne.
            </p>
            <p className="mt-4 text-lg">
              Aby zarezerwować usługę, naciśnij przycisk <strong>Umów</strong>{" "}
              lub telefonicznie <br />
              <Link className="text-blue-500" href="tel:+48664205952">
                +48 664 205 952
              </Link>
            </p>
          </div>
          <div className="relative h-[40vh] overflow-hidden rounded-xl grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-2 lg:gap-1 mt-4">
            <>
              <div className="absolute left-0 top-0 rounded-xl bg-black hover:bg-opacity-90 duration-200 bg-opacity-70 w-full h-full flex items-center justify-center">
                <Link
                  href="/rezerwacje/portfolio"
                  className="bg-indigo-600 hover:bg-indigo-800 p-2 px-3 rounded-xl text-white text-2xl font-light"
                >
                  Zobacz portfolio
                </Link>
              </div>
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
              ].map((item: any, i: any) => (
                <Image
                  src={`/images/portfolio/img${item}.jpg`}
                  width={72}
                  height={72}
                  className="rounded-xl aspect-square w-full h-full"
                  alt={generateRandomDescription()}
                  key={i}
                />
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
