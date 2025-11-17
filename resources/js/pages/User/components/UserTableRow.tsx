import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Edit,
    Key,
    MoreVertical,
    Pause,
    Shield,
    Trash2,
    Eye,
} from 'lucide-react';
import { type User } from '../types';

interface UserTableRowProps {
    user: User;
    onView: (user: User) => void;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    onSuspend: (user: User) => void;
    onChangePassword: (user: User) => void;
    onChangeRole: (user: User) => void;
}

export function UserTableRow({
    user,
    onView,
    onEdit,
    onDelete,
    onSuspend,
    onChangePassword,
    onChangeRole,
}: UserTableRowProps) {
    return (
        <tr className="border-b border-[#e2e8f0] dark:border-[#20384b] hover:bg-[#f8fafc] dark:hover:bg-[#1a2c3a] transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00AEEF] flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-medium text-[#1e293b] dark:text-white/90">
                            {user.name}
                        </p>
                        <p className="text-sm text-[#64748b] dark:text-white/70">
                            {user.email}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-[#64748b] dark:text-white/70">
                {user.phone || 'N/A'}
            </td>
            <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00AEEF]/10 text-[#00AEEF]">
                    {user.role}
                </span>
            </td>
            <td className="px-6 py-4 text-[#64748b] dark:text-white/70">
                {new Date(user.created_at).toLocaleDateString('es-ES')}
            </td>
            <td className="px-6 py-4">
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.is_active
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                >
                    {user.is_active ? 'Activo' : 'Inactivo'}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(user)}
                        className="text-[#00AEEF] hover:text-[#00AEEF] hover:bg-[#00AEEF]/10"
                    >
                        <Eye className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#64748b] dark:text-white/70"
                            >
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b]"
                        >
                            <DropdownMenuItem
                                onClick={() => onEdit(user)}
                                className="cursor-pointer text-[#1e293b] dark:text-white/90"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onChangeRole(user)}
                                className="cursor-pointer text-[#1e293b] dark:text-white/90"
                            >
                                <Shield className="w-4 h-4 mr-2" />
                                Cambiar Rol
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onChangePassword(user)}
                                className="cursor-pointer text-[#1e293b] dark:text-white/90"
                            >
                                <Key className="w-4 h-4 mr-2" />
                                Cambiar Contraseña
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-[#e2e8f0] dark:bg-[#20384b]" />
                            <DropdownMenuItem
                                onClick={() => onSuspend(user)}
                                className="cursor-pointer text-orange-600 dark:text-orange-400"
                            >
                                <Pause className="w-4 h-4 mr-2" />
                                {user.is_active ? 'Suspender' : 'Activar'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDelete(user)}
                                className="cursor-pointer text-red-600 dark:text-red-400"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </td>
        </tr>
    );
}
