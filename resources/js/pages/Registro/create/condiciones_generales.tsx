import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Wrench } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Elección Avalúo',
        href: '/registro/seleccionar',
    },
];

export default function CondicionesGenerales() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Elección de Método de Evaluación" />

            <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
                <div className="w-full max-w-4xl space-y-8 px-4">
                    {/* Título */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#1e293b] dark:text-white/90 md:text-4xl">
                            Elija qué método evaluará primero
                        </h1>
                        <p className="mt-3 text-base text-[#64748b] dark:text-white/70 md:text-lg">
                            Seleccione el tipo de evaluación que desea realizar
                        </p>
                    </div>

                    {/* Botones de selección */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Evaluación por Inspección */}
                        <Link href={route('evaluacion.inspeccion')}>
                            <div className="group cursor-pointer rounded-lg border-2 border-[#e2e8f0] bg-[#ffffff] p-8 shadow-sm transition-all duration-300 hover:border-[#00AEEF] hover:shadow-lg dark:border-[#20384b] dark:bg-[#1a2c3a] dark:hover:border-[#00AEEF]">
                                <div className="flex flex-col items-center space-y-4 text-center">
                                    <div className="rounded-full bg-[#00AEEF]/10 p-6 transition-all duration-300 group-hover:bg-[#00AEEF]/20">
                                        <ClipboardCheck className="h-12 w-12 text-[#00AEEF]" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-[#1e293b] dark:text-white/90">
                                        Evaluación de Depreciacion por Inspección
                                    </h2>
                                    <p className="text-sm text-[#64748b] dark:text-white/70">
                                        Inspección visual y documental del vehículo
                                    </p>
                                    <Button className="mt-4 w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90">
                                        Seleccionar
                                    </Button>
                                </div>
                            </div>
                        </Link>

                        {/* Evaluación por Condiciones Mecánicas */}
                        <Link href={route('evaluacion.mecanica')}>
                            <div className="group cursor-pointer rounded-lg border-2 border-[#e2e8f0] bg-[#ffffff] p-8 shadow-sm transition-all duration-300 hover:border-[#00AEEF] hover:shadow-lg dark:border-[#20384b] dark:bg-[#1a2c3a] dark:hover:border-[#00AEEF]">
                                <div className="flex flex-col items-center space-y-4 text-center">
                                    <div className="rounded-full bg-[#00AEEF]/10 p-6 transition-all duration-300 group-hover:bg-[#00AEEF]/20">
                                        <Wrench className="h-12 w-12 text-[#00AEEF]" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-[#1e293b] dark:text-white/90">
                                        Evaluación por Condiciones Mecánicas Generales
                                    </h2>
                                    <p className="text-sm text-[#64748b] dark:text-white/70">
                                        Evaluación técnica del estado mecánico del vehículo
                                    </p>
                                    <Button className="mt-4 w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90">
                                        Seleccionar
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

