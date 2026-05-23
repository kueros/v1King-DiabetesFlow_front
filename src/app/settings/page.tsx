'use client';
import { useState, useEffect } from 'react';
import { fetchSettings, saveSettings } from '@/services/settings.service';

export default function ConfigurationPage() {
  const [insulinSensitivity, setInsulinSensitivity] = useState(50);
  const [carbRatio, setCarbRatio] = useState(15);
  const [targetGlucose, setTargetGlucose] = useState(100);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings('user-1')
      .then((data) => {
        if (data) {
          if (data.insulinSensitivity !== undefined) setInsulinSensitivity(data.insulinSensitivity);
          if (data.carbRatio !== undefined) setCarbRatio(data.carbRatio);
          if (data.targetGlucose !== undefined) setTargetGlucose(data.targetGlucose);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveSettings('user-1', {
        insulinSensitivity: Number(insulinSensitivity),
        carbRatio: Number(carbRatio),
        targetGlucose: Number(targetGlucose),
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <span className="text-[#D4AF37] font-mono text-lg tracking-widest uppercase">CALIBRANDO INSTRUMENTOS...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 md:p-12 font-syne text-white">
      <div className="max-w-4xl mx-auto">

        <p className="text-[#C41E3A] uppercase tracking-widest text-sm font-bold mb-2">
          CAPÍTULO IV - CONFIGURACIÓN
        </p>

        <h1 className="text-white text-4xl font-bold mb-4">
          Parámetros Clínicos
        </h1>

        <p className="text-gray-400 text-lg mb-10 max-w-2xl leading-relaxed">
          Calibrá las métricas biológicas base que gobiernan el motor de dosificación. 
          Cualquier alteración modificará las propuestas de bolo de forma inmediata.
        </p>

        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-black border border-[#3D3D3D] p-6 rounded-none flex flex-col justify-between min-h-[320px]">
              <div>
                <span className="text-[#D4AF37] text-xs font-mono tracking-wider block mb-1">
                  01 - SENSIBILIDAD
                </span>
                <h3 className="text-white font-bold text-lg uppercase mb-3">
                  Factor FSI
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  Indica cuántos miligramos por decilitro (mg/dL) desciende tu glucemia por cada unidad de insulina rápida inyectada.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-[#D4AF37] text-4xl font-mono font-bold tracking-tight">
                  {insulinSensitivity} <span className="text-xs text-gray-400 font-sans">mg/dL</span>
                </div>
                <input 
                  type="number" 
                  value={insulinSensitivity}
                  onChange={(e) => setInsulinSensitivity(Number(e.target.value))}
                  className="w-full bg-black border border-[#3D3D3D] p-3 rounded-none text-white font-mono text-sm focus:outline-none focus:border-[#C41E3A] transition-colors"
                  placeholder="Ej. 50"
                />
              </div>
            </div>

            <div className="bg-black border border-[#3D3D3D] p-6 rounded-none flex flex-col justify-between min-h-[320px]">
              <div>
                <span className="text-[#D4AF37] text-xs font-mono tracking-wider block mb-1">
                  02 - RELACIÓN CARB
                </span>
                <h3 className="text-white font-bold text-lg uppercase mb-3">
                  Ratio CIR
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  Cuántos gramos de carbohidratos (g) es capaz de metabolizar o cubrir exactamente una sola unidad de tu insulina rápida.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-[#D4AF37] text-4xl font-mono font-bold tracking-tight">
                  {carbRatio} <span className="text-xs text-gray-400 font-sans">g / u</span>
                </div>
                <input 
                  type="number" 
                  value={carbRatio}
                  onChange={(e) => setCarbRatio(Number(e.target.value))}
                  className="w-full bg-black border border-[#3D3D3D] p-3 rounded-none text-white font-mono text-sm focus:outline-none focus:border-[#C41E3A] transition-colors"
                  placeholder="Ej. 15"
                />
              </div>
            </div>

            <div className="bg-black border border-[#3D3D3D] p-6 rounded-none flex flex-col justify-between min-h-[320px]">
              <div>
                <span className="text-[#D4AF37] text-xs font-mono tracking-wider block mb-1">
                  03 - OBJETIVO
                </span>
                <h3 className="text-white font-bold text-lg uppercase mb-3">
                  Target Base
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  El valor objetivo de glucosa en sangre al que el algoritmo intentará aproximarte al calcular el factor de corrección.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-[#D4AF37] text-4xl font-mono font-bold tracking-tight">
                  {targetGlucose} <span className="text-xs text-gray-400 font-sans">mg/dL</span>
                </div>
                <input 
                  type="number" 
                  value={targetGlucose}
                  onChange={(e) => setTargetGlucose(Number(e.target.value))}
                  className="w-full bg-black border border-[#3D3D3D] p-3 rounded-none text-white font-mono text-sm focus:outline-none focus:border-[#C41E3A] transition-colors"
                  placeholder="Ej. 100"
                />
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-black border border-[#C41E3A] text-[#C41E3A] px-10 py-4 uppercase font-bold tracking-widest text-xs rounded-none hover:bg-[#C41E3A] hover:text-white transition-colors duration-200"
            >
              Guardar Configuración
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}