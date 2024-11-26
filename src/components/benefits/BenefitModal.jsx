import ReactDOM from "react-dom";

export default function BenefitModal({ benefit, onClose, isOpen }) {
    console.log(benefit);
  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center z-30 backdrop-blur-sm transition-colors duration-300 ${isOpen ? "visible bg-black/40" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl shadow-xl w-[90%] max-w-2xl p-6 relative ${isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <button
          onClick={onClose}
          className="size-20 absolute top-4 right-4 transition hover:scale-125 md:size-6 rotate-45 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
        </button>
        <div className="flex flex-wrap items-center justify-start gap-12">
          <img
            src={benefit.image}
            alt={benefit.title}
            className="max-h-64 object-contain h-full max-w-md rounded-2xl"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-gray-700">{benefit.title}</h2>
            <p className="mt-2 text-gray-500">{benefit.category}</p>
            <p className="mt-4 text-xl font-bold text-gray-800">
                {benefit.discount + " % off"}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
