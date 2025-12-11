import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Upload, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface ImagenVehiculo {
    id: string;
    file?: File; // Opcional para imágenes existentes
    preview: string;
    ubicacion: string;
    descripcion: string;
    path?: string; // Para imágenes existentes del servidor
    isExisting?: boolean; // Para distinguir entre nuevas y existentes
}

interface Inf_ImagenesProps {
    onSubmit?: (imagenes: ImagenVehiculo[]) => void;
    onCancel?: () => void;
    imagenesUpdate?: ImagenVehiculo[];
}

const ubicacionesVehiculo = [
    { value: 'frontal', label: 'Vista Frontal' },
    { value: 'trasera', label: 'Vista Trasera' },
    { value: 'lateral_izquierda', label: 'Lateral Izquierda' },
    { value: 'lateral_derecha', label: 'Lateral Derecha' },
    { value: 'interior_frontal', label: 'Interior Frontal' },
    { value: 'interior_trasero', label: 'Interior Trasero' },
    { value: 'tablero', label: 'Tablero' },
    { value: 'motor', label: 'Motor' },
    { value: 'llanta_delantera_izq', label: 'Llanta Delantera Izquierda' },
    { value: 'llanta_delantera_der', label: 'Llanta Delantera Derecha' },
    { value: 'llanta_trasera_izq', label: 'Llanta Trasera Izquierda' },
    { value: 'llanta_trasera_der', label: 'Llanta Trasera Derecha' },
    { value: 'chasis', label: 'Chasis/VIN' },
    { value: 'placa', label: 'Placa' },
    { value: 'detalle_dano', label: 'Detalle de Daño' },
    { value: 'otro', label: 'Otro' },
];

