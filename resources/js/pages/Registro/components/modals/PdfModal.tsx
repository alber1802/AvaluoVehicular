import { X, FileText, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface PdfModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    vehiculoId: number;
}

export default function PdfModal({
    isOpen,
    onClose,
    pdfUrl,
    vehiculoId
}: PdfModalProps) {
    const [zoom, setZoom] = useState(100);

    if (!isOpen) return null;

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 10, 200));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 10, 50));
    };
    const handlePrint = () => {
        router.get(route('archivos.generarPdf', vehiculoId));
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `reporte-vehiculo-${vehiculoId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-6xl max-h-[95vh] bg-white dark:bg-[#1a2c3a] rounded-xl shadow-2xl overflow-hidden animate-slideUp flex flex-col">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-[#f8fafc] dark:bg-[#0f1a23] border-b border-[#e2e8f0] dark:border-[#20384b] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 rounded-lg">
                                <FileText className="h-6 w-6 text-[#00AEEF]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#1e293b] dark:text-white">
                                    Reporte de Evaluación
                                </h2>
                                <p className="text-sm text-[#64748b] dark:text-white/70">
                                    Documento PDF del vehículo
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-[#e2e8f0] dark:hover:bg-[#20384b] rounded-lg transition-colors"
                        >
                            <X className="h-6 w-6 text-[#64748b] dark:text-white/70" />
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white dark:bg-[#1a2c3a] border-b border-[#e2e8f0] dark:border-[#20384b] px-6 py-3">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleZoomOut}
                                disabled={zoom <= 50}
                                className="p-2 bg-[#f8fafc] dark:bg-[#0f1a23] hover:bg-[#e2e8f0] dark:hover:bg-[#20384b] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Reducir zoom"
                            >
                                <ZoomOut className="h-5 w-5 text-[#64748b] dark:text-white/70" />
                            </button>
                            <span className="text-sm font-medium text-[#1e293b] dark:text-white min-w-[60px] text-center">
                                {zoom}%
                            </span>
                            <button
                                onClick={handleZoomIn}
                                disabled={zoom >= 200}
                                className="p-2 bg-[#f8fafc] dark:bg-[#0f1a23] hover:bg-[#e2e8f0] dark:hover:bg-[#20384b] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Aumentar zoom"
                            >
                                <ZoomIn className="h-5 w-5 text-[#64748b] dark:text-white/70" />
                            </button>
                        </div>
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 hover:bg-[#00AEEF]/20 dark:hover:bg-[#00AEEF]/30 text-[#00AEEF] font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Descargar PDF</span>
                        </button>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 overflow-auto bg-[#f8fafc] dark:bg-[#0f1a23] p-6">
                    <div className="flex items-center justify-center min-h-full">
                        <div
                            className="bg-white dark:bg-[#1a2c3a] rounded-lg shadow-xl overflow-hidden transition-all duration-300"
                            style={{
                                width: `${zoom}%`,
                                maxWidth: '100%'
                            }}
                        >
                            <iframe
                                src={pdfUrl}
                                className="w-full h-[70vh] border-0"
                                title="Reporte PDF"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#f8fafc] dark:bg-[#0f1a23] px-6 py-4 border-t border-[#e2e8f0] dark:border-[#20384b]">
                    <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                        <div className="text-sm text-[#64748b] dark:text-white/60">
                            Usa los controles de zoom para ajustar la visualización
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button
                                onClick={onClose}
                                className="flex-1 sm:flex-initial px-4 py-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-medium rounded-lg transition-colors"
                            >
                                Cerrar
                            </button>

                            <Button
                                onClick={handlePrint}
                                className="flex-1 sm:flex-initial px-4 py-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-medium rounded-lg transition-colors"
                            >
                                volver a generar pdf
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
