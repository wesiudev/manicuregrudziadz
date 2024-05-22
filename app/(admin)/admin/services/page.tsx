"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments } from "@/firebase";
import { setServices } from "@/redux/slices/services";
import ServiceEditor from "./ServiceEditor";
import { FaClock, FaCoins } from "react-icons/fa";
import { polishToEnglish } from "@/app/utils/polishToEnglish";

export default function Page() {
  const [editorOpen, setEditorOpen] = useState(-2);
  const [chosenService, setChosenService] = useState<any>();
  const dispatch = useDispatch();
  const { services } = useSelector((state: any) => state.services);
  useEffect(() => {
    if (services?.length === 0) {
      getDocuments("services").then((data: any) => dispatch(setServices(data)));
    }
  }, [services]);
  return (
    <div className="p-12 relative w-full ">
      <h1 className="text-3xl font-bold my-3 text-white w-full">
        Edytuj i dodawaj usługi
      </h1>
      <button
        onClick={() => setEditorOpen(-1)}
        className="p-2 px-3 bg-blue-500 hover:bg-blue-600 duration-300 text-2xl text-white font-bold"
      >
        Dodaj usługę
      </button>
      <div className={`w-full`}>
        {editorOpen === -1 && (
          <ServiceEditor
            setEditorOpen={setEditorOpen}
            setChosenService={setChosenService}
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-3 lg:gap-6 mt-6 w-full">
        {services?.map((service: any, i: number) => (
          <div
            key={i}
            className={`w-full flex flex-col rounded-xl bg-gray-300 relative `}
          >
            <div
              id={`${polishToEnglish(service.serviceName)}`}
              className="absolute left-0 -top-[100px]"
            />
            <div className="w-full sm:p-3 flex flex-row justify-between text-xl text-zinc-800 drop-shadow-lg shadow-black">
              <div className="flex flex-row items-start justify-between w-full">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between w-full px-3 sm:px-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                      <h2 className="text-2xl font-bold sm:font-normal sm:text-2xl lg:text-3xl mt-3 sm:mt-0">
                        {service.serviceName}
                      </h2>
                      <div className="hidden sm:flex flex-row items-start">
                        <span className="text-sm sm:text-base p-1 rounded-xl font-normal flex flex-row items-center bg-gray-400 text-white px-2 sm:px-3">
                          <FaCoins className="mr-1.5 " /> {service.price}
                        </span>

                        <span className="ml-2 text-sm sm:text-base font-normal flex flex-row items-center p-1 rounded-xl bg-gray-400 text-white w-max px-2 sm:px-3">
                          <FaClock className="mr-1.5 " />
                          {service.duration}
                        </span>
                      </div>
                    </div>
                    <div className="m-3 sm:m-0 sm:ml-2">
                      <button
                        onClick={() => {
                          setEditorOpen(i), setChosenService(service);
                        }}
                        className="p-2 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-xl"
                      >
                        Edytuj
                      </button>
                    </div>
                  </div>

                  <p className="font-normal text-sm px-3 sm:px-0 mt-2">
                    <>{service.serviceDesc}</>
                  </p>
                  <div className="sm:hidden flex flex-row items-start my-2 px-3">
                    <span className="text-sm sm:text-base p-1 rounded-xl font-normal flex flex-row items-center bg-gray-400 text-white px-1.5 sm:px-3">
                      <FaCoins className="mr-1.5 " /> {service.price}
                    </span>

                    <span className="ml-2 text-sm sm:text-base font-normal flex flex-row items-center p-1 rounded-xl bg-gray-400 text-white w-max px-1.5 sm:px-3">
                      <FaClock className="mr-1.5 " />
                      {service.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {editorOpen === i && (
              <ServiceEditor
                setEditorOpen={setEditorOpen}
                setChosenService={setChosenService}
                chosenService={chosenService}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
