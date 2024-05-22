"use client";
import { useState } from "react";
import moment from "moment";
import "moment/locale/pl";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "@/firebase";
import { toast } from "react-toastify";
import { toastUpdate } from "@/components/Toast/Toasts";
export default function PickNewDate({
  setChosenService,
  chosenService,
  bookings,
  setRemove,
  setShouldRefresh,
  shouldRefresh,
}: {
  setChosenService: Function;
  chosenService: any;
  bookings: any[];
  setRemove: Function;
  setShouldRefresh: Function;
  shouldRefresh: number;
}) {
  const [visibleMonths, setVisibleMonths] = useState(2);
  const [isChosen, setIsChosen] = useState(false);

  moment.locale("pl");
  const startDate = moment().add(2, "days");
  const weeks = [];
  let currentDate = startDate.clone();

  while (weeks.length < visibleMonths) {
    const days = [];
    const monthName = currentDate.format("MMMM");
    const currentMonth = currentDate.month();
    const daysInMonth = currentDate.daysInMonth();
    for (let day = 0; day < 31; day++) {
      if (currentDate.month() === currentMonth) {
        if (
          !currentDate.format("DD dddd").includes("niedziela") &&
          !currentDate.format("DD dddd").includes("sobota")
        ) {
          days.push({
            day: currentDate.format("DD dddd"),
            year: currentDate.year(), // Include the year in the days array
          });
        }
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
  function changeDate() {
    const docRef = doc(db, "bookings", chosenService.id);
    updateDoc(docRef, {
      ...chosenService,
      isCompleted: false,
    }).then(() => {
      setRemove(false);
      setIsChosen(false);
      setChosenService(null);
    });
    toast.success(<>Termin zmieniony pomyślnie</>);
    setShouldRefresh(shouldRefresh + 1);
  }
  return (
    <div className="px-4 sm:px-6  max-h-[80vh] overflow-y-scroll scrollbar-rounded">
      {weeks.map((weekData, idx) => (
        <div key={idx}>
          {weekData.days.length > 0 && (
            <p className={`my-2 text-xl font-bold ${idx === 0 && "!mt-0"}`}>
              {capitalizeFirstLetter(weekData.monthName)}
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-1">
            {weekData.days.map((day, dayIndex) => (
              <>
                {!day.day.includes("niedziela") &&
                  !day.day.includes("sobota") && (
                    <div key={dayIndex} className="flex flex-col relative">
                      <button
                        onClick={() => {
                          setChosenService({
                            ...chosenService,
                            time: {
                              ...chosenService.time,
                              day: {
                                ...chosenService.time.day,
                                day: day.day,
                                year: day.year,
                              },
                              month: weekData.monthName,
                            },
                          });
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
                      {chosenService.time.day.day === day.day &&
                        chosenService.time.month === weekData.monthName &&
                        chosenService.time.day.year === day.year && (
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
                                      booking.time.day.year === day.year &&
                                      booking.time.month === weekData.monthName
                                  )}
                                  key={idx}
                                  onClick={() => {
                                    setChosenService({
                                      ...chosenService,
                                      time: {
                                        ...chosenService.time,
                                        hour: item,
                                      },
                                    });
                                    setIsChosen(true);
                                  }}
                                  className={`bg-indigo-600 disabled:border-2 disabled:border-red-500 disabled:text-red-500 disabled:bg-white hover:bg-indigo-500 duration-500 p-1 px-2 rounded-xl border-2 ${
                                    chosenService.time.hour === item
                                      ? "border-indigo-800 bg-indigo-400 text-green-400"
                                      : "border-transparent"
                                  }`}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                            {isChosen && (
                              <button
                                onClick={() => changeDate()}
                                className="bg-green-600 text-white font-bold text-xl rounded-xl py-2 w-full mt-2"
                              >
                                Zmień termin
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
}
