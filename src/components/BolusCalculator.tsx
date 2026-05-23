"use client";

import { useState } from 'react';
import { calculateBolus } from '@/services/api';

export default function BolusCalculator() {
  const [currentGlucose, setCurrentGlucose] = useState<number | ''>('');
  const [carbs, setCarbs] = useState<number | ''>('');
  const [bolusResult, setBolusResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      currentGlucose === '' ||
      carbs === '' ||
      currentGlucose === null ||
      carbs === null ||
      isNaN(currentGlucose as number) ||
      isNaN(carbs as number)
    ) return;

    setIsCalculating(true);
    try {
      const data = await calculateBolus({
        userId: '11111111-1111-1111-1111-111111111111',
        currentGlucose: currentGlucose as number,
        targetCarbs: carbs as number,
      });
      setBolusResult(data.bolus);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-black p-6 border border-[#3D3D3D] rounded-none">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="current-glucose" className="eyebrow text-gray-500">
            Glucemia Actual (mg/dL)
          </label>
          <input
            id="current-glucose"
            type="number"
            value={currentGlucose}
            onChange={(e) => setCurrentGlucose(e.target.value === '' ? '' : Number(e.target.value))}
            required
            min="20"
            max="600"
            className="bg-black text-white border border-[#3D3D3D] rounded-none px-4 py-2.5 outline-none focus:border-[var(--accent)] transition-colors w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="carbs" className="eyebrow text-gray-500">
            Carbohidratos a Ingerir (g)
          </label>
          <input
            id="carbs"
            type="number"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value === '' ? '' : Number(e.target.value))}
            required
            min="0"
            className="bg-black text-white border border-[#3D3D3D] rounded-none px-4 py-2.5 outline-none focus:border-[var(--accent)] transition-colors w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isCalculating || currentGlucose === '' || carbs === ''}
          className="mt-2 bg-black text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors w-full py-3 rounded-none font-bold uppercase tracking-widest disabled:opacity-50"
        >
          {isCalculating ? 'CALCULANDO...' : 'CALCULAR DOSIS'}
        </button>
      </form>

      {bolusResult !== null && (
        <div className="mt-4 bg-black border border-[#3D3D3D] p-6 rounded-none flex flex-col gap-2">
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">01 - RECOMENDACIONES</span>
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-white font-bold text-lg">DOSIS RECOMENDADA</h3>
            <p className="text-[#D4AF37] text-5xl font-mono font-bold">
              {bolusResult} <span className="text-2xl text-gray-500">U</span>
            </p>
          </div>
          <p className="text-gray-500 text-sm mt-4 leading-relaxed">
            Esta es una dosis matemática sugerida basada en tus factores de sensibilidad e ICR. <br/>
            Siempre revisa tu contexto general antes de aplicar la inyección.
          </p>
        </div>
      )}
    </div>
  );
}
