import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ImageIcon, FileText } from 'lucide-react';
import { useState } from 'react';
import ResultadoHeader from '@/pages/Registro/components/ResultadoHeader';
import VehicleInfoCard from '@/pages/Registro/components/VehicleInfoCard';
import VehicleIdentificationCard from '@/pages/Registro/components/VehicleIdentificationCard';
import ConditionsCard from '@/pages/Registro/components/ConditionsCard';
import DepreciacionCard from '@/pages/Registro/components/DepreciacionCard';
import ImagenesModal from '@/pages/Registro/components/modals/ImagenesModal';
import PdfModal from '@/pages/Registro/components/modals/PdfModal';

import { type Vehiculo, type CondicionGeneral, type Inspeccion, type VehiculoImagen, type Marca, Archivo } from '@/types/avaluo';

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
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

    const handleImagenes = () => {
        setIsImagenesModalOpen(true);
    };

    const handleVerPdf = () => {
        setIsPdfModalOpen(true);
    };

    return (
        <PublicLayout>
            <Head title="Avalúo Público" />
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

                        {imagenes.length > 0 && (
                            <>
                                {archivos?.url && (
                                    <Button
                                        variant="outline"
                                        onClick={handleVerPdf}
                                        className="w-full flex-shrink-0 flex-grow-0 items-center gap-2 border-[#e2e8f0] text-[#1e293b] hover:bg-[#f8fafc] dark:border-[#20384b] dark:text-white/90 dark:hover:bg-[#0f1a23] md:order-3 md:w-auto"
                                    >
                                        <FileText className="h-4 w-4" />
                                        Ver PDF
                                    </Button>
                                )}
                            </>
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

            {/* Modal de PDF */}
            {archivos?.url != null && (
                <PdfModal
                    isOpen={isPdfModalOpen}
                    onClose={() => setIsPdfModalOpen(false)}
                    pdfUrl={`/storage/${archivos.url}`}
                    vehiculoId={vehiculo.id}
                />
            )}
        </PublicLayout>
    );
}
