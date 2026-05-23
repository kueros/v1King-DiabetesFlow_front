export interface GlucoseLog {
  id?: string;
  userId?: string;
  level: number;
  timestamp?: string;
  context?: string;
}

export default function GlucoseHistory({ logs }: { logs: GlucoseLog[] }) {
  console.log("Logs recibidos:", logs);

  return (
    <div className="flex flex-col gap-4">
      {!logs || logs.length === 0 ? (
        <div className="text-center py-4">
          <p className="eyebrow">Sin registros de glucemia aún</p>
        </div>
      ) : (
        logs.map((log, index) => (
          <div key={index} className="flex justify-between items-center py-4 border-b border-[#3D3D3D] last:border-0">
            <div className="flex flex-col gap-1">
              <span className="text-white font-mono text-sm uppercase">
                {log.timestamp ? new Date(log.timestamp).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' }) : 'FECHA DESCONOCIDA'}
              </span>
              <span className="text-gray-500 text-sm uppercase tracking-wider">{log.context}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-mono text-2xl font-bold">{log.level}</span>
              <span className="text-gray-500 font-mono text-sm">mg/dL</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
