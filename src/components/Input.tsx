import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label:string;
    name:string;
    placeholder:string;
}

export default function Input({label, name, placeholder,type="text", defaultValue, ...props}: InputProps) {
  return (
    <div className='flex flex-col'>
        <label htmlFor={name} className="text-2xl">{label}</label>

        <input className='p-2 border-2 border-black w-full rounded-lg' type={type} name={name} placeholder={placeholder} defaultValue={defaultValue} required {...props} />
    </div>
  )
}
