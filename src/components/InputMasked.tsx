import React, { InputHTMLAttributes } from "react";
import { IMaskInput } from "react-imask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  placeholder: string;
}

export default function Input({
  label,
  name,
  placeholder,
  defaultValue,
}: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-2xl">
        {label}
      </label>
      <IMaskInput
        mask={"000.000.000-00"}
        name={name}
        className="p-2 border-2 border-black w-full rounded-lg"
        unmask={true}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
