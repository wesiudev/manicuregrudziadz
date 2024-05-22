// import { Parisienne } from "next/font/google";
// import "./globals.css";
// import localFont from "next/font/local";
// import { Metadata } from "next";
// import { Header } from "@/components/Header";
// import Footer from "@/components/Footer";
// import Toast from "@/components/Toast";
import { getDocuments } from "@/firebase";

export const metadata: Metadata = {
  title: "Paznokcie Grudziądz - Zróbmy Hybrydy, Żelowe lub Klasyczne!",
  description:
    "Zarezerwuj sesję manicure w Grudziądzu! Paznokcie Hybrydowe, Żelowe, Klasyczne i wiele więcej. Paznokcie na imprezę?",
  publisher: "quixy",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = await getDocuments("services");
  return (
    <html lang="pl">
      <body
        className={`mt-[75px] ${cocosharp.variable} ${parisienne.variable}
       w-full overflow-x-hidden`}
      >
        {/* <Header services={services} />
        <Toast /> */}
        {children}
        {/* <Footer services={services} /> */}
      </body>
    </html>
  );
}

// const parisienne = Parisienne({
//   weight: "400",
//   variable: "--font-persisienne",
//   subsets: ["latin"],
// });
// const cocosharp = localFont({
//   src: [
//     {
//       path: "../public/fonts/Italic.ttf",
//       weight: "400",
//       style: "italic",
//     },
//     {
//       path: "../public/fonts/BoldItalic.ttf",
//       weight: "700",
//       style: "italic",
//     },
//     {
//       path: "../public/fonts/Bold.ttf",
//       weight: "700",
//     },
//     {
//       path: "../public/fonts/ExtraLight.ttf",
//       weight: "200",
//     },
//     {
//       path: "../public/fonts/Light.ttf",
//       weight: "300",
//     },
//     {
//       path: "../public/fonts/LightItalic.ttf",
//       weight: "300",
//       style: "italic",
//     },
//     {
//       path: "../public/fonts/Regular.ttf",
//       weight: "500",
//     },
//   ],
//   variable: "--font-cocosharp",
// });
