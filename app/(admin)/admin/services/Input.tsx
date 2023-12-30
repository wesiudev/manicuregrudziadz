"use client";
export default function Input({
  handleChange,
  inputkey,
  title,
  placeholder,
  userInput,
  value,
  type,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
  inputkey: string;
  title: string;
  placeholder: string;
  userInput: any;
  value: any;
  type: string;
}) {
  return (
    <div className="flex flex-col h-full justify-end bg-gray-600 shadow-sm shadow-black p-2">
      <label className="text-white text-lg font-bold" htmlFor={inputkey}>
        {title}
      </label>
      {type === "text" && (
        <input
          className="text-black p-2 px-3 text-xl mt-2"
          placeholder={placeholder}
          id={inputkey}
          type="text"
          value={value !== typeof undefined ? value : userInput[inputkey] || ""}
          onChange={(e) => handleChange(e, inputkey)}
        />
      )}
      {type === "textarea" && (
        <textarea
          className="text-black p-2 px-3 text-base mt-2 min-h-[300px]"
          cols={8}
          placeholder={placeholder}
          id={inputkey}
          value={value !== typeof undefined ? value : userInput[inputkey] || ""}
          onChange={(e: any) => handleChange(e, inputkey)}
        />
      )}
    </div>
  );
}
