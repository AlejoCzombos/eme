export default function MultiSelectDropdown({
  formFieldName,
  options,
  placeholder,
  selectedOptions,
  onChange,
}) {
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
      <input type="checkbox" className="hidden peer" />

      {/* Botón para abrir/cerrar el dropdown */}
      <div className="cursor-pointer bg-white hover:bg-gray-100/40 border border-zinc-300 rounded-md py-3 px-6 text-zinc-200">
        {placeholder}
      </div>

      {/* Contenedor del dropdown */}
      <div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto z-10 shadow">
        <ul>
          {options.map((option) => (
            <li key={option}>
              <label className="flex items-center whitespace-nowrap w-[16.5rem] lg:w-[31rem] cursor-pointer p-2 transition-colors hover:bg-blue-100/50 [&:has(input:checked)]:bg-blue-200">
                <input
                  type="checkbox"
                  name={formFieldName}
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
    </label>
  );
}
