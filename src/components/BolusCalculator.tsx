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
    <div className="flex flex-col gap-6 bg-forge-black p-6 border-2 border-shield-gray rounded-none">
      <h2 className="text-xl font-syne text-saga-cream mb-2">Calculadora de Bolos</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="current-glucose" className="text-sm font-space text-saga-cream">
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
            className="bg-forge-black text-saga-cream border-2 border-shield-gray rounded-none px-4 py-2.5 outline-none focus:border-viking-red transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="carbs" className="text-sm font-space text-saga-cream">
            Carbohidratos a Ingerir (g)
          </label>
          <input
            id="carbs"
            type="number"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value === '' ? '' : Number(e.target.value))}
            required
            min="0"
            className="bg-forge-black text-saga-cream border-2 border-shield-gray rounded-none px-4 py-2.5 outline-none focus:border-viking-red transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isCalculating || currentGlucose === '' || carbs === ''}
          className="mt-2 bg-viking-red font-space text-saga-cream py-2.5 px-4 rounded-none border-2 border-viking-red hover:bg-forge-black hover:text-viking-red transition-colors disabled:opacity-50"
        >
          {isCalculating ? 'CALCULANDO...' : 'CALCULAR DOSIS'}
        </button>
      </form>

      {bolusResult !== null && (
        <div className="mt-4 border-2 border-shield-gray p-6 text-center">
          <h3 className="font-space text-saga-cream mb-2 tracking-widest uppercase">Dosis Recomendada</h3>
          <p className="font-mono text-viking-red text-4xl">
            {bolusResult} <span className="text-2xl font-space text-shield-gray">U</span>
          </p>
        </div>
      )}
    </div>
  );
}
