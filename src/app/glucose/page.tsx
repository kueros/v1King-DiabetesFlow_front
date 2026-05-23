"use client";

import { useState, useEffect } from 'react';
import GlucoseLogger from '@/components/GlucoseLogger';
import GlucoseHistory, { GlucoseLog } from '@/components/GlucoseHistory';
import { getGlucoseLogs } from '@/services/api';

export default function GlucosePage() {
  const [logs, setLogs] = useState<GlucoseLog[]>([]);

  const refreshLogs = async () => {
    try {
      const data = await getGlucoseLogs('11111111-1111-1111-1111-111111111111');
      setLogs(data as GlucoseLog[]);
    } catch (error) {
      setLogs([]);
    }
  };

  useEffect(() => {
    refreshLogs();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 mb-4 border-b border-[#3D3D3D] pb-6">
        <span className="eyebrow text-[var(--accent)]">CAPÍTULO I - DASHBOARD</span>
        <h1 className="text-4xl font-bold section-title">
          Control de Glucemia
        </h1>
        <p className="text-white max-w-2xl mt-2 leading-relaxed">
          Registra tus niveles de glucosa y haz seguimiento de tus métricas clave. <br/>
          Mantén tu historial actualizado para ajustar los factores de corrección.
        </p>
      </div>
      <div className="base-grid">
        <section className="panel">
          <h2 className="eyebrow mb-6"><span className="text-gray-500 mr-2">S 01</span> <span className="text-white">Nuevo Registro</span></h2>
          <GlucoseLogger onSuccess={refreshLogs} />
        </section>
        <section className="panel flex flex-col gap-6">
          <h2 className="eyebrow"><span className="text-gray-500 mr-2">S 02</span> <span className="text-white">Historial</span></h2>
          <GlucoseHistory logs={logs} />
        </section>
      </div>
    </div>
  );
}
