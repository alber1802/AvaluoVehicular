import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Pencil } from 'lucide-react';
import { Pagination } from './pagination';
import { useState } from 'react';
import { route } from 'ziggy-js';
import { Head, router } from '@inertiajs/react';

const evaluations = [
    {
        id: 1,
        vehicle: 'Mazda CX-5',
        year: '2023',
        plate: 'ABC-123',
        date: '15/07/2024',
        value: '$32,000',
        image: '/placeholder-car.png',
    },
    {
        id: 2,
        vehicle: 'Ford Mustang',
        year: '2022',
        plate: 'XYZ-789',
        date: '14/07/2024',
        value: '$45,500',
        image: '/placeholder-car.png',
    },
    {
        id: 3,
        vehicle: 'Toyota RAV4',
        year: '2024',
        plate: 'PQR-456',
        date: '14/07/2024',
        value: '$28,900',
        image: '/placeholder-car.png',
    },
];


export function RecentEvaluations() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const ViewVehiculo = () => {
        router.get(route('resultados.avaluo.viewResultados'));
    };

    const EditVehiculo = () => {
        router.get(route('resultados.avaluo.editResultados'));
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
                            {evaluations.map((evaluation) => (
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
                                        {evaluation.date}
                                    </td>
                                    <td className="py-4">
                                        <span className="font-semibold text-[#00AEEF]">
                                            {evaluation.value}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={ViewVehiculo}
                                                className="h-8 w-8 text-[#64748b] hover:bg-[#00AEEF]/10 hover:text-[#00AEEF] dark:text-white/70 dark:hover:bg-[#00AEEF]/20 dark:hover:text-[#00AEEF]"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={EditVehiculo}
                                                size="icon"
                                                className="h-8 w-8 text-[#64748b] hover:bg-[#00AEEF]/10 hover:text-[#00AEEF] dark:text-white/70 dark:hover:bg-[#00AEEF]/20 dark:hover:text-[#00AEEF]"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="pt-4"
                />
            </CardContent>
        </Card>
    );
}
