"use client";
import { toastUpdate } from "@/components/Toast/Toasts";
import TrustedBookingsAdmin from "../components/TrustedBookingsAdmin";
import { app } from "@/firebase";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
export default function Page() {
  const [bookings, setBookings] = useState<any>();

  useEffect(() => {
    const ref = collection(getFirestore(app), "bookings");
    const unsub = onSnapshot(ref, (querySnapshot) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc) => {
        snapshotData.push(doc.data());
      });
      setBookings(snapshotData);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-6 sm:p-12 gap-3 sm:gap-6 text-white">
      <div className="p-3 lg:p-6 aspect-square bg-gray-600 shadow-md shadow-black flex flex-col ">
        <h2 className="text-xl font-bold mb-2">Nowe rezerwacje</h2>
        <TrustedBookingsAdmin bookings={bookings} type="trusted" />
      </div>
      <div className="p-3 lg:p-6 aspect-square bg-gray-600 shadow-md shadow-black flex flex-col ">
        <h2 className="text-xl font-bold mb-2">Rezerwacje do weryfikacji</h2>
        <TrustedBookingsAdmin bookings={bookings} type="untrusted" />
      </div>
      <div className="p-3 lg:p-6 aspect-square bg-gray-600 shadow-md shadow-black flex flex-col ">
        <h2 className="text-xl font-bold mb-2">Zatwierdzone</h2>
        <TrustedBookingsAdmin bookings={bookings} type="completed" />
      </div>
      <div className="p-3 aspect-square bg-gray-600 shadow-md shadow-black"></div>
      <div className="p-3 aspect-square bg-gray-600 shadow-md shadow-black"></div>
      <div className="p-3 aspect-square bg-gray-600 shadow-md shadow-black"></div>
    </div>
  );
}
