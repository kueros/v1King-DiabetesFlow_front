import FoodManager from '@/components/FoodManager';

export default function FoodPage() {
  return (
    <main className="min-h-screen flex justify-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Alimentación</h1>
        <FoodManager />
      </div>
    </main>
  );
}
