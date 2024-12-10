import ReactDOM from "react-dom";
import { useState } from "react";

export default function SelectableFeatures({ features }) {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleSelect = (feature) => {
    setSelectedFeature(feature);
  };

  const handleClose = () => {
    setSelectedFeature(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center content-center p-10">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => handleSelect(feature)}
            className="flex flex-col items-center w-full max-w-[10.8rem] gap-4 group cursor-pointer"
          >
            <div className="size-28 bg-gray-200 rounded-full p-5 group-hover:-translate-y-5 transition-transform duration-300 ease-in-out">
              <img
                className=""
                src={feature.icon.src}
                alt={feature.icon.alt}
              />
            </div>
            <p className="text-center font-semibold text-sm lg:text-base group-hover:scale-105 transition-transform duration-300 ease-in-out">
              {feature.title.toLocaleUpperCase()}
            </p>
          </div>
        ))}
      </div>

      {selectedFeature && (
        <FeatureModal feature={selectedFeature} onClose={handleClose} />
      )}
    </>
  );
}

function FeatureModal({ feature, onClose }) {
   return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm transition-all"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-xl w-[90%] max-w-3xl p-6 lg:p-12 relative flex flex-col gap-2 lg:gap-4"
      >
        <button
          onClick={onClose}
          className="size-8 lg:size-10 absolute top-5 right-5 transition hover:scale-125 md:size-6 rotate-45 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
        </button>
        <h2 className="font-semibold text-center max-w-60 lg:max-w-md mx-auto">{feature.title.toLocaleUpperCase()}</h2>
        <p className="text-gray-600 mt-2">{feature.description}</p>
      </div>
    </div>,
    document.getElementById("modal-feature-root")
  );
}