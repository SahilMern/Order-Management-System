import React from "react";

export const FormInput = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required = true,
  min,
  max,
  textarea = false,
}) => {
  const InputComponent = textarea ? "textarea" : "input";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && "*"}
      </label>
      <InputComponent
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        rows={textarea ? 3 : undefined}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};