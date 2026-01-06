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
    MoreVertical,
    Trash2,
    Eye,
    RefreshCw,
    Link2,
    ExternalLink,
    Copy,
    ArrowUpRight,
    ArrowDownLeft,
    Info,
} from 'lucide-react';
import { type AvaluoCompartido } from '../types';
import { useState } from 'react';

interface SharedTableRowProps {
    item: AvaluoCompartido;
    isAdmin: boolean;
    onView: (item: AvaluoCompartido) => void;
    onInfo: (item: AvaluoCompartido) => void;
    onEdit: (item: AvaluoCompartido) => void;
    onDelete: (item: AvaluoCompartido) => void;
    onRenovar: (item: AvaluoCompartido) => void;
    canEdit: boolean; // Solo el dueño puede editar
}

export function SharedTableRow({
    item,
    isAdmin,
    onView,
    onInfo,
    onEdit,
    onDelete,
    onRenovar,
    canEdit,
}: SharedTableRowProps) {
    const [copied, setCopied] = useState(false);

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Sin fecha';
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const copyToken = () => {
        if (item.token) {
            navigator.clipboard.writeText(`${window.location.origin}/avaluo/publico/${item.token}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getStatusBadge = (estado: string) => {
        const styles = {
            activo: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            vencido: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
            renovado: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
        };
        return styles[estado as keyof typeof styles] || styles.vencido;
    };

    const getTypeBadge = () => {
        if (item.tipo === 'compartido_por_mi') {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                    <ArrowUpRight className="w-3 h-3" />
                    Enviado
                </span>
            );
        }
        if (item.tipo === 'compartido_conmigo') {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                    <ArrowDownLeft className="w-3 h-3" />
                    Recibido
                </span>
            );
        }
        return null;
    };

    return (
        <tr className="border-b border-[#e2e8f0] dark:border-[#20384b] hover:bg-[#f8fafc] dark:hover:bg-[#1a2c3a] transition-colors">
            {/* Vehículo */}
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00AEEF]/10 flex items-center justify-center text-[#00AEEF] font-semibold text-sm">
                        {item.avaluo?.vehiculo?.marca?.nombre?.charAt(0) || '?'}
                    </div>
                    <div className="min-w-0">
                        <p className="font-medium text-[#1e293b] dark:text-white/90 truncate">
                            {item.avaluo?.vehiculo?.marca?.nombre || 'N/A'} {item.avaluo?.vehiculo?.modelo || ''}
                        </p>
                        <p className="text-xs text-[#64748b] dark:text-white/70">
                            {item.avaluo?.vehiculo?.placa || 'Sin placa'}
                        </p>
                    </div>
                </div>
            </td>

            {/* Usuario compartido */}
            <td className="px-4 py-4">
                <div className="min-w-0">
                    <p className="font-medium text-[#1e293b] dark:text-white/90 truncate">
                        {item.tipo === 'compartido_conmigo'
                            ? (item.propietario?.name || 'Desconocido')
                            : (item.user?.name || 'N/A')
                        }
                    </p>
                    <p className="text-xs text-[#64748b] dark:text-white/70 truncate">
                        {item.tipo === 'compartido_conmigo'
                            ? (item.propietario?.email || '')
                            : (item.user?.email || '')
                        }
                    </p>
                </div>
            </td>

            {/* Tipo (solo evaluador) */}
            {!isAdmin && (
                <td className="px-4 py-4 hidden sm:table-cell">
                    {getTypeBadge()}
                </td>
            )}

            {/* Motivo */}
            <td className="px-4 py-4 hidden md:table-cell">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00AEEF]/10 text-[#00AEEF] capitalize">
                    {item.motivo}
                </span>
            </td>

            {/* Fechas */}
            <td className="px-4 py-4 hidden lg:table-cell">
                <div className="text-xs">
                    <p className="text-[#64748b] dark:text-white/70">
                        <span className="font-medium">Inicio:</span> {formatDate(item.fecha_inicio)}
                    </p>
                    <p className="text-[#64748b] dark:text-white/70">
                        <span className="font-medium">Fin:</span> {formatDate(item.fecha_fin)}
                    </p>
                </div>
            </td>

            {/* Estado */}
            <td className="px-4 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadge(item.estado)}`}>
                    {item.estado}
                </span>
            </td>

            {/* Token */}
            <td className="px-4 py-4 hidden xl:table-cell">
                {item.token ? (
                    <div className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-purple-500" />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyToken}
                            className="text-xs text-purple-600 hover:text-purple-700 p-1 h-auto"
                        >
                            {copied ? 'Copiado!' : 'Copiar enlace'}
                            <Copy className="w-3 h-3 ml-1" />
                        </Button>
                    </div>
                ) : (
                    <span className="text-xs text-[#64748b] dark:text-white/50">Sin enlace</span>
                )}
            </td>

            {/* Vistas 
            <td className="px-4 py-4 hidden xl:table-cell text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f8fafc] dark:bg-[#0f1a23] text-sm font-medium text-[#64748b] dark:text-white/70">
                    {item.contador_vistas || 0}
                </span>
            </td>*/}

            {/* Acciones */}
            <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onInfo(item)}
                        className="text-[#00AEEF] hover:text-[#00AEEF] hover:bg-[#00AEEF]/10"
                    >
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(item)}
                        className="text-[#00AEEF] hover:text-[#00AEEF] hover:bg-[#00AEEF]/10"
                    >
                        <Info className="w-4 h-4" />
                    </Button>

                    {canEdit && (
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
                                    onClick={() => onEdit(item)}
                                    className="cursor-pointer text-[#1e293b] dark:text-white/90"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Editar
                                </DropdownMenuItem>

                                {item.estado === 'vencido' && (
                                    <DropdownMenuItem
                                        onClick={() => onRenovar(item)}
                                        className="cursor-pointer text-amber-600 dark:text-amber-400"
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Renovar
                                    </DropdownMenuItem>
                                )}

                                {item.token && (
                                    <DropdownMenuItem
                                        onClick={() => window.open(`/avaluo/publico/${item.token}`, '_blank')}
                                        className="cursor-pointer text-purple-600 dark:text-purple-400"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Ver enlace público
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator className="bg-[#e2e8f0] dark:bg-[#20384b]" />

                                <DropdownMenuItem
                                    onClick={() => onDelete(item)}
                                    className="cursor-pointer text-red-600 dark:text-red-400"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </td>
        </tr>
    );
}
