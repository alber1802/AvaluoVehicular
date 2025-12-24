import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, ArrowRight, CookingPot, MoveRight } from 'lucide-react';
import { Pagination } from './pagination';
import { useState } from 'react';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { Head, router } from '@inertiajs/react';



export function RecentEvaluations({ vehiculos }: any) {

    // Acceder a los datos paginados correctamente
    const evaluations = vehiculos.data.map((vehiculo: any) => {
        return {
            id: vehiculo.id,
            vehicle: vehiculo.marca.nombre + ' ' + vehiculo.modelo,
            year: vehiculo.año_fabricacion,
            plate: vehiculo.placa,
            date: vehiculo.fecha_evaluacion,
            value: vehiculo.avaluo?.final_estimacion ? '$' + vehiculo.avaluo.final_estimacion : 'No evaluado',
            image: vehiculo.imagenes && vehiculo.imagenes.length > 0 ? vehiculo.imagenes[0].url : '/placeholder-car.png',
        };
    });

    // Usar la página actual y total de páginas de Laravel
    const currentPage = vehiculos.current_page;
    const totalPages = vehiculos.last_page;

    const ViewVehiculo = (id: number) => {
        router.get(route('resultados.avaluo', { id }));
    };

    const EditVehiculo = (id: number) => {
        router.get(route('resultados.avaluo.seleccionarEditar', { id: id }));
    };

    const DeleteVehiculo = (id: number) => {
        router.delete(route('reciclaje.destroy', { id }));
    };

    const ContinueEvaluation = (id: number) => {
        router.get(route('resultados.avaluo.continuar', { id }));
    };

    // Función para cambiar de página
    const handlePageChange = (page: number) => {
        router.get(route('dashboard'), { page }, {
            preserveState: true,
            preserveScroll: true,
        });
    };


    return (
        <Card className="border-[#e2e8f0] bg-white dark:border-[#20384b] dark:bg-[#1a2c3a]">
            <CardHeader>
                <CardTitle className="text-xl text-[#1e293b] dark:text-white/90 sm:text-2xl">Evaluaciones Recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="border-b border-[#e2e8f0] text-left text-sm text-[#64748b] dark:border-[#20384b] dark:text-white/70">
                                <th className="pb-3 font-medium">Vehículo</th>
                                <th className="hidden pb-3 font-medium sm:table-cell">Placa</th>
                                <th className="hidden pb-3 font-medium md:table-cell">Fecha de Evaluación</th>
                                <th className="pb-3 font-medium">Valor Estimado</th>
                                <th className="pb-3 font-medium">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluations.map((evaluation: any) => (
                                <tr
                                    key={evaluation.id}
                                    className="border-b border-[#e2e8f0] transition-colors hover:bg-[#f8fafc] last:border-0 dark:border-[#20384b] dark:hover:bg-[#20384b]/30"
                                >
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#f8fafc] ring-1 ring-[#e2e8f0] dark:bg-[#0f1a23] dark:ring-[#20384b]">
                                                <div className="flex h-full items-center justify-center text-xl">
                                                    🚗
                                                </div>
                                            </div>
                                            <div className="min-w-0">
                                                <div className="truncate font-medium text-[#1e293b] dark:text-white/90">{evaluation.vehicle}</div>
                                                <div className="text-sm text-[#64748b] dark:text-white/70">
                                                    {evaluation.year}
                                                </div>
                                                <div className="text-xs text-[#64748b] dark:text-white/70 sm:hidden">
                                                    {evaluation.plate}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden py-4 text-[#64748b] dark:text-white/70 sm:table-cell">
                                        {evaluation.plate}
                                    </td>
                                    <td className="hidden py-4 text-[#64748b] dark:text-white/70 md:table-cell">
                                        {new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(evaluation.date))}
                                    </td>
                                    <td className="py-4">
                                        <span className="font-semibold text-[#00AEEF]">
                                            {evaluation.value}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        {evaluation.value === 'No evaluado' ? (
                                            <div className="flex gap-2 space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => ContinueEvaluation(evaluation.id)}

                                                    className="h-10 w-10 text-[#64748b] hover:bg-[#00AEEF]/10
                                                        hover:text-[#00AEEF] dark:text-white/70 
                                                        dark:hover:bg-[#00AEEF]/20 dark:hover:text-[#00AEEF]"
                                                >
                                                    Cont..
                                                    {/* <MoveRight className="ml-1 h-4 w-4" /> */}
                                                    {/* <ArrowRight className="ml-1 h-4 w-4" /> */}
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    onClick={() => DeleteVehiculo(evaluation.id)}
                                                    size="icon"
                                                    className="h-8 w-8 text-[#64748b] hover:bg-[#00AEEF]/10 hover:text-
                                                    [#00AEEF] dark:text-white/70 dark:hover:bg-[#00AEEF]/20 
                                                    dark:hover:text-[#00AEEF]"
                                                >
                                                    <CookingPot className="h-4 w-4" />
                                                </Button>
                                            </div>

                                        ) : (
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => ViewVehiculo(evaluation.id)}
                                                    className="h-8 w-8 text-[#64748b] hover:bg-[#00AEEF]/10
                                                     hover:text-[#00AEEF] dark:text-white/70 
                                                     dark:hover:bg-[#00AEEF]/20 dark:hover:text-[#00AEEF]"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => EditVehiculo(evaluation.id)}
                                                    size="icon"
                                                    className="h-8 w-8 text-[#64748b] hover:bg-[#00AEEF]/10 
                                                    hover:text-[#00AEEF] dark:text-white/70 dark:hover:bg-
                                                    [#00AEEF]/20 dark:hover:text-[#00AEEF]"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => DeleteVehiculo(evaluation.id)}
                                                    size="icon"
                                                    className="h-8 w-8 text-[#64748b] hover:bg-[#00AEEF]/10 hover:text-
                                                    [#00AEEF] dark:text-white/70 dark:hover:bg-[#00AEEF]/20 
                                                    dark:hover:text-[#00AEEF]"
                                                >
                                                    <CookingPot className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="pt-4"
                />
            </CardContent>
        </Card>
    );
}
