import Link from "next/link";

export default function Input({
  key,
  value,
  label,
  placeholder,
  onchange,
}: {
  key: string;
  value: any;
  label: string;
  placeholder: string;
  onchange: Function;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={key} className="font-bold">
        {label}
      </label>
      <input
        type="text"
        id={key}
        value={value}
        onChange={onchange()}
        className="mt-1 bg-indigo-500 text-white shadow-sm shadow-black rounded-xl p-3 text-xl mb-3"
      />
    </div>
  );
}
