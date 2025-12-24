import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { UserTableRow } from './components/UserTableRow';
import { UserDetailModal } from './components/UserDetailModal';
import { ConfirmationDialog } from './components/ConfirmationDialog';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { ChangeRoleModal } from './components/ChangeRoleModal';
import { CreateUserModal } from './components/CreateUserModal';
import { EditUserModal } from './components/EditUserModal';
import { type User } from './types';
import Toast from '@/components/Toast';

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

interface ListUsersProps {
    users: User[];
    auth: { user: User };
}

export default function ListUsers({ users, auth }: ListUsersProps) {
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
        onConfirm: () => { },
        variant: 'danger',
    });

    // Filtrar usuarios según búsqueda
    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) return users;

        const query = searchQuery.toLowerCase();
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phone?.toLowerCase().includes(query) ||
                user.role.toLowerCase().includes(query),
        );
    }, [searchQuery, users]);

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
        router.post(route('usuarios.update', userId), userData, {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditModalOpen(false);
            },
        });
    };

    const handleCreateUser = () => {
        setIsCreateModalOpen(true);
    };

    const handleDeleteUser = (user: User) => {
        setConfirmDialog({
            isOpen: true,
            title: '¿Eliminar Usuario?',
            description: `¿Estás seguro de que deseas eliminar a ${user.name}? Esta acción no se puede deshacer y se eliminarán todos los datos asociados.`,
            variant: 'danger',
            onConfirm: () => {
                router.delete(route('usuarios.destroy', user.id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        setConfirmDialog({ ...confirmDialog, isOpen: false });
                    },
                });
            },
        });
    };

    const handleSuspendUser = (user: User) => {
        const action = user.is_suspended ? 'suspender' : 'activar';
        setConfirmDialog({
            isOpen: true,
            title: `¿${action.charAt(0).toUpperCase() + action.slice(1)} Usuario?`,
            description: `¿Estás seguro de que deseas ${action} a ${user.name}? ${user.is_active
                ? 'El usuario no podrá acceder al sistema.'
                : 'El usuario podrá acceder nuevamente al sistema.'
                }`,
            variant: 'warning',
            onConfirm: () => {
                router.post(route('usuarios.suspend', user.id), {
                    is_suspended: !user.is_suspended,
                });
                setConfirmDialog({ ...confirmDialog, isOpen: false });
            },
        });
    };

    const handleChangePassword = (user: User) => {
        setSelectedUser(user);
        setIsChangePasswordModalOpen(true);
    };

    const handleChangePasswordConfirm = (userId: number, newPassword: string) => {
        router.post(route('usuarios.changePassword', userId), { password: newPassword }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsChangePasswordModalOpen(false);
            },
        });
    };

    const handleChangeRole = (user: User) => {
        setSelectedUser(user);
        setIsChangeRoleModalOpen(true);
    };

    const handleChangeRoleConfirm = (userId: number, newRole: string) => {
        router.post(route('usuarios.changeRole', userId), { role: newRole }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsChangeRoleModalOpen(false);
            },
        });
    };

    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Total Usuarios
                        </p>
                        <p className="text-2xl font-bold text-[#1e293b] dark:text-white/90 mt-1">
                            {users.length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Usuarios Activos
                        </p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                            {users.filter((u) => u.is_active).length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Usuarios Suspendidos
                        </p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                            {users.filter((u) => !u.is_suspended).length}
                        </p>
                    </div>
                    {/* <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                        <p className="text-[#64748b] dark:text-white/70 text-sm">
                            Resultados
                        </p>
                        <p className="text-2xl font-bold text-[#00AEEF] mt-1">
                            {filteredUsers.length}
                        </p>
                    </div> */}
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
                                        Suspensión
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
                                            auth={auth}
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
            />

            <EditUserModal
                user={selectedUser}
                auth={auth}
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
