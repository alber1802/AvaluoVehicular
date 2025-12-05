import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ResultadoHeader from '../components/ResultadoHeader';
import VehicleInfoCard from '../components/VehicleInfoCard';
import VehicleIdentificationCard from '../components/VehicleIdentificationCard';
import ConditionsCard from '../components/ConditionsCard';
import DepreciacionCard from '../components/DepreciacionCard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Evaluaciones',
        href: '#',
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
    marca
}: ResultadoProps) {

    const handlePrint = () => {
        //window.print();
    };


    const handleVolver = () => {
        window.location.href = '/dashboard';
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
                    <div className="mb-6 flex items-center justify-between border-b border-[#e2e8f0] pb-4 print:hidden dark:border-[#20384b]">
                        <Button
                            variant="outline"
                            onClick={handleVolver}
                            className="flex items-center gap-2 border-[#e2e8f0] text-[#1e293b] hover:bg-[#f8fafc] dark:border-[#20384b] dark:text-white/90 dark:hover:bg-[#0f1a23]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver a Evaluaciones
                        </Button>

                        <Button
                            onClick={handlePrint}
                            className="flex items-center gap-2 bg-[#00AEEF] hover:bg-[#00AEEF]/90"
                        >

                            Imprimir Reporte
                        </Button>
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
                </div>
            </div>
        </AppLayout>
    );
}
