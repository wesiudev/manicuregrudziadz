"use client";

import { convertToDate } from "@/app/utils/convertToDate";
import { toastUpdate } from "@/components/Toast/Toasts";
import { db, removeDocument, updateDocument } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { toast } from "react-toastify";
export default function BookingDetailsAdmin({
  booking,
  setOpenedBooking,
}: {
  booking: any;
  setOpenedBooking: Function;
}) {
  const [startRemove, setStartRemove] = useState(false);
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
            <div className="flex flex-col">
              <span className="text-[14px] sm:text-base text-white p-1 rounded-xl px-3 bg-black w-max">
                Numer telefonu
              </span>
              <Link
                href={`tel:${booking.phoneNumber}`}
                className="bg-green-500 text-white pt-1 text-xl sm:text-2xl  font-bold rounded-xl justify-start px-3 py-2 mt-1 flex flex-row items-center"
              >
                <FaPhone className="mr-2" />
                {booking.phoneNumber}
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full items-center justify-center flex">
          {!startRemove && (
            <button
              onClick={() => setStartRemove(true)}
              className="rounded-t-xl h-6 w-max px-3 bg-red-500 hover:bg-red-600 duration-300 text-white text-sm"
            >
              Usuń (spam)
            </button>
          )}
          {startRemove && (
            <div className="flex flex-col items-center justify-center w-full">
              <h2>Czy chcesz usunąć?</h2>
              <div className="flex flex-row items-center justify-center w-full">
                <button
                  onClick={() => {
                    const id = toast.loading(<span>Usuwam...</span>);
                    removeDocument("bookings", booking.id).then(
                      () => toastUpdate("Usunięto pomyślnie", id, "success"),
                      setOpenedBooking(null)
                    );
                  }}
                  className="rounded-tl-xl h-8 w-max px-3 bg-red-500 hover:bg-red-600 duration-300 text-white text-xl"
                >
                  Usuń!
                </button>
                <button
                  onClick={() => setStartRemove(false)}
                  className="rounded-tr-xl h-8 w-max px-3 bg-green-500 hover:bg-green-600 duration-300 text-white text-xl"
                >
                  Nie
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            const id = toast.loading(<span>Zatwierdzam...</span>);
            updateDocument(["isCollectable"], [true], "users", booking.uid);
            updateDocument(
              !booking.isReliable
                ? ["isCompleted", "isReliable"]
                : ["isCompleted"],
              !booking.isReliable ? [true, true] : [true],
              "bookings",
              booking.id
            ).then(() => {
              toastUpdate("Pomyślnie zatwierdzono rezerwacje", id, "success"),
                setOpenedBooking(null);
            });
          }}
          className="rounded-b-xl h-12 w-full bg-green-500 hover:bg-green-600 duration-300 text-white text-xl"
        >
          Zatwierdź
        </button>
      </div>
    </div>
  );
}
