"use client";
import MonthView from "@/app/rezerwacje/MonthView";
import { convertToDate } from "@/app/utils/convertToDate";
import { removeDocument } from "@/firebase";
import moment from "moment";
import { useState } from "react";
import PickNewDate from "./PickNewDate";
import { FaCog } from "react-icons/fa";
import { toast } from "react-toastify";
import { toastUpdate } from "@/components/Toast/Toasts";

export default function BookingDetails({
  booking,
  setOpenedBooking,
  bookings,
}: {
  booking: any;
  setOpenedBooking: Function;
  bookings: any[];
}) {
  const [remove, setRemove] = useState(false);
  const [changeDate, setChangeDate] = useState(false);
  return (
    <div
      onClick={() => setOpenedBooking(null)}
      className="h-screen w-screen flex items-center justify-center bg-black bg-opacity-75 fixed left-0 top-0 z-[2000]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-xl bg-white w-[90vw] sm:w-max"
      >
        <h2 className="text-white font-bold bg-black rounded-t-xl text-xl sm:text-2xl w-full text-center py-3 px-3">
          Szczegóły rezerwacji
        </h2>
        {!remove && (
          <div className="bg-white p-4 lg:p-6">
            <div className="grid grid-cols-2 gap-1 gap-y-3 sm:gap-3">
              <div className="flex flex-col">
                <span className="text-[14px] sm:text-base text-white p-1 rounded-xl px-3 bg-black w-max">
                  Usługa
                </span>
                <span className="pt-1 text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-800">
                  {booking?.name}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[14px] sm:text-base text-white p-1 rounded-xl px-3 bg-black w-max">
                  Data
                </span>
                <span className="pt-1 text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-800">
                  {moment(
                    convertToDate({
                      ...booking.time,
                      day: booking.time.day.day,
                      year: booking.time.day.year,
                    })
                  ).format("MM.DD.YYYY")}{" "}
                  {booking.time.hour}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] sm:text-base text-white p-1 rounded-xl px-3 bg-black w-max">
                  Cena
                </span>
                <span className="pt-1 text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-800">
                  {booking.price}
                </span>
              </div>
            </div>
          </div>
        )}
        {remove && !changeDate && (
          <>
            <h2 className="font-bold text-2xl px-4 sm:px-6 pt-3 text-center">
              Co chcesz zrobić?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-y-3 sm:gap-y-0 sm:gap-x-3 sm:px-6">
              <button
                onClick={() => {
                  setChangeDate(true);
                }}
                className="bg-green-500 hover:bg-green-700 duration-150 text-white font-light text-2xl w-full rounded-xl py-1 sm:py-2 px-3"
              >
                Zmień termin
              </button>
              <button
                onClick={() => {
                  const id = toast.loading(<span>Zmieniam termin...</span>);
                  removeDocument("bookings", booking?.id).then(
                    () => setRemove(false),
                    setOpenedBooking(null)
                  );
                  toastUpdate("Termin usunięty pomyślnie.", id, "success");
                }}
                className="bg-red-500 hover:bg-red-700 duration-300 text-white font-light text-2xl w-full rounded-xl py-1 sm:py-2 px-3"
              >
                Odwołaj
              </button>
            </div>
          </>
        )}
        {remove && changeDate && (
          <>
            <h2 className="font-bold text-2xl px-4 sm:px-6 py-3 text-center">
              Wybierz nowy termin
            </h2>
            <PickNewDate
              setChosenService={setOpenedBooking}
              chosenService={booking}
              bookings={bookings}
              setRemove={setRemove}
            />
          </>
        )}
        {!remove && (
          <button
            onClick={() => {
              setRemove(true);
            }}
            className="flex flex-row items-center justify-center bg-gray-600 hover:bg-gray-700 duration-300 text-white font-light text-2xl w-full rounded-b-xl py-1 sm:py-2"
          >
            <FaCog className="mr-1 w-5 h-5" /> Ustawienia
          </button>
        )}
      </div>
    </div>
  );
}
