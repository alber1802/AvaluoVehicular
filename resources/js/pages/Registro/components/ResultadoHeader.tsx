import { FileCheck2, Calendar, MapPin } from 'lucide-react';

interface ResultadoHeaderProps {
    entidad: string;
    fecha_evaluacion: string;
    ubicacion_actual: string;
}

export default function ResultadoHeader({ entidad, fecha_evaluacion, ubicacion_actual }: ResultadoHeaderProps) {
    return (
        <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#1e293b] dark:text-white/90">
                        Resultado de Evaluación
                    </h1>
                    <p className="mt-2 text-sm text-[#64748b] dark:text-white/70">
                        Detalles completos de la evaluación del vehículo
                    </p>
                </div>
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                    <FileCheck2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-start gap-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-[#20384b] dark:bg-[#0f1a23]">
                    <div className="rounded-md bg-blue-100 p-2 dark:bg-blue-900/30">
                        <FileCheck2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-[#64748b] dark:text-white/60">Entidad</p>
                        <p className="mt-1 text-sm font-semibold text-[#1e293b] dark:text-white/90">{entidad}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-[#20384b] dark:bg-[#0f1a23]">
                    <div className="rounded-md bg-purple-100 p-2 dark:bg-purple-900/30">
                        <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-[#64748b] dark:text-white/60">Fecha de Evaluación</p>
                        <p className="mt-1 text-sm font-semibold text-[#1e293b] dark:text-white/90">
                            {new Date(fecha_evaluacion).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-[#20384b] dark:bg-[#0f1a23]">
                    <div className="rounded-md bg-orange-100 p-2 dark:bg-orange-900/30">
                        <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-[#64748b] dark:text-white/60">Ubicación Actual</p>
                        <p className="mt-1 text-sm font-semibold text-[#1e293b] dark:text-white/90">{ubicacion_actual}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
