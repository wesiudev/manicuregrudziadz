"use client";
import { toastUpdate } from "@/components/Toast/Toasts";
import { updateDocument } from "@/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
export default function UserInvitations({
  loading,
  relatedUsers,
  uid,
  setShouldRefresh,
  shouldRefresh,
}: {
  loading: boolean;
  relatedUsers: any[];
  uid: string;
  setShouldRefresh: Function;
  shouldRefresh: number;
}) {
  async function generateCoupon(userId: string, relatedUserId: string) {
    try {
      const id = toast.loading(<span>obieranie kuponu...</span>);
      const db = getFirestore();
      const docRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(docRef);

      if (!userSnapshot.exists()) {
        console.log("User not found.");
        return;
      }

      const user = userSnapshot.data();

      const couponId = uuidv4();

      const couponObject = {
        id: couponId,
        value: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
      };

      if (!user.coupons) {
        user.coupons = [couponObject];
      } else {
        user.coupons.push(couponObject);
      }
      await updateDocument(
        ["isCollected", "isCollectable"],
        [true, false],
        "users",
        relatedUserId
      );
      // Update the user in the database
      await updateDoc(docRef, {
        coupons: arrayUnion(couponObject), // This ensures that duplicate coupons are not added
      });
      toastUpdate("Pomyślnie odebrano kupon!", id, "success");
      setShouldRefresh(shouldRefresh + 1);
    } catch (error) {
      console.error("Error generating coupon:", error);
    }
  }
  return (
    <>
      <div className="text-center flex h-full py-2 px-3 text-white bg-indigo-600 rounded-b-xl items-center justify-center w-[90%] mx-auto">
        Zaproś znajomych i zyskaj zniżki na kolejne sesje!
      </div>
      {loading && (
        <div className="text-center flex h-full py-12 p-3 text-black items-center justify-center">
          Wczytywanie danych...
        </div>
      )}
      {relatedUsers?.length === 0 && (
        <div className="text-center flex h-full my-auto p-3 py-12 text-black items-center justify-center">
          Jeszcze nikt nie zarejestrował się z twojego linku.
        </div>
      )}
      <ul
        className={`flex h-full ${relatedUsers?.length > 0 ? "py-12 p-3" : ""}`}
      >
        {relatedUsers?.map((relatedUser: any, i: any) => (
          <li
            key={i}
            className="w-full flex flex-col p-2 rounded-xl bg-gray-300"
          >
            <div className="flex flex-row justify-between w-full">
              <div className="w-full flex flex-col items-start">
                <span className="text-gray-600 text-sm italic">
                  Data rejestracji
                </span>
                <span className="text-lg">
                  {moment(relatedUser.joined).format("DD.MM.YYYY hh:mm")}
                </span>
              </div>
              <div className="">
                {" "}
                {relatedUser.isCollectable && (
                  <button
                    onClick={() => generateCoupon(uid, relatedUser.uid)}
                    className="bg-green-600 p-2 px-3 rounded-xl hover:bg-green-700 text-white font-bold"
                  >
                    Odbierz
                  </button>
                )}
                {relatedUser.isCollected && (
                  <button
                    disabled
                    className="bg-gray-400 p-2 px-3 rounded-xl hover:bg-green-700 text-white font-bold"
                  >
                    Odebrano
                  </button>
                )}
                {!relatedUser.isCollectable && (
                  <div className="group relative">
                    <button
                      disabled
                      className="disabled:cursor-not-allowed bg-gray-600 p-2 px-3 rounded-xl hover:bg-gray-700 text-white font-bold w-max"
                    >
                      W trakcie
                    </button>
                    <p className="hidden group-hover:block absolute left-0 -bottom-24 z-[500] w-[300px] bg-white shadow-sm shadow-black rounded-xl p-2">
                      Użytkownik już się zarejestrował. Kiedy dokona udanej
                      rezerwacji otrzymasz unikalny kod promocyjny.
                    </p>
                  </div>
                )}
              </div>
            </div>
            {relatedUser.uid}
          </li>
        ))}
      </ul>
    </>
  );
}
