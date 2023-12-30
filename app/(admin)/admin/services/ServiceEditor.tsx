import { useState } from "react";
import Input from "./Input";
import { addDocument, db } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import { deleteDoc, doc, updateDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";
import { toastUpdate } from "@/components/Toast/Toasts";

interface UserInput {
  [key: string]: string;
}

export default function ServiceEditor({
  chosenService,
  setChosenService,
  setEditorOpen,
}: {
  chosenService?: any;
  setChosenService: Function;
  setEditorOpen: Function;
}) {
  const [userInput, setUserInput] = useState<UserInput>({});
  const [startDelete, setStartDelete] = useState(false);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, key: string) {
    !chosenService &&
      setUserInput({
        ...userInput,
        [key]: e.target.value,
      });
    chosenService &&
      setChosenService({
        ...chosenService,
        [key]: e.target.value,
      });
  }
  const inputs = [
    {
      title: "Nazwa usługi",
      key: "serviceName",
      placeholder: "Wpisz tytuł usługi...",
      value: chosenService?.serviceName,
      type: "text",
    },

    {
      title: "Czas trwania (np. 30-90 minut, przedział)",
      key: "duration",
      placeholder: "Czas trwania (np. 30-90 minut, przedział)",
      value: chosenService?.duration,
      type: "text",
    },
    {
      title: "Cena (Zapis - np. 25zł | 90zł | 120zł )",
      key: "price",
      placeholder: "Wpisz cenę...",
      value: chosenService?.price,
      type: "text",
    },
    {
      title: "Link do podstrony (np. manicure-hybrydowy-grudziadz)",
      key: "url",
      placeholder: "Wpisz link bez spacji i znaków jak Ź, Ż, Ś",
      value: chosenService?.url,
      type: "text",
    },
    {
      title: "Opis usługi",
      key: "serviceDesc",
      placeholder: "",
      value: chosenService?.serviceDesc,
      type: "textarea",
    },
  ];
  function deleteService() {
    const id = toast.loading(<span>Usuwam...</span>);
    const docRef = doc(db, "services", chosenService.uniqueId);
    deleteDoc(docRef).then(() =>
      toastUpdate("Usunięto pomyślnie", id, "success")
    );
    setEditorOpen(-2);
  }
  return (
    <div className="h-max w-full p-3  bg-slate-700 text-white  shadow-md shadow-black mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full">
        {inputs.map((item: any, i: any) => (
          <Input
            key={i}
            title={item.title}
            handleChange={handleChange}
            inputkey={item.key}
            placeholder={item.placeholder}
            userInput={userInput}
            value={item.value}
            type={item.type}
          />
        ))}
      </div>
      <div className="w-full flex items-center flex-row justify-between">
        <button
          onClick={() => setEditorOpen(-2)}
          className="w-max bg-black hover:bg-opacity-50 duration-300 text-white font-bold text-xl p-2 px-3 mt-12"
        >
          Wyłącz edytor
        </button>
        {!chosenService && (
          <button
            onClick={() => {
              const id = toast.loading(<span>Dodaję...</span>);
              const uniqueId = uuidv4();
              addDocument("services", uniqueId, {
                ...userInput,
                uniqueId,
              }).then(() =>
                toastUpdate("Pomyślnie dodano usługę", id, "success")
              );
              setEditorOpen(-2);
            }}
            className="w-max bg-green-600 hover:bg-green-500 duration-300 text-white font-bold text-xl p-2 px-3 mt-12"
          >
            Dodaj usługę
          </button>
        )}
        {chosenService && (
          <div>
            <button
              onClick={() => {
                !startDelete ? setStartDelete(true) : deleteService();
              }}
              className="mr-3 w-max bg-red-600 hover:bg-red-500 duration-300 text-white font-bold text-xl p-2 px-3 mt-12"
            >
              {!startDelete ? (
                <span>Usuń</span>
              ) : (
                <span>Czy chcesz usunąć {chosenService.serviceName}?</span>
              )}
            </button>
            {startDelete && (
              <button
                onClick={() => setStartDelete(false)}
                className="mx-3 text-white font-bold bg-green-600 hover:bg-green-500 duration-300 p-2 px-3"
              >
                Nie usuwaj
              </button>
            )}
            <button
              onClick={() => {
                const id = toast.loading(<span>Aktualizuję...</span>);
                const docRef = doc(db, "services", chosenService.uniqueId);
                updateDoc(docRef, chosenService).then(() =>
                  toastUpdate("Zaaktualizowano pomyślnie", id, "success")
                );
                setEditorOpen(-2);
              }}
              className="w-max bg-green-600 hover:bg-green-500 duration-300 text-white font-bold text-xl p-2 px-3 mt-12"
            >
              Zapisz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
