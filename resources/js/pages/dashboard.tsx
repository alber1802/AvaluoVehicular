import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DashboardHeader } from './Dashboard/components/dashboard-header';
import { StatsCards } from './Dashboard/components/stats-cards';
import { RecentEvaluations } from './Dashboard/components/recent-evaluations';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard(datos: any) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
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

