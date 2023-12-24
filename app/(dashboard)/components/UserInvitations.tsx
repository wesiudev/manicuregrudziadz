import moment from "moment";
import Link from "next/link";

export default function UserInvitations({
  loading,
  relatedUsers,
}: {
  loading: boolean;
  relatedUsers: any[];
}) {
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
          <li key={i} className="w-full flex flex-col">
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
                <button
                  // onClick={() => }
                  className="bg-green-600 p-2 px-3 rounded-xl hover:bg-green-700 text-white font-bold"
                >
                  Zatwierdź
                </button>
              </div>
            </div>
            {relatedUser.uid}
          </li>
        ))}
      </ul>
    </>
  );
}
