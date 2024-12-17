export default function InputField({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  label,
}) {
  return (
    <fieldset className="space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-secondary-700 transition ${className}`}
      />
    </fieldset>
  );
}
