export default function BenefitCard({ benefit, onSelect }) {
  return (
    <div 
    onClick={() => onSelect(benefit)}
    className="mx-auto bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm md:max-w-xl hover:shadow-2xl hover:transform hover:scale-105 duration-300 transition-all cursor-pointer">
      <div className="flex justify-center items-center px-4 pt-4">
        <img 
          src={benefit.imagen_url}
          alt={benefit.title}
          className="object-contain h-full rounded-xl w-full max-w-full aspect-square" 
        />
      </div>

      <div className="p-4">
        <span className="block text-sm text-gray-500">{benefit.category}</span>
        <h2 className="font-semibold text-start text-base lg:text-lg text-gray-700">{benefit.title}</h2>
        <p className="mt-2 text-lg lg:text-xl font-bold text-gray-800">{benefit.text_discount ? benefit.text_discount : benefit.discount + " % off"}</p>
        <p className="mt-2 text-sm text-gray-500 line-clamp-5">{benefit.description}</p>
      </div>
    </div>
  )
}