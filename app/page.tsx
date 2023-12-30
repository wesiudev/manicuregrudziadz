import About from "@/components/About";
import { Hero } from "@/components/Hero/Hero";
import Reserve from "@/components/Reserve";
import carousel from "@/public/carousel.json";
import { ServicesGrid } from "@/components/ServicesGrid";
import HowItWorks from "@/components/HowItWorks";
import { getDocuments } from "@/firebase";

export default async function Home() {
  const services = await getDocuments("services");
  return (
    <div className="w-full">
      <Hero />
      <HowItWorks />
      <ServicesGrid services={services} />
      <Reserve />
      <About carousel={carousel.carousel} />
    </div>
  );
}
