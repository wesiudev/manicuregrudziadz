import About from "@/components/About";
import { Hero } from "@/components/Hero";
import Reserve from "@/components/Reserve";
import carousel from "@/public/carousel.json";
import { ServicesGrid } from "@/components/ServicesGrid";

// async function getServicesList() {
//   const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/services`);
//   const services = req.json();
//   return services;
// }

export default async function Home() {
  // const { services } = await getServicesList();
  return (
    <div className="w-full">
      <Hero />
      {/* <ServicesGrid services={services} /> */}
      <Reserve />
      <About carousel={carousel.carousel} />
    </div>
  );
}
