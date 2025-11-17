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

interface RegistroData {
    // Datos de vehículo
    entidad: string;
    fecha_evaluacion: string;
    ubicacion_actual: string;
    tipo_vehiculo: string;
    tipo_combustible: string;
    marca: string;
    modelo: string;
    ano_fabricacion: string;
    marcaMotor?: string;
    placa?: string;
    serie_motor?: string;
    chasis?: string;
    color: string;
    procedencia: string;
    kilometraje: string;
    precio_referencial: string;
    
    // Datos de condición general
    estado_operativo: string[];
    estado_general: string;
    observaciones: string;
    
    // Datos de avalúo (vienen del backend)
    factor_reposicion: number;
    final_estimacion: number;
    moneda: string;
    depre_modelo: number;
    depre_kilometraje: number;
    depre_inspeccion: number;
}

interface ResultadoProps {
    registro?: RegistroData;
}

// Datos simulados para pruebas
const registroSimulado: RegistroData = {
    // Datos de vehículo
    entidad: 'Banco Nacional de Bolivia',
    fecha_evaluacion: '2024-10-20',
    ubicacion_actual: 'Av. Arce #2345, La Paz, Bolivia',
    tipo_vehiculo: 'camioneta',
    tipo_combustible: 'diesel',
    marca: 'Toyota',
    modelo: 'Hilux 4x4',
    ano_fabricacion: '2018',
    marcaMotor: 'Toyota',
    placa: 'ABC-1234',
    serie_motor: 'TY45678901234',
    chasis: 'JTEBH3FJ50K123456',
    color: 'Blanco',
    procedencia: 'Japón',
    kilometraje: '85000',
    precio_referencial: '28500.00',
    
    // Datos de condición general
    estado_operativo: ['Operable', 'En reparación'],
    estado_general: 'Bueno',
    observaciones: 'Vehículo en buenas condiciones generales. Requiere cambio de neumáticos delanteros y mantenimiento preventivo del sistema de frenos. La carrocería presenta algunos rayones menores en la puerta lateral derecha. El motor funciona correctamente sin fugas aparentes.',
    
    // Datos de avalúo (simulados como si vinieran del backend)
    factor_reposicion: 1.2,
    final_estimacion: 32580.50,
    moneda: '$US',
    depre_modelo: 0.30,
    depre_kilometraje: 0.15,
    depre_inspeccion: 0.05
};

export default function Resultado({ registro = registroSimulado }: ResultadoProps) {
    // Todos los datos vienen del backend, no hay cálculos en el frontend

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
                        entidad={registro.entidad}
                        fecha_evaluacion={registro.fecha_evaluacion}
                        ubicacion_actual={registro.ubicacion_actual}
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
                            tipo_vehiculo={registro.tipo_vehiculo}
                            tipo_combustible={registro.tipo_combustible}
                            marca={registro.marca}
                            modelo={registro.modelo}
                            ano_fabricacion={registro.ano_fabricacion}
                            color={registro.color}
                        />

                        {/* Identificación del Vehículo */}
                        <VehicleIdentificationCard
                            placa={registro.placa}
                            chasis={registro.chasis}
                            serie_motor={registro.serie_motor}
                            marcaMotor={registro.marcaMotor}
                        />

                        {/* Condiciones y Evaluación */}
                        <ConditionsCard
                            estado_operativo={registro.estado_operativo}
                            estado_general={registro.estado_general}
                            procedencia={registro.procedencia}
                            kilometraje={registro.kilometraje}
                            precio_referencial={registro.precio_referencial}
                            observaciones={registro.observaciones}
                        />

                        {/* Depreciación y Valoración */}
                        <DepreciacionCard
                            factor_reposicion={registro.factor_reposicion}
                            final_estimacion={registro.final_estimacion}
                            precio_referencial={parseFloat(registro.precio_referencial)}
                            moneda={registro.moneda}
                            depre_modelo={registro.depre_modelo}
                            depre_kilometraje={registro.depre_kilometraje}
                            depre_inspeccion={registro.depre_inspeccion}
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
