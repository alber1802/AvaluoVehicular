import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState, useMemo, useEffect } from 'react';
import { type Auth } from '@/types';
import Toast from '@/components/Toast';
import { SearchBar } from './components/SearchBar';
import { StatsCards } from './components/StatsCards';
import { SharedTableRow } from './components/SharedTableRow';
import { SharedDetailModal } from './components/SharedDetailModal';
import { EditSharedModal } from './components/EditSharedModal';
import { ConfirmationDialog } from './components/ConfirmationDialog';
import { RenovarModal } from './components/RenovarModal';
import {
    type AvaluoCompartido,
    type SharedStats,
    type StatusFilter,
    type TypeFilter,
    type User
} from './types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Compartidos',
        href: '',
    },
];

interface Props {
    auth: Auth;
    compartidos: AvaluoCompartido[];
    misCompartidos: AvaluoCompartido[];
    compartidosConmigo: AvaluoCompartido[];
    stats: SharedStats;
    usuarios: User[];
    isAdmin: boolean;
}

export default function ListShared({
    auth,
    compartidos = [],
    misCompartidos = [],
    compartidosConmigo = [],
    stats,
    usuarios = [],
    isAdmin
}: Props) {
    const { flash, errors } = usePage<{
        flash: { success?: string; error?: string };
        errors: Record<string, string>;
    }>().props;

    // Estados para filtros
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

    // Estados para modales
    const [selectedItem, setSelectedItem] = useState<AvaluoCompartido | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isRenovarModalOpen, setIsRenovarModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean;
        title: string;
        description: string;
        onConfirm: () => void;
        variant: 'danger' | 'warning';
    }>({
        isOpen: false,
        title: '',
        description: '',
        onConfirm: () => { },
        variant: 'danger',
    });

    // Toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

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

    // Filtrar compartidos
    const filteredCompartidos = useMemo(() => {
        let result = compartidos;

        // Filtro por estado
        if (statusFilter !== 'all') {
            result = result.filter((item) => item.estado === statusFilter);
        }

        // Filtro por tipo (solo para evaluador)
        if (!isAdmin && typeFilter !== 'all') {
            result = result.filter((item) => item.tipo === typeFilter);
        }

        // Filtro por búsqueda de texto
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (item) =>
                    item.avaluo?.vehiculo?.marca?.nombre?.toLowerCase().includes(query) ||
                    item.avaluo?.vehiculo?.modelo?.toLowerCase().includes(query) ||
                    item.avaluo?.vehiculo?.placa?.toLowerCase().includes(query) ||
                    item.user?.name?.toLowerCase().includes(query) ||
                    item.user?.email?.toLowerCase().includes(query) ||
                    item.motivo?.toLowerCase().includes(query) ||
                    item.propietario?.name?.toLowerCase().includes(query)
            );
        }

        return result;
    }, [searchQuery, statusFilter, typeFilter, compartidos, isAdmin]);

    // Handlers
    const handleView = (item: AvaluoCompartido) => {
        setSelectedItem(item);
        setIsDetailModalOpen(true);
    };


    const handleInfo = (item: AvaluoCompartido) => {
        router.get(route('resultados.avaluo', item.avaluo_id));

    };

    const handleEdit = (item: AvaluoCompartido) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);
    };

    const handleEditConfirm = (
        id: number,
        data: {
            fecha_inicio: string | null;
            fecha_fin: string | null;
            motivo: string;
            estado: string;
            observaciones: string | null;
        }
    ) => {
        router.post(route('avaluo.share.update', id), data, {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditModalOpen(false);
                setSelectedItem(null);
            },
        });
    };

    const handleDelete = (item: AvaluoCompartido) => {
        setConfirmDialog({
            isOpen: true,
            title: '¿Eliminar compartido?',
            description: `¿Estás seguro de que deseas eliminar este compartido de ${item.avaluo?.vehiculo?.marca?.nombre} ${item.avaluo?.vehiculo?.modelo}? Esta acción no se puede deshacer.`,
            variant: 'danger',
            onConfirm: () => {
                router.delete(route('avaluo.share.destroy', item.id), {
                    preserveScroll: true,
                });
            },
        });
    };

    const handleRenovar = (item: AvaluoCompartido) => {
        setSelectedItem(item);
        setIsRenovarModalOpen(true);
    };

    const handleRenovarConfirm = (id: number, data: { fecha_fin: string }) => {
        router.post(route('avaluo.share.renovar', id), data, {
            preserveScroll: true,
            onSuccess: () => {
                setIsRenovarModalOpen(false);
                setSelectedItem(null);
            },
        });
    };

    // Verificar si el usuario puede editar un compartido (solo el dueño del avalúo)
    const canEdit = (item: AvaluoCompartido) => {
        if (isAdmin) return true;
        return item.tipo === 'compartido_por_mi';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
            <Head title="Avalúos Compartidos" />

            <div className="space-y-6 m-1 lg:m-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1e293b] dark:text-white/90">
                            {isAdmin ? 'Todos los Compartidos' : 'Mis Avalúos Compartidos'}
                        </h1>
                        <p className="text-[#64748b] dark:text-white/70 mt-1">
                            {isAdmin
                                ? 'Visualiza todos los avalúos compartidos del sistema'
                                : 'Gestiona los avalúos que has compartido y los que te han compartido'
                            }
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <StatsCards stats={stats} isAdmin={isAdmin} />

                {/* Search Bar and Filters */}
                <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        statusFilter={statusFilter}
                        onStatusFilterChange={setStatusFilter}
                        typeFilter={typeFilter}
                        onTypeFilterChange={setTypeFilter}
                        isAdmin={isAdmin}
                    />
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#f8fafc] dark:bg-[#0f1a23] border-b border-[#e2e8f0] dark:border-[#20384b]">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Vehículo
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        {isAdmin ? 'Usuario' : 'De / Para'}
                                    </th>
                                    {!isAdmin && (
                                        <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider hidden sm:table-cell">
                                            Tipo
                                        </th>
                                    )}
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider hidden md:table-cell">
                                        Motivo
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider hidden lg:table-cell">
                                        Período
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider hidden xl:table-cell">
                                        Enlace
                                    </th>
                                    {/* <th className="px-4 py-3 text-center text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider hidden xl:table-cell">
                                        Vistas
                                    </th> */}
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#20384b]">
                                {filteredCompartidos.length > 0 ? (
                                    filteredCompartidos.map((item) => (
                                        <SharedTableRow
                                            key={item.id}
                                            item={item}
                                            isAdmin={isAdmin}
                                            onView={handleView}
                                            onInfo={handleInfo}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                            onRenovar={handleRenovar}
                                            canEdit={canEdit(item)}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={isAdmin ? 8 : 9}
                                            className="px-6 py-12 text-center text-[#64748b] dark:text-white/70"
                                        >
                                            No se encontraron avalúos compartidos que coincidan con tu búsqueda
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <SharedDetailModal
                item={selectedItem}
                isOpen={isDetailModalOpen}
                onClose={() => {
                    setIsDetailModalOpen(false);
                    setSelectedItem(null);
                }}
            />

            <EditSharedModal
                item={selectedItem}
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedItem(null);
                }}
                onConfirm={handleEditConfirm}
                errors={errors}
            />

            <RenovarModal
                item={selectedItem}
                isOpen={isRenovarModalOpen}
                onClose={() => {
                    setIsRenovarModalOpen(false);
                    setSelectedItem(null);
                }}
                onConfirm={handleRenovarConfirm}
                errors={errors}
            />

            <ConfirmationDialog
                isOpen={confirmDialog.isOpen}
                onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                onConfirm={confirmDialog.onConfirm}
                title={confirmDialog.title}
                description={confirmDialog.description}
                variant={confirmDialog.variant}
            />
        </AppLayout>
    );
}
