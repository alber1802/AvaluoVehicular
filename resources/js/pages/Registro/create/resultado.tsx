import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import ResultadoHeader from '../components/ResultadoHeader';
import VehicleInfoCard from '../components/VehicleInfoCard';
import VehicleIdentificationCard from '../components/VehicleIdentificationCard';
import ConditionsCard from '../components/ConditionsCard';
import DepreciacionCard from '../components/DepreciacionCard';
import ImagenesModal from '../components/modals/ImagenesModal';
import { route } from 'ziggy-js';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Resultado',
        href: '/registro/resultado',
    },
];

interface Vehiculo {
    id: number;
    entidad: string;
    fecha_evaluacion: string;
    ubicacion_actual: string;
    tipo_vehiculo: string;
    tipo_combustible: string;
    id_marca: number;
    modelo: string;
    año_fabricacion: number;
    placa?: string;
    serie_motor?: string;
    chasis?: string;
    color: string;
    procedencia: string;
    kilometraje: string;
    precio_referencial: string;
}

interface CondicionGeneral {
    id: number;
    id_vehiculo: number;
    estado_operativo: string;
    estado_general: string;
    observaciones?: string;
}

interface Inspeccion {
    id: number;
    id_vehiculo: number;
    nombre: string;
    caracteristica: string;
    tiene: number;
    valoracion: number;
}

interface VehiculoImagen {
    id: number;
    id_vehiculo: number;
    lado: string;
    url: string;
    descripcion?: string;
    fecha?: string;
}
interface Marca {
    id: number;
    nombre: string;
    tasa_k: number;
    valor_residual: number;
    fecha: string;
}

interface ResultadoProps {
    vehiculo: Vehiculo;
    condicionGeneral: CondicionGeneral;
    inspeccion: Inspeccion[];
    archivos: Archivo;
    imagenes: VehiculoImagen[];
    valorFinal: number;
    factorReposicion: number;
    factorModelo: number;
    factorKilometraje: number;
    factorInspeccion: number;
    valorResidual: number;
    marca: Marca;
}
interface Archivo {
    id: number;
    id_vehiculo: number;
    nombre: string;
    url: string;
    fecha: string;
}

export default function Resultado({
    vehiculo,
    condicionGeneral,
    inspeccion,
    imagenes,
    valorFinal,
    factorReposicion,
    factorModelo,
    factorKilometraje,
    factorInspeccion,
    valorResidual,
    marca,
    archivos
}: ResultadoProps) {
    const [isImagenesModalOpen, setIsImagenesModalOpen] = useState(false);

    const handlePrint = () => {
        router.get(route('archivos.generarPdf', vehiculo.id));
    };


    const handleVolver = () => {
        window.location.href = '/dashboard';
    };

    const handleImagenes = () => {
        setIsImagenesModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resultado de Evaluación" />

            <div className="h-full w-full">
                <div className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-6 shadow-sm dark:border-[#20384b] dark:bg-[#1a2c3a]">
                    {/* Header */}
                    <ResultadoHeader
                        entidad={vehiculo.entidad}
                        fecha_evaluacion={vehiculo.fecha_evaluacion}
                        ubicacion_actual={vehiculo.ubicacion_actual}
                    />

                    {/* Botones de acción */}
                    <div className="mb-6 flex flex-col items-center gap-4 border-b border-[#e2e8f0] pb-4 print:hidden dark:border-[#20384b] md:flex-row md:justify-between">
                        <Button
                            variant="outline"
                            onClick={handleVolver}
                            className="w-full flex-shrink-0 flex-grow-0 items-center gap-2 border-[#e2e8f0] text-[#1e293b] hover:bg-[#f8fafc] dark:border-[#20384b] dark:text-white/90 dark:hover:bg-[#0f1a23] md:order-1 md:w-auto"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver al Dashboard
                        </Button>

                        {imagenes.length > 0 && (
                            <Button
                                variant="outline"
                                onClick={handleImagenes}
                                className="w-full flex-shrink-0 flex-grow-0 items-center gap-2 border-[#e2e8f0] text-[#1e293b] hover:bg-[#f8fafc] dark:border-[#20384b] dark:text-white/90 dark:hover:bg-[#0f1a23] md:order-2 md:w-auto"
                            >
                                <ImageIcon className="h-4 w-4" />
                                Ver Imagenes
                            </Button>
                        )}

                        {imagenes.length > 0 && archivos.url != null && (
                            <Button
                                onClick={handlePrint}
                                className="w-full flex-shrink-0 flex-grow-0 items-center gap-2 bg-[#00AEEF] hover:bg-[#00AEEF]/90 md:order-3 md:w-auto"
                            >
                                ver reporte PDF
                            </Button>
                        )}
                    </div>

                    {/* Grid de información */}
                    <div className="space-y-6">
                        {/* Información del Vehículo */}
                        <VehicleInfoCard
                            tipo_vehiculo={vehiculo.tipo_vehiculo}
                            tipo_combustible={vehiculo.tipo_combustible}
                            marca={marca.nombre}
                            modelo={vehiculo.modelo}
                            ano_fabricacion={vehiculo.año_fabricacion.toString()}
                            color={vehiculo.color}
                        />

                        {/* Identificación del Vehículo */}
                        <VehicleIdentificationCard
                            placa={vehiculo.placa}
                            chasis={vehiculo.chasis}
                            serie_motor={vehiculo.serie_motor}
                            marcaMotor={vehiculo.id_marca.toString()}
                        />

                        {/* Condiciones y Evaluación */}
                        <ConditionsCard
                            estado_operativo={condicionGeneral.estado_operativo ? [condicionGeneral.estado_operativo] : []}
                            estado_general={condicionGeneral.estado_general}
                            procedencia={vehiculo.procedencia}
                            kilometraje={vehiculo.kilometraje}
                            precio_referencial={vehiculo.precio_referencial}
                            observaciones={condicionGeneral.observaciones || ''}
                        />

                        {/* Depreciación y Valoración */}
                        <DepreciacionCard
                            factor_reposicion={factorReposicion}
                            final_estimacion={valorFinal}
                            precio_referencial={parseFloat(vehiculo.precio_referencial)}
                            moneda="$US"
                            depre_modelo={factorModelo}
                            depre_kilometraje={factorKilometraje}
                            depre_inspeccion={factorInspeccion}
                            inspeccion={inspeccion}
                            vehiculo={vehiculo}
                            marca={marca}
                        />
                    </div>

                    {/* Footer */}
                    {imagenes.length > 0 ? (
                        <div className="mt-8 border-t border-[#e2e8f0] pt-6 text-center print:hidden dark:border-[#20384b]">
                            <p className="text-sm text-[#64748b] dark:text-white/60">
                                Reporte generado el {new Date().toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    ) : (
                        <div className="mt-8 border-t border-[#e2e8f0] pt-6 text-center print:hidden dark:border-[#20384b]">
                            <p className="text-sm text-[#64748b] dark:text-white/60">
                                No se pudo generar el reporte por falta de imágenes
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Imágenes */}
            <ImagenesModal
                isOpen={isImagenesModalOpen}
                onClose={() => setIsImagenesModalOpen(false)}
                imagenes={imagenes}
            />
        </AppLayout>
    );
}
