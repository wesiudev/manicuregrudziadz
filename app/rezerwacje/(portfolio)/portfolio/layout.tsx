import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paznokcie Grudziądz - Portfolio Salonu Manicure Piękniej",
  description:
    "Portfolio Manicure. Zarezerwuj sesję manicure w Grudziądzu! Paznokcie Hybrydowe, Żelowe, Klasyczne i wiele więcej.",
  publisher: "quixy",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
  },
};

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-white font-sans">{children}</div>
  );
}
