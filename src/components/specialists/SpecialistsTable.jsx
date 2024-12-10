export default function SpecialistsTable({ specialists }) {
  console.log(specialists);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-primary-700 text-white">
            <th className="border border-gray-200 px-4 py-2 text-start">Especialidad</th>
            <th className="border border-gray-200 px-4 py-2 text-start">Nombre</th>
            <th className="border border-gray-200 px-4 py-2 text-start">Matrícula</th>
            <th className="border border-gray-200 px-4 py-2 text-start">Días de atención</th>
            <th className="border border-gray-200 px-4 py-2 text-start">Sucursal</th>
          </tr>
        </thead>
        <tbody>
          {specialists.map((specialist, index) => (
            <tr
              key={specialist.id}
              className={index % 2 === 0 ? "bg-primary-100/60" : "bg-white"}
            >
              <td className="border border-gray-200 px-4 py-2">{specialist.specialty}</td>
              <td className="border border-gray-200 px-4 py-2">{specialist.name}</td>
              <td className="border border-gray-200 px-4 py-2">{specialist.license}</td>
              <td className="border border-gray-200 px-4 py-2">{specialist.days.join(', ')}</td>
              <td className="border border-gray-200 px-4 py-2">{specialist.locality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
