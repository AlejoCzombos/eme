import { useState } from "react";
import { contact } from '../../data/home.json';

export default function GoogleMapComponent({ branches }) {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const handleSelectChange = (e) => {
    const branch = branches.find((b) => b.id === parseInt(e.target.value));
    setSelectedBranch(branch);
  };

  return (
    <div>
      <header className="flex flex-wrap justify-between px-0 xl:px-16 items-center h-32 xl:h-20">
        <h2 className="w-full xl:w-auto">{contact.map.title.toLocaleUpperCase()}</h2>
        <span className="w-full xl:w-auto">
          <label htmlFor="branchSelect" className="block font-normal text-sm text-slate-600">Seleccionar Localidad</label>
          <select id="branchSelect" onChange={handleSelectChange} className="mb-4 p-2 border font-normal text-slate-600 border-gray-300 rounded min-w-72 w-full">
            {
              branches.map((branch) => (
                <option key={branch.id} value={branch.id}>{branch.location}</option>
              ))
            }
          </select>
        </span>
      </header>
      <footer className="min-h-[30rem] h-full relative pb-36 lg:pb-20">
        <iframe
          src={selectedBranch.mapUrl}
          title={"Mapa de " + selectedBranch.location}
          loading="lazy"
          width="100%"
          height="100%"
          allowFullScreen
          className="border h-full w-full block"
        ></iframe>
      </footer>
    </div>
  );
};