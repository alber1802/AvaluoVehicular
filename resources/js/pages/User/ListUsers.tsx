import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { UserTableRow } from './components/UserTableRow';
import { UserDetailModal } from './components/UserDetailModal';
import { ConfirmationDialog } from './components/ConfirmationDialog';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { ChangeRoleModal } from './components/ChangeRoleModal';
import { CreateUserModal } from './components/CreateUserModal';
import { EditUserModal } from './components/EditUserModal';
import { type User } from './types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Lista Usuarios',
        href: '/usuarios/listado',
    },
];

// Datos de ejemplo - Reemplazar con datos reales del backend
const mockUsers: User[] = [
    {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '+57 300 123 4567',
        role: 'Administrador',
        is_active: true,
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z',
    },
    {
        id: 2,
        name: 'María García',
        email: 'maria.garcia@example.com',
        phone: '+57 301 234 5678',
        role: 'Evaluador',
        is_active: true,
        created_at: '2024-02-20T14:20:00Z',
        updated_at: '2024-02-20T14:20:00Z',
    },
    {
        id: 3,
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@example.com',
        phone: '+57 302 345 6789',
        role: 'Usuario',
        is_active: false,
        created_at: '2024-03-10T09:15:00Z',
        updated_at: '2024-03-10T09:15:00Z',
    },
    {
        id: 4,
        name: 'Ana Martínez',
        email: 'ana.martinez@example.com',
        phone: '+57 303 456 7890',
        role: 'Evaluador',
        is_active: true,
        created_at: '2024-04-05T16:45:00Z',
        updated_at: '2024-04-05T16:45:00Z',
    },
];

export default function ListUsers() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
        onConfirm: () => {},
        variant: 'danger',
    });

    // Filtrar usuarios según búsqueda
    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) return mockUsers;

        const query = searchQuery.toLowerCase();
        return mockUsers.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phone?.toLowerCase().includes(query) ||
                user.role.toLowerCase().includes(query),
        );
    }, [searchQuery]);

    // Handlers
    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setIsDetailModalOpen(true);
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleEditUserConfirm = (
        userId: number,
        userData: {
            name: string;
            email: string;
            phone: string;
            role: string;
        },
    ) => {
        console.log('Actualizar usuario:', userId, userData);
        // TODO: Implementar lógica de actualización con backend
    };

    const handleCreateUser = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateUserConfirm = (userData: {
        name: string;
        email: string;
        phone: string;
        password: string;
        role: string;
    }) => {
        console.log('Crear nuevo usuario:', userData);
        // TODO: Implementar lógica de creación con backend
    };

    const handleDeleteUser = (user: User) => {
        setConfirmDialog({
            isOpen: true,
            title: '¿Eliminar Usuario?',
            description: `¿Estás seguro de que deseas eliminar a ${user.name}? Esta acción no se puede deshacer y se eliminarán todos los datos asociados.`,
            variant: 'danger',
            onConfirm: () => {
                console.log('Usuario eliminado:', user);
                // TODO: Implementar lógica de eliminación
                setConfirmDialog({ ...confirmDialog, isOpen: false });
            },
        });
    };

    const handleSuspendUser = (user: User) => {
        const action = user.is_active ? 'suspender' : 'activar';
        setConfirmDialog({
            isOpen: true,
            title: `¿${action.charAt(0).toUpperCase() + action.slice(1)} Usuario?`,
            description: `¿Estás seguro de que deseas ${action} a ${user.name}? ${
                user.is_active
                    ? 'El usuario no podrá acceder al sistema.'
                    : 'El usuario podrá acceder nuevamente al sistema.'
            }`,
            variant: 'warning',
            onConfirm: () => {
                console.log(`Usuario ${action}:`, user);
                // TODO: Implementar lógica de suspensión/activación
                setConfirmDialog({ ...confirmDialog, isOpen: false });
            },
        });
    };

    const handleChangePassword = (user: User) => {
        setSelectedUser(user);
        setIsChangePasswordModalOpen(true);
    };

    const handleChangePasswordConfirm = (userId: number, newPassword: string) => {
        console.log('Cambiar contraseña para usuario:', userId, 'Nueva contraseña:', newPassword);
        // TODO: Implementar lógica de cambio de contraseña con backend
    };

    const handleChangeRole = (user: User) => {
        setSelectedUser(user);
        setIsChangeRoleModalOpen(true);
    };

    const handleChangeRoleConfirm = (userId: number, newRole: string) => {
        console.log('Cambiar rol para usuario:', userId, 'Nuevo rol:', newRole);
        // TODO: Implementar lógica de cambio de rol con backend
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de Usuarios del Sistema" />

                <div className="space-y-6 m-1 lg:m-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1e293b] dark:text-white/90">
                            Gestión de Usuarios
                        </h1>
                        <p className="text-[#64748b] dark:text-white/70 mt-1">
                            Administra los usuarios del sistema
                        </p>
                    </div>
                    <Button
                        onClick={handleCreateUser}
                        className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white"
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Nuevo Usuario
                    </Button>
                </div>

                {/* Search Bar */}
                <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Total Usuarios
                        </p>
                        <p className="text-2xl font-bold text-[#1e293b] dark:text-white/90 mt-1">
                            {mockUsers.length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Usuarios Activos
                        </p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                            {mockUsers.filter((u) => u.is_active).length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Usuarios Suspendidos
                        </p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                            {mockUsers.filter((u) => !u.is_active).length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Resultados
                        </p>
                        <p className="text-2xl font-bold text-[#00AEEF] mt-1">
                            {filteredUsers.length}
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
                                        Usuario
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Teléfono
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Rol
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Fecha Registro
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#64748b] dark:text-white/70 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#20384b]">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <UserTableRow
                                            key={user.id}
                                            user={user}
                                            onView={handleViewUser}
                                            onEdit={handleEditUser}
                                            onDelete={handleDeleteUser}
                                            onSuspend={handleSuspendUser}
                                            onChangePassword={handleChangePassword}
                                            onChangeRole={handleChangeRole}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-12 text-center text-[#64748b] dark:text-white/70"
                                        >
                                            No se encontraron usuarios que coincidan con tu
                                            búsqueda
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <UserDetailModal
                user={selectedUser}
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
            />

            <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onConfirm={handleCreateUserConfirm}
            />

            <EditUserModal
                user={selectedUser}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onConfirm={handleEditUserConfirm}
            />

            <ChangePasswordModal
                user={selectedUser}
                isOpen={isChangePasswordModalOpen}
                onClose={() => setIsChangePasswordModalOpen(false)}
                onConfirm={handleChangePasswordConfirm}
            />

            <ChangeRoleModal
                user={selectedUser}
                isOpen={isChangeRoleModalOpen}
                onClose={() => setIsChangeRoleModalOpen(false)}
                onConfirm={handleChangeRoleConfirm}
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
