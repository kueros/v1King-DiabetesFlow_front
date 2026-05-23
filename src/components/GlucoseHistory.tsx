import { getGlucoseLogs } from '@/services/api';

export default async function GlucoseHistory() {
  const logs = await getGlucoseLogs('11111111-1111-1111-1111-111111111111');

  return (
    <div className="flex flex-col gap-3">
      {logs.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay registros aún.</p>
      ) : (
        logs.map((log, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">
                {log.glucose} <span className="text-sm font-normal text-gray-500">mg/dL</span>
              </span>
              <span className="text-sm text-gray-600">{log.notes || 'Sin contexto'}</span>
            </div>
            <span className="text-xs text-gray-400">
              {log.measuredAt ? new Date(log.measuredAt).toLocaleString('es-AR') : 'Fecha desconocida'}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
