import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import InspeccionFallas from '../components/InspeccionFallas';
import Toast from '@/components/Toast';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Elección Avalúo',
        href: '#',
    },
    {
        title: 'Evaluación por Inspección',
        href: '#',
    },
];

export default function EvaluacionInspeccion({ id }: { id: number }) {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        }
        if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash]);

    const handleSubmit = (data: any) => {
        // Aquí puedes enviar los datos al backend
        router.post(route('evaluacion.inspeccion.store', { id }), { data }, {
            onSuccess: () => {
                setToastMessage('✅ Evaluación por inspección registrada exitosamente');
                setToastType('success');
                setShowToast(true);
            },
            onError: () => {
                setToastMessage('❌ Error al registrar la evaluación por inspección');
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

                <InspeccionFallas onSubmit={handleSubmit} onCancel={handleCancel} />
            </div>
        </AppLayout>
    );
}
