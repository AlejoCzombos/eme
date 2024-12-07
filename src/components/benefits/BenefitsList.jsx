import { useEffect, useState } from "react";
import BenefitCard from "./BenefitCard";
import BenefitModal from "./BenefitModal";
import Loader from "../UI/Loader";

export default function BenefitsList() {
  const [benefits, setBenefits] = useState([]);
  const [filteredBenefits, setFilteredBenefits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const localities = [
    { id: 1, name: "Resistencia" },
    { id: 2, name: "Corrientes" },
    { id: 3, name: "Sáenz Peña" },
  ];

  useEffect(() => {
    fetchBenefits();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedLocality, selectedCategory, benefits]);

  const fetchBenefits = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:7000/api/beneficios");
    const data = await response.json();
    setBenefits(data);
    setFilteredBenefits(data);

    // Extraer categorías únicas
    const uniqueCategories = Array.from(new Set(data.map((b) => b.category)));
    setCategories(uniqueCategories);

    setLoading(false);
  };

  const applyFilters = () => {
    const filtered = benefits.filter((benefit) => {

      const matchesLocality =
        selectedLocality === "" || benefit.locality == selectedLocality;
      const matchesCategory =
        selectedCategory === "" || benefit.category === selectedCategory;
      return matchesLocality && matchesCategory;
    });
    setFilteredBenefits(filtered);
  };

  const handleSelect = (benefit) => {
    setSelectedBenefit(benefit);
  };

  const handleClose = () => {
    setSelectedBenefit(null);
  };

  const isOpen = () => {
    return selectedBenefit !== null;
  }

  return (
    <>
      {/* Formulario de búsqueda */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 lg:gap-8 max-w-3xl mx-auto">
        <select
          value={selectedLocality}
          onChange={(e) => setSelectedLocality(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/2 bg-white"
        >
          <option value="">Todas las localidades</option>
          {localities.map((locality) => (
            <option key={locality.id} value={locality.id}>
              {locality.name}
            </option>
          ))}
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/2 bg-white"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Listado de beneficios */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (
          filteredBenefits.map((benefit) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              onSelect={handleSelect}
            />
          ))
        )}
      </div>

      {/* Modal */}
      {selectedBenefit && (
        <BenefitModal benefit={selectedBenefit} onClose={handleClose} isOpen={isOpen} />
      )}
    </>
  );
}