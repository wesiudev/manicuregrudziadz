import { convertToDate } from "@/app/utils/convertToDate";
import moment from "moment";

export default function BookingsButtons({
  bookingView,
  setBookingView,
  bookings,
}: {
  bookingView: string;
  setBookingView: Function;
  bookings: any[];
}) {
  return (
    <div className="grid grid-cols-2">
      <button
        onClick={() => setBookingView("accepted")}
        className={`${
          bookingView === "accepted"
            ? "bg-indigo-600 scale-100"
            : "bg-indigo-400 scale-100"
        } duration-150 hover:bg-indigo-600 text-sm sm:text-base 2xl:text-lg border-r border-indigo-800 p-3 font-bold text-white`}
      >
        Zaakceptowane (
        {
          bookings?.filter(
            (booking: any) =>
              moment().isBefore(
                convertToDate({
                  ...booking.time,
                  day: booking.time.day.day,
                  year: booking.time.day.year,
                })
              ) && booking.isReliable
          )?.length
        }
        )
      </button>
      <button
        onClick={() => setBookingView("awaiting")}
        className={`${
          bookingView === "awaiting"
            ? "bg-indigo-600 scale-100"
            : "bg-indigo-400 scale-100"
        } duration-150 hover:bg-indigo-600 text-sm sm:text-base 2xl:text-lg border-l border-indigo-800 p-3 font-bold text-white`}
      >
        Oczekujące (
        {
          bookings?.filter(
            (booking: any) =>
              moment().isBefore(
                convertToDate({
                  ...booking.time,
                  day: booking.time.day.day,
                  year: booking.time.day.year,
                })
              ) && !booking.isReliable
          )?.length
        }
        )
      </button>
    </div>
  );
}
