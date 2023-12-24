import PlaceOrder from "./PlaceOrder";
import { getBookingById } from "@/firebase";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const bookingData = await getBookingById(searchParams?.bookingId);

  return (
    <>
      <PlaceOrder
        phoneNumber={searchParams?.phoneNumber}
        bookingData={bookingData}
      />
    </>
  );
}
