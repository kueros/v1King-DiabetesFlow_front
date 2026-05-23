"use client";

import { useState } from 'react';
import { createGlucoseLog } from '@/services/api';

export default function GlucoseForm() {
  const [level, setLevel] = useState<string>('');
  const [context, setContext] = useState<string>('Ayunas');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!level) return;

    setIsSubmitting(true);
    try {
      await createGlucoseLog({
        userId: '11111111-1111-1111-1111-111111111111',
        glucose: Number(level),
        notes: context
      });
      setLevel('');
      setContext('Ayunas');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="glucose-level" className="text-sm font-medium text-gray-700">
          Nivel de Glucosa (mg/dL)
        </label>
        <input
          id="glucose-level"
          type="number"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
          min="20"
          max="600"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Ej: 110"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="context" className="text-sm font-medium text-gray-700">
          Contexto
        </label>
        <select
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
        >
          <option value="Ayunas">Ayunas</option>
          <option value="Post-prandial">Post-prandial</option>
          <option value="Antes de dormir">Antes de dormir</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !level}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Guardando...' : 'Registrar'}
      </button>
    </form>
  );
}
