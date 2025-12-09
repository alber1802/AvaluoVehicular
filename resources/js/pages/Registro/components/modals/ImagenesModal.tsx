import { X, ChevronLeft, ChevronRight, Download, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';

interface VehiculoImagen {
    id: number;
    id_vehiculo: number;
    lado: string;
    url: string;
    descripcion?: string;
    fecha?: string;
}

interface ImagenesModalProps {
    isOpen: boolean;
    onClose: () => void;
    imagenes: VehiculoImagen[];
}

export default function ImagenesModal({
    isOpen,
    onClose,
    imagenes
}: ImagenesModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!isOpen) return null;

    const handlePrevious = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
        setIsZoomed(false);
    };

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
        setIsZoomed(false);
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
        setIsZoomed(false);
    };



    const currentImage = imagenes[currentImageIndex];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-6xl max-h-[95vh] bg-white dark:bg-[#1a2c3a] rounded-xl shadow-2xl overflow-hidden animate-slideUp flex flex-col">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-[#f8fafc] dark:bg-[#0f1a23] border-b border-[#e2e8f0] dark:border-[#20384b] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 rounded-lg">
                                <ZoomIn className="h-6 w-6 text-[#00AEEF]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#1e293b] dark:text-white">
                                    Imágenes del Vehículo
                                </h2>
                                <p className="text-sm text-[#64748b] dark:text-white/70">
                                    {currentImageIndex + 1} de {imagenes.length} imágenes
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

                {/* Main Image Display */}
                <div className="flex-1 overflow-hidden bg-[#f8fafc] dark:bg-[#0f1a23] p-6">
                    <div className="relative h-full flex items-center justify-center">
                        {/* Navigation Buttons */}
                        {imagenes.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevious}
                                    className="absolute left-4 z-10 p-3 bg-white/90 dark:bg-[#1a2c3a]/90 hover:bg-white dark:hover:bg-[#1a2c3a] rounded-full shadow-lg transition-all hover:scale-110"
                                >
                                    <ChevronLeft className="h-6 w-6 text-[#1e293b] dark:text-white" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 z-10 p-3 bg-white/90 dark:bg-[#1a2c3a]/90 hover:bg-white dark:hover:bg-[#1a2c3a] rounded-full shadow-lg transition-all hover:scale-110"
                                >
                                    <ChevronRight className="h-6 w-6 text-[#1e293b] dark:text-white" />
                                </button>
                            </>
                        )}

                        {/* Image */}
                        <div className={`relative max-h-[60vh] max-w-[60vh] transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}>
                            <img
                                src={`/storage/${currentImage.url}`}
                                alt={`${currentImage.lado} - ${currentImage.descripcion || 'Imagen del vehículo'}`}
                                className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-xl"
                                onClick={() => setIsZoomed(!isZoomed)}
                            />
                        </div>
                    </div>

                    {/* Image Info */}
                    <div className="mt-4 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2c3a] rounded-lg shadow-sm">
                            <span className="text-sm font-semibold text-[#00AEEF]">
                                {currentImage.lado}
                            </span>
                            {currentImage.descripcion && (
                                <>
                                    <span className="text-[#64748b] dark:text-white/40">•</span>
                                    <span className="text-sm text-[#64748b] dark:text-white/70">
                                        {currentImage.descripcion}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Thumbnails */}
                {imagenes.length > 1 && (
                    <div className="bg-white dark:bg-[#1a2c3a] border-t border-[#e2e8f0] dark:border-[#20384b] px-6 py-4">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#00AEEF] scrollbar-track-[#e2e8f0] dark:scrollbar-track-[#20384b]">
                            {imagenes.map((imagen, index) => (
                                <button
                                    key={imagen.id}
                                    onClick={() => handleThumbnailClick(index)}
                                    className={`flex-shrink-0 relative rounded-lg overflow-hidden transition-all ${index === currentImageIndex
                                        ? 'ring-4 ring-[#00AEEF] scale-105'
                                        : 'ring-2 ring-[#e2e8f0] dark:ring-[#20384b] hover:ring-[#00AEEF]/50 hover:scale-105'
                                        }`}
                                >
                                    <img
                                        src={'/storage/' + imagen.url}
                                        alt={imagen.lado}
                                        className="h-20 w-28 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1">
                                        <p className="text-xs text-white font-medium truncate">
                                            {imagen.lado}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="bg-[#f8fafc] dark:bg-[#0f1a23] px-6 py-4 border-t border-[#e2e8f0] dark:border-[#20384b]">
                    <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                        <div className="text-sm text-[#64748b] dark:text-white/60">
                            Haz clic en la imagen para hacer zoom
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">

                            {/* <Link href={route('imagenes.vehiculo.download', { id: imagenes[currentImageIndex].id })}>
                                <button

                                    className="flex-1 sm:flex-initial px-4 py-2 bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 hover:bg-[#00AEEF]/20 dark:hover:bg-[#00AEEF]/30 text-[#00AEEF] font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Descargar
                                </button>
                            </Link> */}
                            <button
                                onClick={onClose}
                                className="flex-1 sm:flex-initial px-4 py-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-medium rounded-lg transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
