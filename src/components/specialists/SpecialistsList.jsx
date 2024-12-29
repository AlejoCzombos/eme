import { useEffect, useState } from "react";
import Loader from "../UI/Loader";
import SpecialistsTable from "./SpecialistsTable";
import Dropdown from "../UI/Dropdown";
import EmptyState from "../UI/EmptyState";
import { fetchSpecialists as fetchSpecialistsAPI } from "../../api/specialists";

export default function SpecialistsList({ data }) {
  const [specialists, setSpecialists] = useState([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const localities = [
    { id: 1, name: "Resistencia" },
    { id: 2, name: "Corrientes" },
    { id: 3, name: "Sáenz Peña" },
  ];

  useEffect(() => {
    fetchSpecialists();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedLocality, selectedSpecialty, specialists]);

  const fetchSpecialists = async () => {
    setLoading(true);
    const data = await fetchSpecialistsAPI();
    setSpecialists(data);
    setFilteredSpecialists(data);

    // Extraer categorías únicas
    const uniqueSpecialties = Array.from(new Set(data.map((b) => b.specialty)));
    setSpecialties(uniqueSpecialties);

    setLoading(false);
  };

  const applyFilters = () => {
    const filtered = specialists.filter((specialist) => {
      const matchesLocality =
        selectedLocality === "" || specialist.locality == localities[selectedLocality - 1].name;
      const matchesSpecialty =
        selectedSpecialty === "" || specialist.specialty === selectedSpecialty;
      return matchesLocality && matchesSpecialty;
    });
    setFilteredSpecialists(filtered);
  };

  return (
    <section className="px-5 py-12 lg:px-0 lg:py-16 max-w-6xl m-auto">
      <h2 class="text-[#505050] pb-10">{data.title}</h2>
        <div className="grid grid-cols-2 pb-8">
            <div className="flex flex-col gap-8">
                <div className="bg-primary-600 rounded-2xl p-2 px-4 flex items-center gap-10">
                    <img src={data.subtitle.icon.src} alt={data.subtitle.icon.alt} className="size-10" />
                    <h3 className="text-white text-2xl">{data.subtitle.text}</h3>
                </div>
                <div className="px-4 grid grid-cols-2 gap-4 lg:gap-8">
                    <Dropdown
                    label="Seleccionar localidad"
                    options={localities}
                    value={selectedLocality}
                    onChange={setSelectedLocality}
                    placeholder="Todas las localidades"
                    />
                    <Dropdown
                    label="Seleccionar especialidad"
                    options={specialties}
                    value={selectedSpecialty}
                    onChange={setSelectedSpecialty}
                    placeholder="Todas las especialidades"
                    />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <img src={data.logo.src} alt={data.logo.alt} className="object-contain max-h-40" />
            </div>
        </div>

      {/* Tabla de especialistas */}
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : (
        filteredSpecialists.length === 0 ? (
          <EmptyState text={"Pronto podrás ver los horarios de nuestros especialistas."} />
        ) : (
          <SpecialistsTable specialists={filteredSpecialists} />
        )
      )}
    </section>
  );
}
