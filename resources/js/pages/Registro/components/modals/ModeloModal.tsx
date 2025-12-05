import { X, Car, Calendar, TrendingDown } from 'lucide-react';

interface ModeloModalProps {
    isOpen: boolean;
    onClose: () => void;
    depre_modelo: number;
    vehiculo: any;
    marca: any;
}

export default function ModeloModal({
    isOpen,
    onClose,
    depre_modelo,
    vehiculo,
    marca
}: ModeloModalProps) {
    if (!isOpen) return null;

    const añoActual = new Date().getFullYear();
    const añoFabricacion = vehiculo.año_fabricacion;
    const antiguedad = añoActual - añoFabricacion;
    const tasa_k = marca.tasa_k;
    const valorResidual = marca.valor_residual;


    // Cálculo intermedio
    const calculoIntermedio = 1 - (tasa_k * antiguedad);
    const resultadoFinal = Math.max(calculoIntermedio, valorResidual);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#1a2c3a] rounded-xl shadow-2xl overflow-hidden animate-slideUp">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-[#f8fafc] dark:bg-[#0f1a23] border-b border-[#e2e8f0] dark:border-[#20384b] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 rounded-lg">
                                <Car className="h-6 w-6 text-[#00AEEF]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#1e293b] dark:text-white">
                                    Depreciación por Modelo
                                </h2>
                                <p className="text-sm text-[#64748b] dark:text-white/70">
                                    Cálculo basado en antigüedad del vehículo
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
                            Factor de Modelo = max(1 - (Tasa K × Antigüedad), Valor Residual)
                        </div>
                    </div>

                    {/* Datos del Vehículo */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center gap-2 mb-2">
                                <Car className="h-5 w-5 text-[#00AEEF]" />
                                <span className="text-sm font-medium text-[#64748b] dark:text-white/60">
                                    Marca
                                </span>
                            </div>
                            <p className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                {marca.nombre}
                            </p>
                        </div>

                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-5 w-5 text-[#00AEEF]" />
                                <span className="text-sm font-medium text-[#64748b] dark:text-white/60">
                                    Año de Fabricación
                                </span>
                            </div>
                            <p className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                {añoFabricacion}
                            </p>
                        </div>

                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingDown className="h-5 w-5 text-[#00AEEF]" />
                                <span className="text-sm font-medium text-[#64748b] dark:text-white/60">
                                    Tasa de Depreciación (K)
                                </span>
                            </div>
                            <p className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                {tasa_k}
                            </p>
                        </div>

                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-5 w-5 text-[#00AEEF]" />
                                <span className="text-sm font-medium text-[#64748b] dark:text-white/60">
                                    Valor Residual
                                </span>
                            </div>
                            <p className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                {valorResidual}
                            </p>
                        </div>
                    </div>

                    {/* Proceso de Cálculo */}
                    <div className="mb-6 space-y-4">
                        <h3 className="text-base font-semibold text-[#1e293b] dark:text-white/90">
                            Proceso de Cálculo:
                        </h3>

                        {/* Paso 1: Antigüedad */}
                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[#1e293b] dark:text-white/90 mb-1">
                                        Paso 1: Calcular Antigüedad
                                    </p>
                                    <p className="text-xs text-[#64748b] dark:text-white/70 font-mono">
                                        {añoActual} - {añoFabricacion} = {antiguedad} años
                                    </p>
                                </div>
                                <span className="text-2xl font-bold text-[#00AEEF]">
                                    {antiguedad}
                                </span>
                            </div>
                        </div>

                        {/* Paso 2: Cálculo Intermedio */}
                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[#1e293b] dark:text-white/90 mb-1">
                                        Paso 2: Aplicar Tasa de Depreciación
                                    </p>
                                    <p className="text-xs text-[#64748b] dark:text-white/70 font-mono">
                                        1 - ({tasa_k} × {antiguedad}) = {calculoIntermedio.toFixed(4)}
                                    </p>
                                </div>
                                <span className="text-2xl font-bold text-[#00AEEF]">
                                    {calculoIntermedio.toFixed(4)}
                                </span>
                            </div>
                        </div>

                        {/* Paso 3: Aplicar Valor Residual */}
                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[#1e293b] dark:text-white/90 mb-1">
                                        Paso 3: Aplicar Valor Residual Mínimo
                                    </p>
                                    <p className="text-xs text-[#64748b] dark:text-white/70 font-mono">
                                        max({calculoIntermedio.toFixed(4)}, {valorResidual}) = {resultadoFinal.toFixed(4)}
                                    </p>
                                </div>
                                <span className="text-2xl font-bold text-[#00AEEF]">
                                    {resultadoFinal.toFixed(4)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Resultado Final */}
                    <div className="p-5 bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 rounded-lg border-2 border-[#00AEEF]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#1e293b] dark:text-white/90 mb-1">
                                    Factor de Depreciación por Modelo
                                </p>
                                <p className="text-xs text-[#64748b] dark:text-white/70">
                                    Valor final aplicado al cálculo del avalúo
                                </p>
                            </div>
                            <span className="text-3xl font-bold text-[#00AEEF]">
                                {depre_modelo.toFixed(4)}
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
