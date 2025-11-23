import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index as reciclaje } from '@/routes/reciclaje';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { AlertTriangle, Trash2, RotateCcw } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { AvaluoTableRow } from './components/AvaluoTableRow';
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog';
import { type AvaluoEliminado } from './types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Reciclaje',
        href: reciclaje().url,
    },
];

// Datos de ejemplo - Reemplazar con datos reales del backend
const mockAvaluos: AvaluoEliminado[] = [
    {
        id: 1,
        entidad: 'Empresa ABC S.A.',
        marca: 'Toyota',
        modelo: 'Corolla',
        ano_fabricacion: '2018',
        placa: 'ABC-123',
        fecha_evaluacion: '2024-10-15T10:30:00Z',
        deleted_at: '2024-11-15T14:20:00Z',
        dias_restantes: 24,
    },
    {
        id: 2,
        entidad: 'Transportes XYZ Ltda.',
        marca: 'Chevrolet',
        modelo: 'Spark',
        ano_fabricacion: '2020',
        placa: 'XYZ-456',
        fecha_evaluacion: '2024-09-20T09:15:00Z',
        deleted_at: '2024-11-10T11:30:00Z',
        dias_restantes: 19,
    },
    {
        id: 3,
        entidad: 'Comercial DEF',
        marca: 'Mazda',
        modelo: '3',
        ano_fabricacion: '2019',
        placa: 'DEF-789',
        fecha_evaluacion: '2024-08-05T16:45:00Z',
        deleted_at: '2024-11-18T08:10:00Z',
        dias_restantes: 27,
    },
    {
        id: 4,
        entidad: 'Servicios GHI S.A.S.',
        marca: 'Nissan',
        modelo: 'Sentra',
        ano_fabricacion: '2017',
        placa: 'GHI-012',
        fecha_evaluacion: '2024-07-12T13:20:00Z',
        deleted_at: '2024-11-20T15:45:00Z',
        dias_restantes: 29,
    },
    {
        id: 5,
        entidad: 'Logística JKL',
        marca: 'Renault',
        modelo: 'Logan',
        ano_fabricacion: '2021',
        placa: 'JKL-345',
        fecha_evaluacion: '2024-11-01T10:00:00Z',
        deleted_at: '2024-11-16T12:00:00Z',
        dias_restantes: 25,
    },
];

export default function ReciclajeIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAvaluo, setSelectedAvaluo] = useState<AvaluoEliminado | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Filtrar avalúos según búsqueda
    const filteredAvaluos = useMemo(() => {
        if (!searchQuery.trim()) return mockAvaluos;

        const query = searchQuery.toLowerCase();
        return mockAvaluos.filter(
            (avaluo) =>
                avaluo.entidad.toLowerCase().includes(query) ||
                avaluo.marca.toLowerCase().includes(query) ||
                avaluo.modelo.toLowerCase().includes(query) ||
                avaluo.placa?.toLowerCase().includes(query) ||
                avaluo.ano_fabricacion.includes(query),
        );
    }, [searchQuery]);

    // Handlers
    const handleViewAvaluo = (avaluo: AvaluoEliminado) => {
        console.log('Ver avalúo:', avaluo);
        // TODO: Implementar vista detallada del avalúo
    };

    const handleRestoreAvaluo = (avaluo: AvaluoEliminado) => {
        console.log('Restaurar avalúo:', avaluo);
        // TODO: Implementar lógica de restauración con backend
    };

    const handleDeleteAvaluo = (avaluo: AvaluoEliminado) => {
        setSelectedAvaluo(avaluo);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedAvaluo) {
            console.log('Eliminar permanentemente avalúo:', selectedAvaluo);
            // TODO: Implementar lógica de eliminación permanente con backend
            setIsDeleteDialogOpen(false);
            setSelectedAvaluo(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Papelera de Reciclaje - Avalúos Eliminados" />

            <div className="space-y-6 m-1 lg:m-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1e293b] dark:text-white/90">
                            Papelera de Reciclaje
                        </h1>
                        <p className="text-[#64748b] dark:text-white/70 mt-1">
                            Avalúos eliminados pendientes de eliminación permanente
                        </p>
                    </div>

                </div>

                {/* Aviso de Eliminación Automática */}
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-orange-900 dark:text-orange-300">
                                Eliminación Automática en 30 Días
                            </h3>
                            <p className="text-sm text-orange-800 dark:text-orange-400 mt-1">
                                Los avalúos eliminados se conservan temporalmente en la papelera de reciclaje.
                                Después de <span className="font-semibold">30 días</span>, serán eliminados
                                automáticamente y de forma permanente del sistema. Puedes restaurarlos antes
                                de que se cumpla este plazo o eliminarlos manualmente de forma inmediata.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Total Eliminados
                        </p>
                        <p className="text-2xl font-bold text-[#1e293b] dark:text-white/90 mt-1">
                            {mockAvaluos.length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Eliminación Próxima (≤7 días)
                        </p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                            {mockAvaluos.filter((a) => a.dias_restantes <= 7).length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Advertencia (≤15 días)
                        </p>
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                            {mockAvaluos.filter((a) => a.dias_restantes > 7 && a.dias_restantes <= 15).length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Resultados
                        </p>
                        <p className="text-2xl font-bold text-[#00AEEF] mt-1">
                            {filteredAvaluos.length}
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#f8fafc] dark:bg-[#0f1a23] border-b border-[#e2e8f0] dark:border-[#20384b]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Entidad
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Vehículo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Año
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Placa
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Fecha Eliminación
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Días Restantes
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#20384b]">
                                {filteredAvaluos.length > 0 ? (
                                    filteredAvaluos.map((avaluo) => (
                                        <AvaluoTableRow
                                            key={avaluo.id}
                                            avaluo={avaluo}
                                            onView={handleViewAvaluo}
                                            onRestore={handleRestoreAvaluo}
                                            onDelete={handleDeleteAvaluo}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-12 text-center text-[#64748b] dark:text-white/70"
                                        >
                                            {searchQuery ? (
                                                <>
                                                    No se encontraron avalúos que coincidan con tu búsqueda
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center gap-3">
                                                    <RotateCcw className="w-12 h-12 text-[#64748b] dark:text-white/70" />
                                                    <p>No hay avalúos en la papelera de reciclaje</p>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setSelectedAvaluo(null);
                }}
                onConfirm={handleConfirmDelete}
                avaluoInfo={
                    selectedAvaluo
                        ? {
                            entidad: selectedAvaluo.entidad,
                            marca: selectedAvaluo.marca,
                            modelo: selectedAvaluo.modelo,
                        }
                        : null
                }
            />
        </AppLayout>
    );
}
