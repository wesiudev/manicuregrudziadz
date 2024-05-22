"use client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

import { addDocument, auth, updateDocument } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { toastUpdate } from "@/components/Toast/Toasts";
import { errorCatcher } from "@/app/utils/errorCatcher";
export default function PlaceOrder({
  phoneNumber,
  bookingData,
}: {
  phoneNumber: string | string[] | undefined;
  bookingData: any;
}) {
  const [user, loading] = useAuthState(auth);
  const [isThinking, setThinking] = useState(false);
  const [view, setView] = useState("register");
  const [userData, setUserData] = useState({
    phoneNumber: phoneNumber,
    password: "",
    passwordRepeat: "",
    email: "",
  });
  function signIn() {
    setThinking(true);
    const id = toast.loading(<span>Loguję...</span>);

    if (userData.email.includes("@") && userData.email.includes(".")) {
      signInWithEmailAndPassword(auth, userData.email, userData.password).catch(
        (error) => {
          if (error.code === "auth/user-not-found") {
            setThinking(false);
            toastUpdate("Niepoprawne dane.", id, "error");
          }
        }
      );
    } else if (!userData.email.includes("@") || !userData.email.includes(".")) {
      setThinking(false);
      toastUpdate("Wpisz poprawny login", id, "error");
    }
    if (userData.password.length < 6) {
      setThinking(false);
      toastUpdate("Błędne hasło", id, "error");
    }
  }
  function createAccount() {
    setThinking(true);
    const id = toast.loading(<span>Tworzę konto...</span>);
    if (userData.password !== userData.passwordRepeat) {
      setThinking(false);
      toastUpdate("Hasła nie są takie same", id, "error");
      return;
    }
    if (userData.password?.length < 6) {
      setThinking(false);
      toastUpdate("Hasło jest za krótkie (minimum 6 znaków)", id, "error");
      return;
    }
    if (!userData.email) {
      setThinking(false);
      toastUpdate("Proszę wpisać email", id, "error");
      return;
    }
    (async () => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        ).then(async (userCredential) => {
          await addDocument("users", userCredential.user.uid, {
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            uid: userCredential.user.uid,
            isCollected: false,
            isCollectable: false,
            coupons: [],
            joined: Date.now(),
          });
          await updateDocument(
            ["uid", "isReliable"],
            [userCredential?.user.uid, true],
            "bookings",
            bookingData.id
          );
          toastUpdate("Zarejestrowano pomyślnie!", id, "success");
          setThinking(false);
        });
      } catch (err: any) {
        const errorMsg = errorCatcher(err);
        toastUpdate(errorMsg, id, "error");
        setThinking(false);
      }
    })();
  }

  if (user) {
    redirect(`/dashboard`);
  }
  return (
    <div className="font-sans w-full min-h-screen mt-[75px] lg:-mt-[75px] bg-slug bg-cover bg-center mx-auto relative flex flex-col items-center justify-center">
      <div className="w-[90vw] sm:w-[70vw] lg:w-[60vw] xl:w-[40vw] p-3 lg:p-6 rounded-xl bg-white">
        <h2 className="text-zinc-800 font-bold text-2xl mb-3 lg:mb-6 drop-shadow-xl shadow-black">
          Zarejestruj się, aby dokończyć rezerwację.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="font-bold">
              Numer telefonu
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={userData.phoneNumber}
              onChange={(e) =>
                setUserData({ ...userData, phoneNumber: e.target.value })
              }
              className="mt-1 bg-indigo-500 text-white shadow-sm shadow-black rounded-xl p-3 text-xl mb-3"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="mt-1 bg-indigo-500 text-white shadow-sm shadow-black rounded-xl  p-3 text-xl mb-3"
            />
          </div>
          <div className="flex flex-col">
            {" "}
            <label htmlFor="password" className="font-bold">
              Hasło
            </label>
            <input
              required
              type="password"
              id="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="mt-1 bg-indigo-500 text-white shadow-sm shadow-black rounded-xl  p-3 text-xl mb-3"
            />
          </div>
          <div className="flex flex-col">
            {" "}
            <label htmlFor="passwordRepeat" className="font-bold">
              Powtórz Hasło
            </label>
            <input
              required
              type="password"
              id="passwordRepeat"
              value={userData.passwordRepeat}
              onChange={(e) =>
                setUserData({ ...userData, passwordRepeat: e.target.value })
              }
              className="mt-1 bg-indigo-500 text-white shadow-sm shadow-black rounded-xl  p-3 text-xl mb-3"
            />
          </div>
        </div>{" "}
        <div className="grid grid-cols-1 gap-3 w-full">
          {view === "register" && (
            <button
              disabled={isThinking}
              onClick={createAccount}
              className="mt-2 py-2 rounded-xl disabled:bg-gray-600 bg-green-600 hover:bg-green-800 duration-150 text-white font-bold"
            >
              {!isThinking && "Dołącz"}
              {isThinking && "Poczekaj..."}
            </button>
          )}
          {view === "login" && (
            <button
              disabled={isThinking}
              onClick={signIn}
              className="mt-2 py-2 rounded-xl disabled:bg-gray-600 bg-green-600 hover:bg-green-800 duration-150 text-white font-bold"
            >
              {!isThinking && "Zaloguj"}
              {isThinking && "Poczekaj..."}
            </button>
          )}
          {view === "register" && (
            <button
              onClick={() => setView("login")}
              className="mt-2 py-2 rounded-xl hover:underline duration-200 text-black font-bold"
            >
              Posiadam już konto
            </button>
          )}
          {view === "login" && (
            <button
              onClick={() => setView("register")}
              className="mt-2 py-2 rounded-xl hover:underline duration-200 text-black font-bold"
            >
              Utwórz konto
            </button>
          )}
        </div>
      </div>
      <div className="rounded-b-xl py-6 bg-white bg-opacity-50 w-[90vw] sm:w-[70vw] lg:w-[60vw] xl:w-[40vw]">
        <div className="grid grid-cols-3 mt-6 w-full">
          <div className="flex flex-col items-center justify-center text-center">
            <FaCheckCircle className="text-green-600 h-20 w-20" />

            <p className="text-sm sm:text-xl mt-3">REZERWACJA</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="aspect-square rounded-full flex items-center justify-center h-20 w-20 text-6xl font-light text-white italic bg-gray-500">
              2
            </div>
            <p className="text-sm sm:text-xl mt-3">REJESTRACJA</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="aspect-square rounded-full flex items-center justify-center h-20 w-20 text-6xl font-light text-white italic bg-gray-500">
              3
            </div>
            <p className="text-sm sm:text-xl mt-3">GOTOWE!</p>
          </div>
        </div>
      </div>
      {/* <div className="hidden sm:flex flex-col items-center justify-center text-center rounded-b-xl py-6 bg-white bg-opacity-50 w-[90vw] sm:w-[70vw] lg:w-[60vw] xl:w-[40vw]">
        <FaCheckCircle className="text-green-600 mb-3 h-16 w-16" />
        <span className="font-bold text-4xl ">Sukces!</span>
        <h2 className="font-bold text-xl ">
          Twoja rezerwacja czeka na zatwierdzenie. <br />
          <span className="font-light">Rezerwacja: {bookingData.id}</span>
        </h2>
      </div> */}
    </div>
  );
}
