"use client";

import { convertToDate } from "@/app/utils/convertToDate";
import moment from "moment";
import { useState } from "react";
import BookingDetailsAdmin from "./BookingDetailsAdmin";
import _ from "lodash";
export default function TrustedBookingsAdmin({
  bookings,
  type,
}: {
  bookings: any[];
  type: "trusted" | "untrusted" | "completed";
}) {
  const [openedBooking, setOpenedBooking] = useState<any>();
  // posortować datami
  return (
    <div className="text-black">
      {openedBooking && (
        <BookingDetailsAdmin
          setOpenedBooking={setOpenedBooking}
          booking={openedBooking}
        />
      )}

      {type === "trusted" &&
        bookings?.map((booking: any, i: any) => (
          <div key={i}>
            {moment().isBefore(
              convertToDate({
                ...booking.time,
                day: booking.time.day.day,
                year: booking.time.day.year,
              })
            ) &&
              booking.isReliable &&
              !booking.isCompleted && (
                <div
                  className={`mt-1 p-2 px-3 border-l-4 ${
                    moment()
                      .subtract(2, "days")
                      .isBefore(
                        convertToDate({
                          ...booking.time,
                          day: booking.time.day.day,
                          year: booking.time.day.year,
                        })
                      ) && booking.isReliable
                      ? "border-green-600 bg-green-200"
                      : "border-gray-600 bg-gray-200"
                  }`}
                >
                  <div className="flex flex-row items-center justify-between">
                    {" "}
                    <div className="font-bold flex flex-col justify-between ">
                      <h2 className="h-max">{booking.name}</h2>
                      <div className="font-normal">
                        <span className="mr-1"> {booking.time.hour}</span>{" "}
                        {moment(
                          convertToDate({
                            ...booking.time,
                            day: booking.time.day.day,
                            year: booking.time.day.year,
                          })
                        ).format("MM.DD.YYYY")}
                      </div>
                    </div>{" "}
                    <button
                      className="text-white p-1 px-3 h-full rounded-xl bg-indigo-600"
                      onClick={() => setOpenedBooking(booking)}
                    >
                      Szczegóły
                    </button>
                  </div>
                </div>
              )}
          </div>
        ))}
      <div className="">
        {type === "untrusted" &&
          bookings?.map((booking: any, i: any) => (
            <div key={i}>
              {moment()
                .subtract(2, "days")
                .isBefore(
                  convertToDate({
                    ...booking.time,
                    day: booking.time.day.day,
                    year: booking.time.day.year,
                  })
                ) &&
                !booking.isReliable &&
                !booking.isCompleted && (
                  <div
                    className={`p-2 mt-1 px-3 border-l-4 ${
                      moment().isBefore(
                        convertToDate({
                          ...booking.time,
                          day: booking.time.day.day,
                          year: booking.time.day.year,
                        })
                      ) && booking.isReliable
                        ? "border-green-600 bg-green-200"
                        : "border-red-600 bg-gray-200"
                    }`}
                  >
                    <div className="flex flex-row items-center justify-between">
                      {" "}
                      <div className="font-bold flex flex-col justify-between ">
                        <h2 className="h-max">{booking.name}</h2>
                        <div className="font-normal">
                          <span className="mr-1"> {booking.time.hour}</span>{" "}
                          {moment(
                            convertToDate({
                              ...booking.time,
                              day: booking.time.day.day,
                              year: booking.time.day.year,
                            })
                          ).format("MM.DD.YYYY")}
                        </div>
                      </div>{" "}
                      <button
                        className="text-white p-1 px-3 h-full rounded-xl bg-indigo-600"
                        onClick={() => setOpenedBooking(booking)}
                      >
                        Szczegóły
                      </button>
                    </div>
                  </div>
                )}
            </div>
          ))}
      </div>
      <div className="">
        {type === "completed" &&
          bookings?.map((booking: any, i: any) => (
            <div key={i}>
              {moment()
                .subtract(2, "days")
                .isBefore(
                  convertToDate({
                    ...booking.time,
                    day: booking.time.day.day,
                    year: booking.time.day.year,
                  })
                ) &&
                booking.isReliable &&
                booking.isCompleted && (
                  <div
                    className={`mt-1 p-2 px-3 border-l-4 ${
                      moment().isBefore(
                        convertToDate({
                          ...booking.time,
                          day: booking.time.day.day,
                          year: booking.time.day.year,
                        })
                      ) && booking.isReliable
                        ? "border-green-600 bg-green-200"
                        : "border-gray-600 bg-gray-200"
                    }`}
                  >
                    <div className="flex flex-row items-center justify-between">
                      {" "}
                      <div className="font-bold flex flex-col justify-between ">
                        <h2 className="h-max">{booking.name}</h2>
                        <div className="font-normal">
                          <span className="mr-1"> {booking.time.hour}</span>{" "}
                          {moment(
                            convertToDate({
                              ...booking.time,
                              day: booking.time.day.day,
                              year: booking.time.day.year,
                            })
                          ).format("MM.DD.YYYY")}
                        </div>
                      </div>{" "}
                      <button
                        className="text-white p-1 px-3 h-full rounded-xl bg-indigo-600"
                        onClick={() => setOpenedBooking(booking)}
                      >
                        Szczegóły
                      </button>
                    </div>
                  </div>
                )}
            </div>
          ))}
      </div>
    </div>
  );
}
