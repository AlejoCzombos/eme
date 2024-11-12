import { useState } from "react";
import { contact } from '../../data/home.json';

const GoogleMapComponent = ({ branches }) => {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const handleSelectChange = (e) => {
    const branch = branches.find((b) => b.id === parseInt(e.target.value));
    setSelectedBranch(branch);
  };

  return (
    <div className="mi-h-[10rem] h-full">
      <header className="flex justify-between px-16 items-center h-20">
        <h1 class="text-2xl">{contact.map.title.toLocaleUpperCase()}</h1>
        <span>
          <label htmlFor="branchSelect" className="block font-normal text-sm text-slate-400">Seleccionar Localidad</label>
          <select id="branchSelect" onChange={handleSelectChange} className="mb-4 p-2 border font-normal text-slate-600 border-gray-300 rounded min-w-60 w-full">
            {
              branches.map((branch) => (
                <option key={branch.id} value={branch.id}>{branch.location}</option>
              ))
            }
          </select>
        </span>
      </header>

      <iframe
        src={selectedBranch.mapUrl}
        width="100%"
        allowFullScreen
        loading="lazy"
        className="border rounded min-h-96"
      ></iframe>
    </div>
  );
};

export default GoogleMapComponent;