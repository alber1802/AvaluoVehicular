import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Wrench } from 'lucide-react';
import { consultar } from '@/routes/depreciacion';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Depreciación',
        href: consultar().url,
    },
];

export default function CondicionesGenerales() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de todos lo Usuarios del Sistema" />
        </AppLayout>
    );
}

