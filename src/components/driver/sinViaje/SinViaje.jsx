export default function SinViaje() {
  return (
    <div className="relative bg-[var(--color-primary)] m-8 flex items-center justify-center w-[700px] h-[300px] rounded-lg shadow-lg shadow-[var(--color-quaternary)]">
        <h3 className="text-4xl font-bold text-[var(--color-secondary)] text-center">
            SIN VIAJE<br/>ASIGNADO
        </h3>
        <div className="absolute inset-6 rounded-lg border-4 text-[var(--color-secondary)] pointer-events-none"></div>
    </div>
  )
}
