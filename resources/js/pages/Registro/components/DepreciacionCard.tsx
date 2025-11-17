import { TrendingDown, DollarSign, Calculator } from 'lucide-react';

interface DepreciacionCardProps {
    factor_reposicion: number;
    final_estimacion: number;
    precio_referencial: number;
    moneda: string;
    depre_modelo: number;
    depre_kilometraje: number;
    depre_inspeccion: number;
}

export default function DepreciacionCard({
    factor_reposicion,
    final_estimacion,
    precio_referencial,
    moneda,
    depre_modelo,
    depre_kilometraje,
    depre_inspeccion
}: DepreciacionCardProps) {
    // Formatear porcentaje
    const formatPercentage = (value: number) => {
        return `${(value * 100).toFixed(2)}%`;
    };

    // Obtener símbolo de moneda
    const getCurrencySymbol = (currency: string) => {
        return currency === 'Bs' ? 'Bs' : '$US';
    };

    return (
        <div className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-6 shadow-sm dark:border-[#20384b] dark:bg-[#1a2c3a]">
            <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
                    <TrendingDown className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                    Factores de Depreciación y Valoración
                </h3>
            </div>

            <div className="space-y-6">
                {/* Precio Referencial y Moneda */}
                <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-5 dark:from-blue-900/20 dark:to-blue-800/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <p className="text-base font-medium text-blue-900 dark:text-blue-300">Precio Referencial</p>
                            </div>
                            <p className="mt-2 text-3xl font-bold text-blue-900 dark:text-blue-200">
                                {getCurrencySymbol(moneda)} {precio_referencial.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Moneda</p>
                            <p className="mt-1 text-xl font-semibold text-blue-900 dark:text-blue-200">{getCurrencySymbol(moneda)}</p>
                        </div>
                    </div>
                </div>

                {/* Factor de Reposición */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                        <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Factor de Reposición</p>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-[#f8fafc] p-4 dark:bg-[#0f1a23]">
                        <p className="text-base text-[#1e293b] dark:text-white/90">Multiplicador</p>
                        <p className="text-2xl font-bold text-[#00AEEF]">{factor_reposicion.toFixed(2)}</p>
                    </div>
                </div>

                {/* Factores de Depreciación */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <TrendingDown className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                        <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Factores de Depreciación</p>
                    </div>

                    <div className="space-y-3">
                        {/* Depreciación por Modelo */}
                        <div className="flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-[#20384b] dark:bg-[#0f1a23]">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                                <p className="text-base text-[#1e293b] dark:text-white/90">Depreciación por Modelo</p>
                            </div>
                            <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                                {formatPercentage(depre_modelo)}
                            </p>
                        </div>

                        {/* Depreciación por Kilometraje */}
                        <div className="flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-[#20384b] dark:bg-[#0f1a23]">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                                <p className="text-base text-[#1e293b] dark:text-white/90">Depreciación por Kilometraje</p>
                            </div>
                            <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                                {formatPercentage(depre_kilometraje)}
                            </p>
                        </div>

                        {/* Depreciación por Inspección */}
                        <div className="flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-[#20384b] dark:bg-[#0f1a23]">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <p className="text-base text-[#1e293b] dark:text-white/90">Depreciación por Inspección</p>
                            </div>
                            <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                                {formatPercentage(depre_inspeccion)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Valor Final Estimado */}
                <div className="rounded-lg border-2 border-[#00AEEF] bg-gradient-to-br from-[#00AEEF]/10 to-[#00AEEF]/5 p-5 dark:border-[#00AEEF]/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-6 w-6 text-[#00AEEF]" />
                                <p className="text-base font-medium text-[#00AEEF]">Valor Final Estimado</p>
                            </div>
                            <p className="text-4xl font-bold text-[#00AEEF]">
                                {getCurrencySymbol(moneda)} {final_estimacion.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                    <p className="mt-3 text-sm text-[#64748b] dark:text-white/60">
                        Valor calculado considerando el factor de reposición y depreciaciones
                    </p>
                </div>
            </div>
        </div>
    );
}
