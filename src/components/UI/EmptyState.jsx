export default function EmptyState({ className, text }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 max-w-xs mx-auto py-6">
        <img src="/icons/estado_vacio.svg" alt="Estado vacío" className={className} />
        <p className='text-primary-600 text-center text-2xl font-bold max-w-60'>¡Estamos acá para cuidarte!</p>
        <span className="border-b border-primary-600 mb-2 w-full max-w-60"></span>
        <p className='text-start text-lg font-bold max-w-60'>{text}</p>
    </div>
  )
}