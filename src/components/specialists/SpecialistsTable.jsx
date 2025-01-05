export default function SpecialistsTable({ specialists }) {
  return (
    <div className="overflow-x-auto py-6 animate-fade-down animate-delay-300 animate-duration-500 animate-ease-in-out">
      <table className="min-w-full border-collapse border border-gray-100">
        <thead>
          <tr className="bg-[#00837F] text-white shadow-lg text-xl">
            <th className="border border-gray-100 px-4 py-2 text-start">Especialidad</th>
            <th className="border border-gray-100 px-4 py-2 text-start">Nombre</th>
            <th className="border border-gray-100 px-4 py-2 text-start">Matrícula</th>
            <th className="border border-gray-100 px-4 py-2 text-start">Días de atención</th>
            <th className="border border-gray-100 px-4 py-2 text-start">Sucursal</th>
          </tr>
        </thead>
        <tbody>
          {specialists.map((specialist, index) => (
            <tr
              key={specialist.id}
              className={index % 2 === 0 ? "bg-[#44E5E1]/10 text-lg" : "bg-white text-lg"}
            >
              <td className="border border-gray-100 px-4 py-2">{specialist.specialty}</td>
              <td className="border border-gray-100 px-4 py-2">{specialist.name}</td>
              <td className="border border-gray-100 px-4 py-2">{specialist.license}</td>
              <td className="border border-gray-100 px-4 py-2">{specialist.days.join(', ')}</td>
              <td className="border border-gray-100 px-4 py-2">{specialist.locality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
