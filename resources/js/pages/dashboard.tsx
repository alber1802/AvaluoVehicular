import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DashboardHeader } from './Dashboard/components/dashboard-header';
import { StatsCards } from './Dashboard/components/stats-cards';
import { RecentEvaluations } from './Dashboard/components/recent-evaluations';
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Toast from '@/components/Toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard(datos: any) {
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    // Detectar cuando llega un flash message
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}

            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <DashboardHeader
                    marcas={datos.marcas}
                    años_vehiculo={datos.años_vehiculo}
                    filters={datos.filters} />

                <StatsCards
                    vehiculosHoy={datos.vehiculosHoy}
                    pendientes={datos.pendientes}
                    valoracionPromedio={datos.valoracionPromedio}
                    comparacionAyer={datos.comparacionAyer}
                    avaluos={datos.avaluos}
                />
                <RecentEvaluations
                    vehiculos={datos.vehiculos}
                />
            </div>
        </AppLayout>
    );
}

