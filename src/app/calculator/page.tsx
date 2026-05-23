import BolusCalculator from '@/components/BolusCalculator';

export default function CalculatorPage() {
  return (
    <main className="bg-forge-black text-saga-cream container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <BolusCalculator />
      </div>
    </main>
  );
}
