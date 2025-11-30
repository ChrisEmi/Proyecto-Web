import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CampoContrasena = ({
  label,
  id,
  placeholder,
  register,
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label
        className="block mb-1 md:mb-2 text-xs md:text-sm font-semibold text-escom-900"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-escom-700 text-sm md:text-base">
          <FontAwesomeIcon icon="fa-solid fa-lock" />
        </span>
        <input
          className="w-full pl-9 md:pl-10 pr-11 md:pr-12 py-2 md:py-3 text-sm md:text-base border-2 border-escom-200 rounded-lg md:rounded-xl focus:border-escom-700 focus:outline-none focus:ring-2 focus:ring-escom-300 transition-all text-escom-900 placeholder:text-escom-sombra-300"
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          {...register(id, { required })}
        />
        <button
          type="button"
          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-escom-100 rounded-full p-1.5 md:p-2 transition-all text-escom-700 hover:text-escom-900 text-sm md:text-base"
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onTouchStart={() => setShowPassword(true)}
          onTouchEnd={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
        >
          {showPassword ? (
            <FontAwesomeIcon icon="fa-solid fa-eye" />
          ) : (
            <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
          )}
        </button>
      </div>
    </div>
  );
};
