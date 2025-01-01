import { useFormContext } from 'react-hook-form';

export default function MultiSelectDropdown({
  name,
  options,
  placeholder,
  selectedOptions,
  onChange,
}) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message;

  const customValidation = () => {
    if (selectedOptions.length === 0) {
      return "Seleccione al menos una opción";
    }
  };

  // Manejamos el cambio de los checkboxes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    const selectedOption = options.find((option) => option.id === value);

    if (checked) {
      onChange([...selectedOptions, selectedOption]);
    } else {
      onChange(selectedOptions.filter((option) => option.id !== value));
    }
  };

  return (
    <label className="relative w-full">
      {/* Checkbox oculto para controlar el dropdown */}
      <input
        type="checkbox"
        className="hidden peer"
        {...register(name, { validate: customValidation })}
      />

      {/* Botón para abrir/cerrar el dropdown */}
      <div
        className={`flex cursor-pointer bg-white hover:bg-gray-100/70 border border-gray-300 rounded-md p-2 ${
          error ? 'border-red-600' : ''
        }`}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <span
              key={option.id}
              className="bg-blue-200 rounded-md px-2 py-1 text-xs mr-2 font-medium"
            >
              {option.title}
            </span>
          ))
        ) : (
          <span className="font-medium">{placeholder}</span>
        )}
      </div>

      {/* Contenedor del dropdown */}
      <div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto z-10 shadow">
        <ul>
          {options.map((option) => (
            <li key={option.id}>
              <label className="flex items-center whitespace-nowrap w-[16.5rem] lg:w-[30rem] cursor-pointer p-2 transition-colors hover:bg-blue-100/50 [&:has(input:checked)]:bg-blue-200">
                <input
                  type="checkbox"
                  name={name}
                  value={option.id}
                  checked={selectedOptions.some(
                    (selectedOption) => selectedOption.id === option.id
                  )} // Controlar selección
                  onChange={handleCheckboxChange} // Manejar cambios
                  className="cursor-pointer"
                />
                <span className="ml-2 font-normal">{option.title}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </label>
  );
}
