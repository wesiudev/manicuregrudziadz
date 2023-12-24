"use client";
import "moment/locale/pl";
import { auth, getBookingsByUserId, getDocument } from "@/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import { convertToDate } from "@/app/utils/convertToDate";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";
import { cutSentence } from "@/app/utils/cutSentence";
import { copyToClipboard } from "@/app/utils/copyToClipboard";
import BookingsButtons from "../components/bookings/BookingsButtons";
import BookingsMap from "../components/bookings/BookingsMap";
import UserInvitations from "../components/UserInvitations";
import UserInfo from "../components/UserInfo";
import BookingDetails from "../components/bookings/BookingDetails";

export default function Dashboard({
  users,
  bookings,
}: {
  users: any[];
  bookings: any[];
}) {
  moment.locale("pl");
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<any>();
  const [bookingView, setBookingView] = useState("accepted");
  const [copied, setCopied] = useState(false);
  const [openedBooking, setOpenedBooking] = useState<any>();
  useEffect(() => {
    if (user) {
      const getUserData = async (uid: string) => {
        const loggedUser = await getDocument("users", user?.uid);
        const relatedUsers = users?.filter(
          (item: any, i: number) =>
            item.referer === user?.uid && !item.isCollected
        );
        const bookings = await getBookingsByUserId(uid);
        return { loggedUser, relatedUsers, bookings };
      };
      getUserData(user?.uid).then((res) => setUserData(res));
    }
  }, [loading, user, openedBooking]);
  if (!user && !loading) {
    redirect("/rezerwacje");
  }
  return (
    <div className="bg-gray-300 w-screen min-h-screen px-6 md:px-8 xl:px-32 font-sans py-12">
      {openedBooking && (
        <BookingDetails
          setOpenedBooking={setOpenedBooking}
          booking={openedBooking}
          bookings={bookings}
        />
      )}
      <UserInfo loggedUser={userData?.loggedUser} />
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 ">
        <div className="bg-white rounded-xl shadow-sm shadow-black ">
          <h2 className="text-2xl xl:text-3xl font-bold text-center bg-black text-white rounded-t-xl p-3">
            Rezerwacje
          </h2>
          <BookingsButtons
            setBookingView={setBookingView}
            bookingView={bookingView}
            bookings={userData?.bookings}
          />
          <BookingsMap
            bookings={userData?.bookings}
            setOpenedBooking={setOpenedBooking}
            loading={loading}
            bookingView={bookingView}
          />
        </div>
        <div className="bg-white rounded-xl h-max shadow-sm shadow-black">
          <h2 className="text-2xl xl:text-3xl font-bold  rounded-t-xl p-3 text-center bg-black text-white">
            Zaproszenia
          </h2>
          <UserInvitations
            relatedUsers={userData?.relatedUsers}
            loading={loading}
          />
          <div className="w-full p-3 py-6 bg-gray-300 rounded-b-xl text-zinc-700 text-center flex items-center justify-center relative">
            {!loading && (
              <>
                <div className="text-sm sm:text-lg absolute rounded-b-xl left-0 top-0 w-full h-full flex items-center justify-center group hover:bg-black duration-300 hover:bg-opacity-40">
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `https://www.manicuregrudziadz.pl/register?ref=${user?.uid}`,
                        setCopied
                      )
                    }
                    className={`${
                      copied
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-indigo-500 hover:bg-indigo-700 "
                    } duration-150 p-2 px-4 opacity-0 group-hover:opacity-100 font-bold text-white rounded-xl`}
                  >
                    {!copied ? "Skopiuj Link" : "Skopiowano pomyślnie!"}
                  </button>
                </div>
                <span className="text-sm sm:text-lg">
                  {cutSentence(`?ref=${user?.uid}`)}
                </span>
              </>
            )}
            {loading && "Wczytywanie danych..."}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm shadow-black pb-3 h-max">
          <h2 className="text-2xl xl:text-3xl font-bold mb-3 text-center bg-black text-white rounded-t-xl p-3">
            Kody promocyjne
          </h2>
          <div className="text-center flex h-full py-12 items-center justify-center px-4 sm:px-12">
            Tu znajdą się Twoje kody promocyjne za zapraszanie znajomych i
            skompletowane rezerwacje.
          </div>
        </div>
      </div>
    </div>
  );
}
