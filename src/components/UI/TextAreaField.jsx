import { useFormContext } from 'react-hook-form';

export default function TextareaField({ name, label, required, rules, ...rest }) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message;

  return (
    <fieldset className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label + ":"}
      </label>
      <textarea
        {...register(name, { required: required, ...rules })}
        {...rest}
        className={`min-h-36 max-h-44 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-secondary-700 transition ${error ? 'border-red-600' : ''}`}
      ></textarea>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </fieldset>
  );
}
