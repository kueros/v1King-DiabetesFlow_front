import BolusCalculator from '@/components/BolusCalculator';

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-black p-6 md:p-12 font-syne">
      <div className="max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p className="text-[#C41E3A] uppercase tracking-widest text-sm font-bold mb-2">
          CAPÍTULO II - CALCULADORA
        </p>

        {/* Título Principal */}
        <h1 className="text-white text-4xl font-bold mb-4">
          Calculadora
        </h1>

        {/* Bajada / Deck */}
        <p className="text-[#3D3D3D] text-lg mb-10 max-w-2xl leading-relaxed">
          El motor de cálculo cruza tu nivel de glucemia actual con la carga de carbohidratos 
          proyectada para determinar la dosis exacta de insulina requerida.
        </p>

        {/* Inyección del componente (donde está el resto de la UI que hizo agy) */}
        <BolusCalculator />
      </div>
    </div>
  );
}