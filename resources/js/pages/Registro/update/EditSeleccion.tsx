import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Wrench, Car, Images } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Actualizar Avalúo',
        href: '/registro/actualizar/seleccionar',
    },
];

export default function EditSeleccion({ id }: { id: number }) {


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Actualizar Información del Avalúo" />

            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-8">
                <div className="w-full max-w-6xl space-y-8 px-4">
                    {/* Título */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#1e293b] dark:text-white/90 md:text-4xl">
                            Seleccione qué desea actualizar
                        </h1>
                        <p className="mt-3 text-base text-[#64748b] dark:text-white/70 md:text-lg">
                            Elija la sección que desea modificar del avalúo
                        </p>
                    </div>

                    {/* Grid de opciones */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Actualizar Datos del Vehículo */}
                        <Link href={route('avaluo.editDatosVehiculo', { id })}>
                            <div className="group cursor-pointer rounded-lg border-2 border-[#e2e8f0] bg-[#ffffff] p-8 shadow-sm transition-all duration-300 hover:border-[#00AEEF] hover:shadow-lg dark:border-[#20384b] dark:bg-[#1a2c3a] dark:hover:border-[#00AEEF]">
                                <div className="flex flex-col items-center space-y-4 text-center">
                                    <div className="rounded-full bg-[#00AEEF]/10 p-6 transition-all duration-300 group-hover:bg-[#00AEEF]/20">
                                        <Car className="h-12 w-12 text-[#00AEEF]" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-[#1e293b] dark:text-white/90">
                                        Actualizar Datos del Vehículo
                                    </h2>
                                    <p className="text-sm text-[#64748b] dark:text-white/70">
                                        Modifique la información básica del vehículo
                                    </p>
                                    <Button className="mt-4 w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90">
                                        Actualizar
                                    </Button>
                                </div>
                            </div>
                        </Link>

                        {/* Actualizar Imágenes del Vehículo */}
                        <Link href={route('imagenes.vehiculo', { id })}>
                            <div className="group cursor-pointer rounded-lg border-2 border-[#e2e8f0] bg-[#ffffff] p-8 shadow-sm transition-all duration-300 hover:border-[#00AEEF] hover:shadow-lg dark:border-[#20384b] dark:bg-[#1a2c3a] dark:hover:border-[#00AEEF]">
                                <div className="flex flex-col items-center space-y-4 text-center">
                                    <div className="rounded-full bg-[#00AEEF]/10 p-6 transition-all duration-300 group-hover:bg-[#00AEEF]/20">
                                        <Images className="h-12 w-12 text-[#00AEEF]" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-[#1e293b] dark:text-white/90">
                                        Actualizar Imágenes del Vehículo
                                    </h2>
                                    <p className="text-sm text-[#64748b] dark:text-white/70">
                                        Reemplace o agregue nuevas fotografías del vehículo
                                    </p>
                                    <Button className="mt-4 w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90">
                                        Actualizar
                                    </Button>
                                </div>
                            </div>
                        </Link>

                        {/* Actualizar Evaluación por Inspección */}
                        <Link href={route('evaluacion.inspeccion', { id })}>
                            <div className="group cursor-pointer rounded-lg border-2 border-[#e2e8f0] bg-[#ffffff] p-8 shadow-sm transition-all duration-300 hover:border-[#00AEEF] hover:shadow-lg dark:border-[#20384b] dark:bg-[#1a2c3a] dark:hover:border-[#00AEEF]">
                                <div className="flex flex-col items-center space-y-4 text-center">
                                    <div className="rounded-full bg-[#00AEEF]/10 p-6 transition-all duration-300 group-hover:bg-[#00AEEF]/20">
                                        <ClipboardCheck className="h-12 w-12 text-[#00AEEF]" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-[#1e293b] dark:text-white/90">
                                        Actualizar Evaluación de Depreciación por Inspección
                                    </h2>
                                    <p className="text-sm text-[#64748b] dark:text-white/70">
                                        Modifique la inspección visual y documental del vehículo
                                    </p>
                                    <Button className="mt-4 w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90">
                                        Actualizar
                                    </Button>
                                </div>
                            </div>
                        </Link>

                        {/* Actualizar Evaluación por Condiciones Mecánicas */}
                        <Link href={route('evaluacion.mecanica', { id })}>
                            <div className="group cursor-pointer rounded-lg border-2 border-[#e2e8f0] bg-[#ffffff] p-8 shadow-sm transition-all duration-300 hover:border-[#00AEEF] hover:shadow-lg dark:border-[#20384b] dark:bg-[#1a2c3a] dark:hover:border-[#00AEEF]">
                                <div className="flex flex-col items-center space-y-4 text-center">
                                    <div className="rounded-full bg-[#00AEEF]/10 p-6 transition-all duration-300 group-hover:bg-[#00AEEF]/20">
                                        <Wrench className="h-12 w-12 text-[#00AEEF]" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-[#1e293b] dark:text-white/90">
                                        Actualizar Evaluación por Condiciones Mecánicas
                                    </h2>
                                    <p className="text-sm text-[#64748b] dark:text-white/70">
                                        Modifique la evaluación técnica del estado mecánico
                                    </p>
                                    <Button className="mt-4 w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90">
                                        Actualizar
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
