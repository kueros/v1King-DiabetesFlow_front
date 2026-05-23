import Link from 'next/link';

export function Brandmark() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-syne text-xl font-bold tracking-tight text-white">
        v1King <span className="text-[#C41E3A]">DiabetesFlow</span>
      </span>
    </div>
  );
}

export function StatusStrip() {
  return (
    <div className="w-full bg-[#0E0E0E] border-y border-[#3D3D3D] py-2">
      <div className="shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs font-mono text-[#F5F1E8]">
        <div className="flex gap-6">
          <span className="status-strip">Última Glucemia: <span className="text-[#C41E3A] font-bold">110 mg/dL</span></span>
          <span className="status-strip">Insulina Activa: <span className="text-[#D4AF37] font-bold">1.5u</span></span>
        </div>
        <div className="text-[#D4AF37] hidden sm:block">
          23 MAY 2026 | 12:00
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <>
      <header className="bg-[#1A1A1A]">
        <div className="shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Brandmark />
            <nav className="flex space-x-4">
              <Link href="/" className="text-[#F5F1E8] hover:text-[#C41E3A] px-3 py-2 text-sm font-space uppercase tracking-widest font-bold transition-colors">
                Dashboard
              </Link>
              <Link href="/calculator" className="text-[#F5F1E8] hover:text-[#C41E3A] px-3 py-2 text-sm font-space uppercase tracking-widest font-bold transition-colors">
                Calculadora
              </Link>
              <Link href="/food" className="text-[#F5F1E8] hover:text-[#C41E3A] px-3 py-2 text-sm font-space uppercase tracking-widest font-bold transition-colors">
                Alimentación
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <StatusStrip />
    </>
  );
}
