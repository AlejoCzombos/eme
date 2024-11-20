export default function BenefitCard({ benefit }) {
  return (
    <div className=" mx-auto bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm md:max-w-xl hover:shadow-2xl hover:transform hover:scale-105 duration-300 transition-all">
      <div className="flex justify-center items-center px-4 pt-4">
        <img 
          src={benefit.image} 
          alt={benefit.title} 
          className="object-contain h-full w-full max-w-full" 
        />
      </div>

      <div className="p-4">
        <span className="block text-sm text-gray-500">{benefit.category}</span>
        <h2 className="font-semibold text-lg text-gray-700">{benefit.title}</h2>
        <p className="mt-2 text-xl font-bold text-gray-800">{benefit.discount + " %"}</p>
      </div>
    </div>
  )
}