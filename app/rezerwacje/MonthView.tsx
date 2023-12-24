"use client";
import React from "react";
import moment from "moment";
import "moment/locale/pl";

const MonthView = ({
  setChosenService,
  chosenService,
  setHour,
  hour,
  phoneNumber,
  setPhoneNumber,
  finalizeOrder,
  bookings,
  visibleMonths,
  setVisibleMonths,
}: {
  setChosenService: Function;
  chosenService: any;
  setHour: Function;
  hour: string;
  phoneNumber: string;
  setPhoneNumber: Function;
  finalizeOrder: Function;
  visibleMonths: number;
  bookings: any[];
  setVisibleMonths: Function;
}) => {
  moment.locale("pl");
  const startDate = moment().add(2, "days").year(2023); // Set an explicit year
  const weeks = [];
  let currentDate = startDate.clone();

  while (weeks.length < visibleMonths) {
    const days = [];
    const monthName = currentDate.format("MMMM");
    const currentMonth = currentDate.month();
    const daysInMonth = currentDate.daysInMonth();

    for (let day = 0; day < 31; day++) {
      if (currentDate.month() === currentMonth) {
        days.push({
          day: currentDate.format("DD dddd"),
          year: currentDate.year(), // Include the year in the days array
        });
      } else {
        break;
      }

      currentDate.add(1, "day");

      if (currentDate.date() > daysInMonth) {
        break;
      }
    }

    weeks.push({ monthName, days });
  }

  const capitalizeFirstLetter = (inputString: string) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  };
  const availableHours = [
    "9:00",
    "10:30",
    "11:30",
    "12:30",
    "13:30",
    "14:30",
    "15:30",
    "16:30",
    "17:30",
  ];
  return (
    <div>
      {weeks.map((weekData, idx) => (
        <div key={idx}>
          <p className={`my-2 text-xl font-bold ${idx === 0 && "!mt-0"}`}>
            {capitalizeFirstLetter(weekData.monthName)}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-1">
            {weekData.days.map((day, dayIndex) => (
              <>
                {!day.day.includes("niedziela") &&
                  !day.day.includes("sobota") && (
                    <div key={dayIndex} className="flex flex-col relative">
                      <button
                        onClick={() => {
                          setChosenService(day, weekData.monthName);
                        }}
                        className={`${
                          (
                            chosenService.time.month +
                            chosenService.time.day.day
                          ).toString() ===
                          (weekData.monthName + day.day).toString()
                            ? "border-indigo-800 bg-indigo-400 border-2 text-green-400"
                            : "border-2 border-transparent"
                        } p-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 duration-100 text-white text-sm sm:text-base`}
                      >
                        {day.day}
                      </button>
                      {chosenService.time.day.day === day.day && (
                        <div className="my-1 bg-gray-200 rounded-xl">
                          <h2 className="my-1 mx-auto text-sm sm:text-lg xl:text-base 2xl:text-lg text-zinc-800 drop-shadow-xl shadow-black font-bold w-max">
                            Dostępne godziny
                          </h2>
                          <div className="text-white grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 text-center gap-1 mt-1 mb-1">
                            {availableHours.map((item: any, idx: any) => (
                              <button
                                disabled={bookings?.some(
                                  (booking) =>
                                    booking.isReliable === true &&
                                    booking.time.day.day === day.day &&
                                    booking.time.hour === item &&
                                    booking.time.day.year === moment().year() &&
                                    booking.time.month === weekData.monthName
                                )}
                                key={idx}
                                onClick={() => {
                                  setHour(item);
                                }}
                                className={`bg-indigo-600 disabled:border-2 disabled:border-red-500 disabled:text-red-500 disabled:bg-white hover:bg-indigo-500 duration-500 p-1 px-2 rounded-xl border-2 ${
                                  hour === item
                                    ? "border-indigo-800 bg-indigo-400 text-green-400"
                                    : "border-transparent"
                                }`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                          {chosenService.time.hour && (
                            <input
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="bg-indigo-500 font-bold text-xl p-2 rounded-xl text-white mt-1 w-full"
                              placeholder="Numer tel."
                              type="text"
                            />
                          )}
                          {phoneNumber.length >= 9 && (
                            <button
                              onClick={() => finalizeOrder(phoneNumber)}
                              className="bg-green-600 text-white font-bold text-xl rounded-xl py-2 w-full mt-2"
                            >
                              Zarezerwuj
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
              </>
            ))}
          </div>
        </div>
      ))}
      <div className="w-full flex items-center justify-center">
        <button
          onClick={() => setVisibleMonths(visibleMonths + 2)}
          className="my-6 p-2 px-3 rounded-xl bg-green-600 hover:bg-green-800 text-white font-bold text-2xl mx-auto w-max"
        >
          Wczytaj więcej
        </button>
      </div>
    </div>
  );
};

export default MonthView;