export default function Inf_Imagenes({ onSubmit, onCancel, imagenesUpdate }: Inf_ImagenesProps) {
    const [imagenes, setImagenes] = useState<ImagenVehiculo[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    // Inicializar con imágenes existentes si las hay
    useEffect(() => {
        if (imagenesUpdate && Array.isArray(imagenesUpdate) && imagenesUpdate.length > 0) {
            const imagenesExistentes: ImagenVehiculo[] = imagenesUpdate.map((img: any) => ({
                id: img.id?.toString() || `existing-${Date.now()}-${Math.random()}`,
                preview: `/storage/${img.url}`, // Ruta completa a la imagen en el servidor
                ubicacion: img.lado || '',
                descripcion: img.descripcion || '',
                path: img.url,
                isExisting: true,
            }));

            setImagenes(imagenesExistentes);
        }
    }, [imagenesUpdate]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files).filter(file =>
            file.type.startsWith('image/')
        );

        agregarImagenes(files);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            agregarImagenes(files);
        }
    };

    const agregarImagenes = (files: File[]) => {
        const nuevasImagenes: ImagenVehiculo[] = files.map(file => ({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file,
            preview: URL.createObjectURL(file),
            ubicacion: '',
            descripcion: '',
        }));

        setImagenes(prev => [...prev, ...nuevasImagenes]);
    };

    const eliminarImagen = (id: string) => {
        setImagenes(prev => {
            const imagen = prev.find(img => img.id === id);
            // Solo revocar URLs de blob para imágenes nuevas, no para existentes
            if (imagen && !imagen.isExisting && imagen.preview.startsWith('blob:')) {
                URL.revokeObjectURL(imagen.preview);
            }
            return prev.filter(img => img.id !== id);
        });
    };

    const actualizarUbicacion = (id: string, ubicacion: string) => {
        setImagenes(prev =>
            prev.map(img => (img.id === id ? { ...img, ubicacion } : img))
        );
    };

    const actualizarDescripcion = (id: string, descripcion: string) => {
        setImagenes(prev =>
            prev.map(img => (img.id === id ? { ...img, descripcion } : img))
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar que todas las imágenes tengan ubicación
        const imagenesSinUbicacion = imagenes.filter(img => !img.ubicacion);

        if (imagenesSinUbicacion.length > 0) {
            alert('Por favor, especifica la ubicación para todas las imágenes.');
            return;
        }

        if (onSubmit) {
            onSubmit(imagenes);
        }
    };

    const imagenesPorUbicacion = imagenes.filter(img => img.ubicacion).length;
    const todasConUbicacion = imagenes.length > 0 && imagenes.length === imagenesPorUbicacion;

    return (
        <div className="w-full">
            <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 shadow-sm dark:border-[#20384b] dark:bg-[#1a2c3a] sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Zona de carga */}
                    <div>
                        <Label className="mb-2 block text-sm font-medium text-[#1e293b] dark:text-white/90">
                            Cargar Imágenes del Vehículo
                        </Label>

                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-all ${isDragging
                                ? 'border-[#00AEEF] bg-[#00AEEF]/5'
                                : 'border-[#e2e8f0] bg-[#f8fafc] dark:border-[#20384b] dark:bg-[#0f1a23]'
                                }`}
                        >
                            <input
                                type="file"
                                id="file-upload"
                                multiple
                                accept="image/*"
                                onChange={handleFileInput}
                                className="hidden"
                            />

                            <div className="flex flex-col items-center justify-center space-y-3">
                                <div className="rounded-full bg-[#00AEEF]/10 p-3">
                                    <Upload className="h-8 w-8 text-[#00AEEF]" />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                        Arrastra y suelta tus imágenes aquí
                                    </p>
                                    <p className="text-xs text-[#64748b] dark:text-white/70">
                                        o haz clic para seleccionar archivos
                                    </p>
                                </div>

                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer rounded-lg bg-[#00AEEF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#00AEEF]/90"
                                >
                                    Seleccionar Imágenes
                                </label>

                                <p className="text-xs text-[#94a3b8] dark:text-white/60">
                                    Formatos soportados: JPG, PNG, WEBP
                                </p>
                            </div>
                        </div>

                        {/* Indicador de progreso */}
                        {imagenes.length > 0 && (
                            <div className="mt-3 flex items-center justify-between rounded-lg bg-[#f8fafc] p-3 dark:bg-[#0f1a23]">
                                <div className="flex items-center gap-2">
                                    <ImageIcon className="h-5 w-5 text-[#00AEEF]" />
                                    <span className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                        {imagenes.length} {imagenes.length === 1 ? 'imagen cargada' : 'imágenes cargadas'}
                                    </span>
                                </div>
                                {todasConUbicacion && (
                                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span className="text-xs font-medium">Todas clasificadas</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Lista de imágenes cargadas */}
                    {imagenes.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                Imágenes Cargadas
                            </h3>

                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {imagenes.map(imagen => (
                                    <div
                                        key={imagen.id}
                                        className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-4 dark:border-[#20384b] dark:bg-[#0f1a23]"
                                    >
                                        <div className="flex gap-4">
                                            {/* Preview de la imagen */}
                                            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f8fafc] dark:bg-[#1a2c3a]">
                                                <img
                                                    src={imagen.preview}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarImagen(imagen.id)}
                                                    className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white shadow-md transition-transform hover:scale-110 hover:bg-red-600"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>

                                            {/* Información de la imagen */}
                                            <div className="flex flex-1 flex-col gap-3">
                                                <div className="space-y-1">
                                                    <Label className="text-xs font-medium text-[#64748b] dark:text-white/70">
                                                        Ubicación / Vista *
                                                    </Label>
                                                    <Select
                                                        value={imagen.ubicacion}
                                                        onValueChange={(value) => actualizarUbicacion(imagen.id, value)}
                                                    >
                                                        <SelectTrigger
                                                            className={`h-9 text-sm ${!imagen.ubicacion
                                                                ? 'border-red-300 dark:border-red-700'
                                                                : ''
                                                                }`}
                                                        >
                                                            <SelectValue placeholder="Seleccionar ubicación" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {ubicacionesVehiculo.map(ubicacion => (
                                                                <SelectItem
                                                                    key={ubicacion.value}
                                                                    value={ubicacion.value}
                                                                >
                                                                    {ubicacion.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-1">
                                                    <Label className="text-xs font-medium text-[#64748b] dark:text-white/70">
                                                        Descripción (opcional)
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Ej: Rayón en puerta trasera"
                                                        value={imagen.descripcion}
                                                        onChange={(e) =>
                                                            actualizarDescripcion(imagen.id, e.target.value)
                                                        }
                                                        className="h-9 text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Botones de acción */}
                    <div className="flex items-center justify-end gap-4 border-t border-[#e2e8f0] pt-6 dark:border-[#20384b]">
                        <Link href={route('dashboard')}>
                            <Button
                                type="button"
                                variant="outline"

                                className="border-[#e2e8f0] text-[#1e293b] hover:bg-[#f8fafc] dark:border-[#20384b] dark:text-white/90 dark:hover:bg-[#0f1a23]"
                            >
                                {imagenes.length > 0 ? 'Omitir' : 'Cancelar'}
                            </Button>
                        </Link>

                        {imagenes.length > 0 && (
                            <Button
                                type="submit"
                                disabled={!todasConUbicacion}
                                className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 disabled:opacity-50"
                            >
                                Guardar Imágenes ({imagenes.length})
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
