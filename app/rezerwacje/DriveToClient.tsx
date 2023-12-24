export default function DriveToClient({
  setDriveToClient,
  driveToTheClient,
  chosenHour,
}: {
  setDriveToClient: Function;
  driveToTheClient: string;
  chosenHour: string;
}) {
  return (
    <div
      className={`flex flex-col fixed left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] bg-rose-500 duration-1000 shadow-md shadow-black rounded-lg p-6  w-4/5 lg:w-max ${
        chosenHour !== "" && driveToTheClient === ""
          ? "scale-100 translate-y-0 z-[1690]"
          : "scale-0 translate-y-48"
      }`}
    >
      <h1 className="text-xl lg:text-3xl mb-3">Dojazd do klienta:</h1>
      <div className="grid grid-cols-2 lg:flex flex-row space-x-3">
        <button
          onClick={() => setDriveToClient("tak")}
          className={`bg-rose-400 p-3 px-6 rounded-lg font-bold border-2 hover:border-white ${
            driveToTheClient === "tak" ? "border-white" : "border-rose-400"
          }`}
        >
          Tak
        </button>
        <button
          onClick={() => setDriveToClient("nie")}
          className={`bg-rose-400 p-3 px-6 rounded-lg font-bold border-2 hover:border-white ${
            driveToTheClient === "nie" ? "border-white" : "border-rose-400"
          }`}
        >
          Nie
        </button>
      </div>
    </div>
  );
}
