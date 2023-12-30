import Toast from "@/components/Toast";
import Link from "next/link";

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-white font-sans">
      <Toast />
      {children}
    </div>
  );
}
