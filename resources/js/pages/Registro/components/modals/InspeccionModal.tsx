import { X, FileText, AlertCircle } from 'lucide-react';

interface InspeccionItem {
    id: number;
    nombre: string;
    caracteristica: string;
    tiene: boolean | number;
    valoracion: number;
    observaciones: string | null;
}

interface InspeccionModalProps {
    isOpen: boolean;
    onClose: () => void;
    inspeccion: InspeccionItem[];
    depre_inspeccion: number;
}

export default function InspeccionModal({
    isOpen,
    onClose,
    inspeccion,
    depre_inspeccion
}: InspeccionModalProps) {
    if (!isOpen) return null;

    // Filtrar solo los items que tienen = 1 o true
    const itemsConProblemas = inspeccion.filter((item: InspeccionItem) => !!item.tiene);

    // Calcular la suma de valoraciones
    const sumaValoraciones = itemsConProblemas.reduce((sum, item) => sum + Number(item.valoracion), 0);



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#1a2c3a] rounded-xl shadow-2xl overflow-hidden animate-slideUp">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-[#f8fafc] dark:bg-[#0f1a23] border-b border-[#e2e8f0] dark:border-[#20384b] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 rounded-lg">
                                <FileText className="h-6 w-6 text-[#00AEEF]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#1e293b] dark:text-white">
                                    Depreciación por Inspección
                                </h2>
                                <p className="text-sm text-[#64748b] dark:text-white/70">
                                    Detalle del cálculo de depreciación
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
                            Factor de Inspección = 1 - Σ(Valoraciones)
                        </div>
                    </div>

                    {/* Tabla de Inspección */}
                    {itemsConProblemas.length > 0 ? (
                        <div className="mb-6 overflow-x-auto rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <table className="w-full">
                                <thead className="bg-[#f8fafc] dark:bg-[#0f1a23]">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748b] dark:text-white/60 uppercase tracking-wider">
                                            Elemento
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748b] dark:text-white/60 uppercase tracking-wider">
                                            Característica
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-[#64748b] dark:text-white/60 uppercase tracking-wider">
                                            Valoración
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748b] dark:text-white/60 uppercase tracking-wider">
                                            Observaciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#20384b]">
                                    {itemsConProblemas.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="bg-white dark:bg-[#1a2c3a] hover:bg-[#f8fafc] dark:hover:bg-[#0f1a23] transition-colors"
                                        >
                                            <td className="px-4 py-3 text-sm text-[#1e293b] dark:text-white/90">
                                                {item.nombre}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-[#64748b] dark:text-white/70">
                                                {item.caracteristica}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-right font-semibold text-[#00AEEF]">
                                                {item.valoracion}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-[#64748b] dark:text-white/70">
                                                {item.observaciones || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-[#f8fafc] dark:bg-[#0f1a23]">
                                    <tr>
                                        <td colSpan={2} className="px-4 py-3 text-sm font-semibold text-[#1e293b] dark:text-white/90">
                                            Suma Total de Valoraciones:
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right font-bold text-[#00AEEF]">
                                            {sumaValoraciones.toFixed(3)}
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    ) : (
                        <div className="mb-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center">
                            <AlertCircle className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
                            <p className="text-green-800 dark:text-green-300 font-medium">
                                No se encontraron problemas en la inspección
                            </p>
                        </div>
                    )}

                    {/* Cálculo Final */}
                    <div className="space-y-4">
                        <div className="p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-[#64748b] dark:text-white/60">
                                    Suma de Valoraciones:
                                </span>
                                <span className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                    {sumaValoraciones.toFixed(3)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-[#64748b] dark:text-white/60">
                                    Cálculo:
                                </span>
                                <span className="text-lg font-mono text-[#1e293b] dark:text-white/90">
                                    1 - {sumaValoraciones.toFixed(3)}
                                </span>
                            </div>
                            <div className="pt-3 mt-3 border-t border-[#e2e8f0] dark:border-[#20384b]">
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-semibold text-[#1e293b] dark:text-white/90">
                                        Factor de Inspección:
                                    </span>
                                    <span className="text-2xl font-bold text-[#00AEEF]">
                                        {(Math.ceil(depre_inspeccion * 1000) / 1000).toFixed(3)}
                                    </span>
                                </div>
                            </div>
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
