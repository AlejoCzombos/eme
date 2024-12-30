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

  const customValidation = (value) => {
    if (!selectedOptions.length > 0) {
      return "Seleccione al menos una opción";
    }
  }

  // Manejamos el cambio de los checkboxes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      onChange([...selectedOptions, value]); // Agregar opción seleccionada
    } else {
      onChange(selectedOptions.filter((option) => option !== value)); // Eliminar opción deseleccionada
    }
  };

  return (
    <label className="relative w-full">
      {/* Checkbox oculto para controlar el dropdown */}
      <input type="checkbox" className="hidden peer" {...register(name, { validate: customValidation })} />

      {/* Botón para abrir/cerrar el dropdown */}
      <div className={`cursor-pointer bg-white hover:bg-gray-100/70 border border-gray-300 rounded-md p-2 ${error ? 'border-red-600' : ''}`}>
        {placeholder}
      </div>

      {/* Contenedor del dropdown */}
      <div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto z-10 shadow">
        <ul>
          {options.map((option) => (
            <li key={option}>
              <label className="flex items-center whitespace-nowrap w-[16.5rem] lg:w-[30rem] cursor-pointer p-2 transition-colors hover:bg-blue-100/50 [&:has(input:checked)]:bg-blue-200">
                <input
                  type="checkbox"
                  name={name}
                  value={option}
                  checked={selectedOptions.includes(option)} // Controlar selección
                  onChange={handleCheckboxChange} // Manejar cambios
                  className="cursor-pointer"
                />
                <span className="ml-2 font-normal">{option}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </label>
  );
}
