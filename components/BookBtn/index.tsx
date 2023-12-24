"use client";
import { polishToEnglish } from "@/app/utils/polishToEnglish";
import * as Scroll from "react-scroll";
export default function BookBtn({
  chosenService,
  setChosenService,
  service,
  scrollTo,
  isMobile,
}: {
  chosenService: any;
  setChosenService: any;
  service: any;
  scrollTo: any;
  isMobile: boolean;
}) {
  let ScrollTo = Scroll.Link;
  return (
    <ScrollTo
      to={`${polishToEnglish(service.serviceName)}`}
      onClick={() =>
        setChosenService({
          ...chosenService,
          name: service.serviceName,
        })
      }
      className={`bg-indigo-600 sm:h-[32px] text-white rounded-xl text-base px-2 hover:bg-indigo-400 duration-100 cursor-pointer items-center justify-center flex ${
        isMobile ? "rounded-t-none" : ""
      } ${
        isMobile && chosenService.name === service.serviceName
          ? "scale-y-0 duration-500 h-[0px] delay-500"
          : "scale-y-100 h-[35px]"
      }`}
      smooth={true}
      duration={500}
      delay={500}
    >
      Umów
    </ScrollTo>
  );
}
