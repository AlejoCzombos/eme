export default function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Seleccionar",
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 font-semibold mb-1">
        {label}
      </label>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id || option} value={option.id || option}>
            {option.name || option}
          </option>
        ))}
      </select>
    </div>
  );
}
