import Dashboard from "./Dashboard";
async function getRelatedUsers(uid: string) {
  "use server";
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/users/listRelatedUsers?secret=${process.env.API_SECRET_KEY}&uid=${uid}`,
    {
      cache: "no-store",
    }
  );

  const users = req.json();
  return users;
}
async function getBookings() {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/bookings?secret=${process.env.API_SECRET_KEY}`,
    {
      cache: "no-store",
    }
  );

  const bookings = req.json();
  return bookings;
}
export default async function Page() {
  const bookings = await getBookings();
  return (
    <div>
      <Dashboard getUsers={getRelatedUsers} bookings={bookings} />
    </div>
  );
}
