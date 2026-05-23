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
      setLogs(data);
    } catch (error) {
      setLogs([]);
    }
  };

  useEffect(() => {
    refreshLogs();
  }, []);

  return (
    <main className="min-h-screen flex flex-col p-4 md:p-8 bg-forge-black text-saga-cream">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 mt-4">
        <h1 className="text-3xl font-syne text-viking-red uppercase tracking-wide border-b-2 border-shield-gray pb-4">
          Control de Glucemia
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-forge-black p-6 border-2 border-shield-gray rounded-none">
            <h2 className="text-xl font-syne mb-6 text-saga-cream">Nuevo Registro</h2>
            <GlucoseLogger onSuccess={refreshLogs} />
          </section>
          <section className="bg-forge-black p-6 border-2 border-shield-gray rounded-none flex flex-col gap-6">
            <h2 className="text-xl font-syne text-saga-cream">Historial</h2>
            <GlucoseHistory logs={logs} />
          </section>
        </div>
      </div>
    </main>
  );
}
