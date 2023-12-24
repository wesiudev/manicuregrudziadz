import { convertToDate } from "@/app/utils/convertToDate";
import moment from "moment";
import Link from "next/link";

export default function BookingsMap({
  bookings,
  loading,
  bookingView,
  setOpenedBooking,
}: {
  bookings: any;
  loading: boolean;
  bookingView: string;
  setOpenedBooking: Function;
}) {
  return (
    <ul
      className={`flex flex-col w-full space-y-1 px-3 pb-3 ${
        loading ? "items-center justify-center text-center" : ""
      }`}
    >
      {loading && <span>Wczytywanie rezerwacji...</span>}
      {bookingView === "accepted" &&
        bookings?.map((booking: any, i: any) => (
          <div key={i}>
            {moment().isBefore(
              convertToDate({
                ...booking.time,
                day: booking.time.day.day,
                year: booking.time.day.year,
              })
            ) &&
              booking.isReliable && (
                <li
                  className={`p-2 px-3 border-l-4 ${i === 0 && "mt-3"} ${
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
                </li>
              )}
          </div>
        ))}
      {bookingView === "awaiting" && (
        <>
          {bookings?.filter(
            (booking: any) =>
              moment().isBefore(
                convertToDate({
                  ...booking.time,
                  day: booking.time.day.day,
                  year: booking.time.day.year,
                })
              ) && !booking.isReliable
          )?.length > 0 ? (
            <h2 className="my-6 px-3 text-center">
              Nasz system wykrył nieprawidłowości w Twoich działaniach. Twoje
              rezerwacje zostaną zweryfikowane.
            </h2>
          ) : (
            <>
              {bookings.length > 0 && (
                <h2 className="px-3 text-center mt-3">
                  Nasz system nie wykrył nieprawidłowości w Twoich działaniach.
                </h2>
              )}
            </>
          )}

          {bookings?.map((booking: any, i: any) => (
            <div key={i}>
              {moment().isBefore(
                convertToDate({
                  ...booking.time,
                  day: booking.time.day.day,
                  year: booking.time.day.year,
                })
              ) &&
                !booking.isReliable && (
                  <li
                    className={`p-2 px-3 border-l-4 ${
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
                    <div className="flex flex-row items-start justify-between w-full">
                      {" "}
                      <div className="font-bold flex flex-col">
                        {booking.name}
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
                      <div className="flex flex-col items-end">
                        <span className="font-bold">
                          {booking.price || "150.00 zł"}
                        </span>
                        <span>Szczegóły</span>
                      </div>
                    </div>
                  </li>
                )}
            </div>
          ))}
        </>
      )}

      {!bookings?.length && !loading && (
        <div className="flex flex-col text-center justify-center items-center py-12">
          Jeszcze nie posiadasz żadnych rezerwacji
          <Link
            href="/rezerwacje"
            className="bg-indigo-600 hover:bg-indigo-800 p-2 px-3 rounded-xl font-bold text-xl text-white mt-4"
          >
            Zarezerwuj
          </Link>
        </div>
      )}
    </ul>
  );
}
