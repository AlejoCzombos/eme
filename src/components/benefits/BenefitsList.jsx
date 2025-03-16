import { useEffect, useState } from "react";
import BenefitCard from "./BenefitCard";
import BenefitModal from "./BenefitModal";
import Loader from "../UI/Loader";
import EmptyState from "../UI/EmptyState";
import Dropdown from "../UI/Dropdown";
import { fetchBenefits as fetchBenefitsAPI } from "../../api/benefits";

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
    const data = await fetchBenefitsAPI();
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 max-w-3xl mx-auto pb-8">
        <Dropdown
          label="Seleccionar localidad"
          options={localities}
          value={selectedLocality}
          onChange={setSelectedLocality}
          placeholder="Todas las localidades"
          />
        <Dropdown
          label="Seleccionar categoría"
          options={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Todas las categorías"
          />
      </div>

      {/* Listado de beneficios */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (

          filteredBenefits.length === 0 ? (
            <div className="col-span-full flex items-center justify-center h-full">
              <EmptyState text={"Pronto tendremos más beneficios."} />
          </div>
          ) :
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