import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import Inf_mecanica from '../components/Inf_mecanica';
import Toast from '@/components/Toast';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Evaluación Mecánica',
        href: '#',
    },
];

export default function EvaluacionMecanica({ id, evaluacion_mecanica }: { id: string, evaluacion_mecanica: any }) {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');



    const handleSubmit = (data: any) => {
        // Aquí puedes enviar los datos al backend
        router.post(route('evaluacion.mecanica.update', { id }), data, {
            onSuccess: () => {
                setToastMessage('✅ Evaluación mecánica guardada correctamente');
                setToastType('success');
                setShowToast(true);
            },
            onError: () => {
                setToastMessage('❌ Error al guardar la evaluación mecánica');
                setToastType('error');
                setShowToast(true);
            }
        });
    };

    const handleCancel = () => {
        router.visit(route('dashboard'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Evaluación por Condiciones Mecánicas Generales" />

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1e293b] dark:text-white/90">
                        Evaluación por Condiciones Mecánicas Generales
                    </h1>
                    <p className="mt-3 text-sl text-[#475569] dark:text-white/80">
                        Complete la inspección técnica del vehículo seleccionando el estado de cada componente
                    </p>
                    <div className="mt-6 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-6 dark:border-[#20384b] dark:bg-[#0f1a23]">
                        <p className="text-sl font-medium text-[#1e293b] dark:text-white/90 mb-3">
                            Leyenda de estados:
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <span className="text-[#475569] dark:text-white/80">
                                <strong>B:</strong> Bueno
                            </span>
                            <span className="text-[#475569] dark:text-white/80">
                                <strong>R:</strong> Regular
                            </span>
                            <span className="text-[#475569] dark:text-white/80">
                                <strong>RC:</strong> Requiere Cambio
                            </span>
                            <span className="text-[#475569] dark:text-white/80">
                                <strong>RR:</strong> Requiere Reparación
                            </span>
                            <span className="text-[#475569] dark:text-white/80">
                                <strong>SI/NO:</strong> Disponibilidad
                            </span>
                        </div>
                    </div>
                </div>

                <Inf_mecanica
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    evaluacion_mecanica={evaluacion_mecanica}
                />
            </div>
        </AppLayout>
    );
}

