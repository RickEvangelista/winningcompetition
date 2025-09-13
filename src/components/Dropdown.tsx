import React, { SelectHTMLAttributes } from "react";

interface DropdownpProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  placeholder: string;
  options: { label: string; value: string | number }[];
}

export default function Input({
  label,
  name,
  placeholder,
  defaultValue,
  options,
  ...props
}: DropdownpProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-2xl">
        {label}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="p-2 border-2 border-black w-full rounded-lg"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
