import { TrendingDown, DollarSign, Calculator, Info } from 'lucide-react';
import { useState } from 'react';
import InspeccionModal from './modals/InspeccionModal';
import ModeloModal from './modals/ModeloModal';
import KilometrajeModal from './modals/KilometrajeModal';

interface DepreciacionCardProps {
    factor_reposicion: number;
    final_estimacion: number;
    precio_referencial: number;
    moneda: string;
    depre_modelo: number;
    depre_kilometraje: number;
    depre_inspeccion: number;
    inspeccion: any;
    vehiculo: any;
    marca: any;
}

export default function DepreciacionCard({
    factor_reposicion,
    final_estimacion,
    precio_referencial,
    moneda,
    depre_modelo,
    depre_kilometraje,
    depre_inspeccion,
    inspeccion,
    vehiculo,
    marca
}: DepreciacionCardProps) {
    // Estados para los modales
    const [isModeloModalOpen, setIsModeloModalOpen] = useState(false);
    const [isKilometrajeModalOpen, setIsKilometrajeModalOpen] = useState(false);
    const [isInspeccionModalOpen, setIsInspeccionModalOpen] = useState(false);

    // Formatear porcentaje
    //console.log(inspeccion)

    const formatPercentage = (value: number) => {
        return value.toFixed(3);
        //`${(value * 100).toFixed(2)}%`
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
                        <button
                            onClick={() => setIsModeloModalOpen(true)}
                            className="w-full flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-[#20384b] dark:bg-[#0f1a23] hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 cursor-pointer group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-purple-500 group-hover:scale-110 transition-transform"></div>
                                <p className="text-base text-[#1e293b] dark:text-white/90">Depreciación por Modelo</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                                    {formatPercentage(depre_modelo)}
                                </p>
                                <Info className="h-4 w-4 text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>

                        {/* Depreciación por Kilometraje */}
                        <button
                            onClick={() => setIsKilometrajeModalOpen(true)}
                            className="w-full flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-[#20384b] dark:bg-[#0f1a23] hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200 cursor-pointer group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-orange-500 group-hover:scale-110 transition-transform"></div>
                                <p className="text-base text-[#1e293b] dark:text-white/90">Depreciación por Kilometraje</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                                    {formatPercentage(depre_kilometraje)}
                                </p>
                                <Info className="h-4 w-4 text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>

                        {/* Depreciación por Inspección */}
                        <button
                            onClick={() => setIsInspeccionModalOpen(true)}
                            className="w-full flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-[#20384b] dark:bg-[#0f1a23] hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600 transition-all duration-200 cursor-pointer group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-red-500 group-hover:scale-110 transition-transform"></div>
                                <p className="text-base text-[#1e293b] dark:text-white/90">Depreciación por Inspección</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                                    {formatPercentage(depre_inspeccion)}
                                </p>
                                <Info className="h-4 w-4 text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>
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

            {/* Modales */}
            <ModeloModal
                isOpen={isModeloModalOpen}
                onClose={() => setIsModeloModalOpen(false)}
                depre_modelo={depre_modelo}
                vehiculo={vehiculo}
                marca={marca}
            />

            <KilometrajeModal
                isOpen={isKilometrajeModalOpen}
                onClose={() => setIsKilometrajeModalOpen(false)}
                depre_kilometraje={depre_kilometraje}
                vehiculo={vehiculo}
            />

            <InspeccionModal
                isOpen={isInspeccionModalOpen}
                onClose={() => setIsInspeccionModalOpen(false)}
                inspeccion={inspeccion}
                depre_inspeccion={depre_inspeccion}
            />
        </div>
    );
}
