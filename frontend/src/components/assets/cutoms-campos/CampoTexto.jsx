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
  esquema_color = "dark",
}) => {
  return (
    <div className={className}>
      <label
        className={`block mb-1 md:mb-2 text-xs md:text-sm font-semibold ${esquema_color === "dark" ? "text-escom-900" : "text-white"}`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm md:text-base ${esquema_color === "dark" ? "text-escom-700" : "text-escom-600"}`}>
          <FontAwesomeIcon icon={icon} />
        </span>
        <input
          className={`w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl focus:outline-none focus:ring-2 transition-all text-escom-900 placeholder:text-escom-sombra-300 ${esquema_color === "dark" ? "focus:ring-escom-300 focus:border-escom-700" : "focus:ring-white focus:border-white"} ${disabled ? "" : esquema_color === "dark" ? "border-2 border-escom-200 bg-white hover:border-escom-300" : "border-2 border-white/50 bg-white hover:border-white"}`}
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id, { required })}
          disabled={disabled}
        />
      </div>
      {error && <span className={`text-sm mt-1 block ${esquema_color === "dark" ? "text-red-600" : "text-red-300 font-medium"}`}><FontAwesomeIcon icon="exclamation-circle" />{" "}{error.message}</span>}
    
    </div>
  );
};
