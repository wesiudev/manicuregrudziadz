/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Booking from "./Booking";

export async function getServicesList() {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/services?secret=${process.env.API_SECRET_KEY}`,
    { cache: "no-store" }
  );

  const services = req.json();
  return services;
}
async function getAllBookings() {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/bookings?secret=${process.env.API_SECRET_KEY}`,
    { cache: "no-store" }
  );

  const bookings = req.json();
  return bookings;
}
export default async function Reservations() {
  const services = await getServicesList();
  const bookings = await getAllBookings();

  return (
    <div className="px-4 md:px-8 xl:px-32 py-12">
      <Link
        href="/rezerwacje"
        className=" text-zinc-800 drop-shadow-xl shadow-black"
      >
        /rezerwacje
      </Link>
      <Booking services={services} bookings={bookings} />
    </div>
  );
}
