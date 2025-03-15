import { useFormContext } from 'react-hook-form';

export default function InputField({ name, label, type, required, rules, ...rest }) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message;
  return (
    <fieldset className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label + ":"}
        </label>
      <input
        type={type || 'text'}
        {...register(name, { required: required, ...rules })}
        {...rest}
        accept=".pdf"
        className={`block border border-[#D2D2D2] rounded-md w-full cursor-pointer 
            file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-primary-600 file:hover:bg-primary-700 file:text-white
            bg-neutral-100 hover:bg-neutral-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-700 ${error ? 'border-red-600' : ''}`}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </fieldset>
  );
}