import ActivityManager from '@/components/ActivityManager';

export default function ActivitiesPage() {
  return (
    <main className="bg-forge-black text-saga-cream container mx-auto p-4 md:p-8 min-h-screen flex flex-col">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 mt-4">
        <h1 className="text-3xl font-syne text-viking-red uppercase tracking-wide border-b-2 border-shield-gray pb-4">
          Gestión de Actividad Física
        </h1>
        <ActivityManager />
      </div>
    </main>
  );
}
