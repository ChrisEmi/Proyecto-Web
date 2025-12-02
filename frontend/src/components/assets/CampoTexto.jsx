import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CampoTexto = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  required = true,
  icon,
  error,
  className = "",
  disabled = false,
}) => {
  return (
    <div className={className}>
      <label
        className="block mb-1 md:mb-2 text-xs md:text-sm font-semibold text-escom-900"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-escom-700 text-sm md:text-base">
          <FontAwesomeIcon icon={icon} />
        </span>
        <input
          className={`w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl focus:border-escom-700 focus:outline-none focus:ring-2 focus:ring-escom-300 transition-all text-escom-900 placeholder:text-escom-sombra-300 ${disabled ? "" : " border-2 border-escom-200 bg-white hover:border-escom-300"}`}
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id, { required })}
          disabled={disabled}
        />
      </div>
      {error && <span className="text-red-600 text-sm mt-2 font-ligh"><FontAwesomeIcon icon="exclamation-circle" />{" "}{error.message}</span>}
    </div>
  );
};
