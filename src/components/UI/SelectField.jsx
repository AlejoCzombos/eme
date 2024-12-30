import { useFormContext } from 'react-hook-form';

export default function SelectField({ name, label, options, placeholder, required, rules, ...rest }) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message;

  return (
    <fieldset className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label + ":"}
      </label>
      <select
        {...register(name, { required: required, ...rules })}
        {...rest}
        className={`border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-secondary-700 transition ${error ? 'border-red-600' : ''}`}
      >
        <option value="">
          {placeholder || "Selecciona una opción"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </fieldset>
  );
}
