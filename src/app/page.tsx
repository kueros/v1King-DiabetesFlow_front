import { Suspense } from 'react';
import GlucoseForm from '@/components/GlucoseForm';
import GlucoseHistory from '@/components/GlucoseHistory';
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <main className="min-h-screen flex justify-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard de Glucemia</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Nuevo Registro</h2>
            <GlucoseForm />
          </section>
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Historial</h2>
            <Suspense fallback={<p className="text-gray-500 text-sm">Cargando historial...</p>}>
              <GlucoseHistory />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}
