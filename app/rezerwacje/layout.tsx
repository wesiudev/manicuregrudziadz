import Link from "next/link";

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-white font-sans">{children}</div>
  );
}
