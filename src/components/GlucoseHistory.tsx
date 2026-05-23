export interface GlucoseLog {
  id?: string;
  userId?: string;
  level: number;
  measuredAt?: string;
  context?: string;
}

export default function GlucoseHistory({ logs }: { logs: GlucoseLog[] }) {
  console.log("Logs recibidos:", logs);

  return (
    <div className="flex flex-col gap-4">
      {!logs || logs.length === 0 ? (
        <div className="bg-forge-black border-2 border-shield-gray rounded-none p-4 text-center">
          <p className="font-space text-saga-cream text-sm uppercase tracking-widest">Sin registros de glucemia aún</p>
        </div>
      ) : (
        logs.map((log, index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-forge-black border-2 border-shield-gray rounded-none">
            <div className="flex flex-col gap-1">
              <span className="text-xl font-mono text-viking-red">
                {log.level} <span className="text-sm font-space text-shield-gray">mg/dL</span>
              </span>
              <span className="text-sm font-inter text-saga-cream">{log.context || 'Sin contexto'}</span>
            </div>
            <span className="text-xs font-space text-shield-gray uppercase">
              {log.measuredAt ? new Date(log.measuredAt).toLocaleString('es-AR') : 'FECHA DESCONOCIDA'}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
