import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  className?: string;
}

export default function Input({
    variant= "primary",
    className = "w-full",
    disabled=false,
    type="submit",
    children,
  ...props
}: ButtonProps) {
  return (
<button className={
    clsx(
        "p-2 text-white text-2xl font-semibold rounded-lg",
        {
            "bg-custom-blue" : variant === "primary",
            "bg-custom-pink" : variant === "danger",
            "bg-custom-orange" : variant === "alert",
            "bg-custom-green" : variant === "success",
        }
    )
} type={type} disabled={disabled} {...props}>{children}</button>
  );
}
