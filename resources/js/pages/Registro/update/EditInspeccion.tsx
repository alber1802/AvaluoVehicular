import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import Inf_Inpeccion from '../components/Inf_Inpeccion';
import Toast from '@/components/Toast';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Evaluación por Inspección',
        href: '#',
    },
];

export default function EditInspeccion({ id, inspecciones }: { id: number, inspecciones: any }) {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');



    const handleSubmit = (data: any) => {
        // Aquí puedes enviar los datos al backend
        router.post(route('evaluacion.inspeccion.update', { id }), { data }, {
            onSuccess: () => {
                setToastMessage('✅ Evaluación por inspección actualizada exitosamente');
                setToastType('success');
                setShowToast(true);
            },
            onError: () => {
                setToastMessage('❌ Error al actualizar la evaluación por inspección');
                setToastType('error');
                setShowToast(true);
            }
        });
    };

    const handleCancel = () => {
        router.visit(route('condiciones.generales'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Evaluación por Inspección" />

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}

            <div className="h-full w-full px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[#1e293b] dark:text-white/90">
                        Evaluación por Inspección
                    </h1>
                    <p className="mt-2 text-sm text-[#64748b] dark:text-white/70">
                        Registre las fallas y defectos encontrados en el vehículo durante la inspección
                    </p>

                    {/* Summary Card */}
                    {inspecciones && inspecciones.length > 0 && (
                        <div className="mt-4 rounded-lg border border-[#00AEEF]/20 bg-gradient-to-r from-[#00AEEF]/5 to-[#00AEEF]/10 p-4 dark:border-[#00AEEF]/30 dark:from-[#00AEEF]/10 dark:to-[#00AEEF]/5">
                            <p className="text-sm font-semibold text-[#1e293b] dark:text-white/90 mb-3">
                                📊 Resumen de Inspección
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="rounded-md bg-white/50 dark:bg-[#0f1a23]/50 p-3">
                                    <p className="text-xs text-[#64748b] dark:text-white/60">Total de Inspecciones</p>
                                    <p className="text-2xl font-bold text-[#00AEEF]">{inspecciones.length}</p>
                                </div>
                                <div className="rounded-md bg-white/50 dark:bg-[#0f1a23]/50 p-3">
                                    <p className="text-xs text-[#64748b] dark:text-white/60">Items con Defectos</p>
                                    <p className="text-2xl font-bold text-[#00AEEF]">
                                        {inspecciones.filter((i: any) => i.tiene).length}
                                    </p>
                                </div>
                                <div className="rounded-md bg-white/50 dark:bg-[#0f1a23]/50 p-3">
                                    <p className="text-xs text-[#64748b] dark:text-white/60">Valoración Total</p>
                                    <p className="text-2xl font-bold text-[#00AEEF]">
                                        {(inspecciones.reduce((sum: number, i: any) =>
                                            sum + (i.tiene === true ? (parseFloat(i.valoracion) || 0) : 0), 0).toFixed(3)) * 100}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-[#20384b] dark:bg-[#0f1a23]">
                        <p className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                            Instrucciones:
                        </p>
                        <ul className="mt-2 space-y-1 text-xs text-[#64748b] dark:text-white/70">
                            <li>• Marque las casillas correspondientes si la característica presenta falla o defecto</li>
                            <li>• Agregue observaciones adicionales en el campo correspondiente si lo ve necesario</li>
                            <li>• Solo se guardarán los items marcados o con observaciones</li>
                            <li>• Cada característica tiene una valoración que se calculará automáticamente</li>
                        </ul>
                    </div>
                </div>

                <Inf_Inpeccion
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    inspecciones={inspecciones}
                />
            </div>
        </AppLayout>
    );
}
