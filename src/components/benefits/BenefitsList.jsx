import { useEffect, useState } from "react";
import BenefitCard from "./BenefitCard";
import BenefitModal from "./BenefitModal";

export default function BenefitsList() {
  const [benefits, setBenefits] = useState([]);
  const [filteredBenefits, setFilteredBenefits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [localities, setLocalities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchBenefits();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedLocality, selectedCategory, benefits]);

  const fetchBenefits = async () => {
    setLoading(true);
    const response = await fetch("/benefits_list.json");
    const data = await response.json();
    setBenefits(data);
    setFilteredBenefits(data);

    // Extraer localidades y categorías únicas
    const uniqueLocalities = Array.from(new Set(data.map((b) => b.locality)));
    const uniqueCategories = Array.from(new Set(data.map((b) => b.category)));
    setLocalities(uniqueLocalities);
    setCategories(uniqueCategories);

    setLoading(false);
  };

  const applyFilters = () => {
    const filtered = benefits.filter((benefit) => {
      const matchesLocality =
        selectedLocality === "" || benefit.locality === selectedLocality;
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
            <option key={locality} value={locality}>
              {locality}
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
        {loading && <p>Loading...</p>}
        {!loading &&
          filteredBenefits.map((benefit) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              onSelect={handleSelect}
            />
          ))}
      </div>

      {/* Modal */}
      {selectedBenefit && (
        <BenefitModal benefit={selectedBenefit} onClose={handleClose} isOpen={isOpen} />
      )}
    </>
  );
}