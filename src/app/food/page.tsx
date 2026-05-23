import MealTracker from '@/components/FoodManager'; // Ajustá el nombre de tu componente si es distinto

export default function FoodPage() {
  return (
    <div className="min-h-screen bg-black p-6 md:p-12 font-syne">
      <div className="max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p className="text-[#C41E3A] uppercase tracking-widest text-sm font-bold mb-2">
          CAPÍTULO III - ALIMENTACIÓN
        </p>

        {/* Título Principal */}
        <h1 className="text-white text-4xl font-bold mb-4">
          Registro de Ingesta
        </h1>

        {/* Bajada / Deck */}
        <p className="text-[#3D3D3D] text-lg mb-10 max-w-2xl leading-relaxed">
          Documentá tu carga de carbohidratos. Estos datos alimentan el motor 
          de cálculo para mantener tu glucemia en rango objetivo.
        </p>

        {/* Inyección del componente de comidas */}
        <MealTracker />
      </div>
    </div>
  );
}