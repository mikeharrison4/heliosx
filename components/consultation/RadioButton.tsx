import React, { InputHTMLAttributes } from "react";

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
}

export function RadioButton({
  id,
  value,
  disabled,
  ...rest
}: RadioButtonProps) {
  return (
    <div>
      <input
        className="sr-only peer"
        type="radio"
        id={`${id}-${value}`}
        disabled={disabled}
        value={value}
        {...rest}
      />
      <label
        htmlFor={`${id}-${value}`}
        className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"} border border-gray-200 px-3 py-2 flex w-[50px] justify-center items-center font-mono peer-checked:bg-primary-yellow peer-focus:outline-none peer-focus:border-blue-700`}
      >
        {value}
      </label>
    </div>
  );
}
