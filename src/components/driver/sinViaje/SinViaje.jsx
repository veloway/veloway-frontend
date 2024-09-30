export default function SinViaje() {
  return (
    <div className="relative bg-[var(--color-quaternary)] m-8 flex items-center justify-center w-[700px] h-[300px] rounded-3xl ">
        <h3 className="text-4xl font-bold text-gray-800">
            SIN VIAJE ASIGNADO
        </h3>
        <div className="absolute inset-6 rounded-2xl border-4 border-gray-800 pointer-events-none"></div>
    </div>
  )
}
