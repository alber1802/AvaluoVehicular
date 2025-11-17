import { Activity, MapPin, Gauge, DollarSign, AlertCircle, FileText } from 'lucide-react';

interface ConditionsCardProps {
    estado_operativo: string[];
    estado_general: string;
    procedencia: string;
    kilometraje: string;
    precio_referencial: string;
    observaciones: string;
}

export default function ConditionsCard({
    estado_operativo,
    estado_general,
    procedencia,
    kilometraje,
    precio_referencial,
    observaciones
}: ConditionsCardProps) {
    const getEstadoGeneralColor = (estado: string) => {
        switch (estado) {
            case 'Bueno':
                return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
            case 'Regular':
                return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
            case 'Malo':
                return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
            default:
                return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
        }
    };

    return (
        <div className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-6 shadow-sm dark:border-[#20384b] dark:bg-[#1a2c3a]">
            <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                    <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                    Condiciones y Evaluación
                </h3>
            </div>

            <div className="space-y-4">
                {/* Estado Operativo */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                        <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Estado Operativo</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(estado_operativo) && estado_operativo.length > 0 ? (
                            estado_operativo.map((estado, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                >
                                    {estado}
                                </span>
                            ))
                        ) : (
                            <span className="text-base text-[#64748b] dark:text-white/60">No especificado</span>
                        )}
                    </div>
                </div>

                {/* Estado General */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                        <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Estado General</p>
                    </div>
                    <div className="inline-flex items-center">
                        <span
                            className={`rounded-full px-5 py-2 text-base font-semibold ${getEstadoGeneralColor(estado_general)}`}
                        >
                            {estado_general}
                        </span>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Procedencia */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                            <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Procedencia</p>
                        </div>
                        <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">{procedencia}</p>
                    </div>

                    {/* Kilometraje */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Gauge className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                            <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Kilometraje</p>
                        </div>
                        <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">
                            {parseFloat(kilometraje).toLocaleString()} km
                        </p>
                    </div>

                    {/* Precio Referencial */}
                    <div className="space-y-2 md:col-span-2">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                            <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Precio Referencial</p>
                        </div>
                        <p className="text-xl font-bold text-[#00AEEF]">
                            ${parseFloat(precio_referencial).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>

                {/* Observaciones */}
                <div className="space-y-2 border-t border-[#e2e8f0] pt-4 dark:border-[#20384b]">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                        <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Observaciones</p>
                    </div>
                    <p className="text-base text-[#1e293b] dark:text-white/90">{observaciones}</p>
                </div>
            </div>
        </div>
    );
}
