import { X, Gauge, Calculator } from 'lucide-react';

interface KilometrajeModalProps {
    isOpen: boolean;
    onClose: () => void;
    depre_kilometraje: number;
    vehiculo: any;
}

export default function KilometrajeModal({
    isOpen,
    onClose,
    depre_kilometraje,
    vehiculo
}: KilometrajeModalProps) {
    if (!isOpen) return null;

    const kilometraje = parseInt(vehiculo.kilometraje);
    const factorDepreciacion = 10 ** -6;
    const valorResidualMinimo = 0.05;

    // Cálculo intermedio
    const calculoIntermedio = 1 - (factorDepreciacion * kilometraje);
    const resultadoFinal = Math.max(calculoIntermedio, valorResidualMinimo);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#1a2c3a] rounded-xl shadow-2xl overflow-hidden animate-slideUp">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-[#f8fafc] dark:bg-[#0f1a23] border-b border-[#e2e8f0] dark:border-[#20384b] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 rounded-lg">
                                <Gauge className="h-6 w-6 text-[#00AEEF]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#1e293b] dark:text-white">
                                    Depreciación por Kilometraje
                                </h2>
                                <p className="text-sm text-[#64748b] dark:text-white/70">
                                    Cálculo basado en el uso del vehículo
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X className="h-6 w-6 text-[#64748b] dark:text-white/70" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
                    {/* Fórmula */}
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                            Fórmula de Cálculo:
                        </h3>
                        <div className="font-mono text-sm text-blue-800 dark:text-blue-200">
                            Factor de Kilometraje = max(1 - (10⁻⁶ × Kilometraje), 0.05)
                        </div>
                    </div>

                    {/* Datos del Vehículo */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center gap-2 mb-2">
                                <Gauge className="h-5 w-5 text-[#00AEEF]" />
                                <span className="text-sm font-medium text-[#64748b] dark:text-white/60">
                                    Kilometraje Actual
                                </span>
                            </div>
                            <p className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                {kilometraje.toLocaleString('en-US')} km
                            </p>
                        </div>

                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center gap-2 mb-2">
                                <Calculator className="h-5 w-5 text-[#00AEEF]" />
                                <span className="text-sm font-medium text-[#64748b] dark:text-white/60">
                                    Factor de Depreciación
                                </span>
                            </div>
                            <p className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                {factorDepreciacion.toFixed(6)}
                            </p>
                        </div>
                    </div>

                    {/* Información Adicional */}
                    <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                        <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-2">
                            Información del Cálculo:
                        </h3>
                        <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
                                <span>El factor de depreciación es de <strong>10⁻⁶</strong> por cada kilómetro recorrido</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
                                <span>El valor mínimo residual es de <strong>0.05</strong> (5%)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
                                <span>Se aplica el valor máximo entre el cálculo y el residual mínimo</span>
                            </li>
                        </ul>
                    </div>

                    {/* Proceso de Cálculo */}
                    <div className="mb-6 space-y-4">
                        <h3 className="text-base font-semibold text-[#1e293b] dark:text-white/90">
                            Proceso de Cálculo:
                        </h3>

                        {/* Paso 1: Cálculo Base */}
                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[#1e293b] dark:text-white/90 mb-1">
                                        Paso 1: Aplicar Factor de Depreciación
                                    </p>
                                    <p className="text-xs text-[#64748b] dark:text-white/70 font-mono">
                                        1 - ({factorDepreciacion.toFixed(6)} × {kilometraje.toLocaleString('en-US')})
                                    </p>
                                </div>
                                <span className="text-2xl font-bold text-[#00AEEF]">
                                    {calculoIntermedio.toFixed(6)}
                                </span>
                            </div>
                        </div>

                        {/* Paso 2: Aplicar Valor Residual */}
                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[#1e293b] dark:text-white/90 mb-1">
                                        Paso 2: Aplicar Valor Residual Mínimo
                                    </p>
                                    <p className="text-xs text-[#64748b] dark:text-white/70 font-mono">
                                        max({calculoIntermedio.toFixed(6)}, {valorResidualMinimo.toFixed(2)})
                                    </p>
                                </div>
                                <span className="text-2xl font-bold text-[#00AEEF]">
                                    {resultadoFinal.toFixed(6)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Interpretación */}
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                            Interpretación del Resultado:
                        </h3>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            {depre_kilometraje > 0.9
                                ? "El vehículo tiene un kilometraje bajo, lo que resulta en una depreciación mínima."
                                : depre_kilometraje > 0.7
                                    ? "El vehículo tiene un kilometraje moderado, con una depreciación razonable."
                                    : depre_kilometraje > 0.5
                                        ? "El vehículo tiene un kilometraje alto, lo que aumenta la depreciación."
                                        : "El vehículo tiene un kilometraje muy alto, alcanzando el valor residual mínimo."
                            }
                        </p>
                    </div>

                    {/* Resultado Final */}
                    <div className="p-5 bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 rounded-lg border-2 border-[#00AEEF]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#1e293b] dark:text-white/90 mb-1">
                                    Factor de Depreciación por Kilometraje
                                </p>
                                <p className="text-xs text-[#64748b] dark:text-white/70">
                                    Valor final aplicado al cálculo del avalúo
                                </p>
                            </div>
                            <span className="text-3xl font-bold text-[#00AEEF]">
                                {depre_kilometraje.toFixed(6)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-[#f8fafc] dark:bg-[#0f1a23] px-6 py-4 border-t border-[#e2e8f0] dark:border-[#20384b]">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-medium rounded-lg transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
