import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    MoreVertical,
    Trash2,
    RotateCcw,
    Eye,
    Clock,
} from 'lucide-react';
import { type AvaluoEliminado } from '../types';

interface AvaluoTableRowProps {
    avaluo: AvaluoEliminado;
    onView: (avaluo: AvaluoEliminado) => void;
    onRestore: (avaluo: AvaluoEliminado) => void;
    onDelete: (avaluo: AvaluoEliminado) => void;
}

export function AvaluoTableRow({
    avaluo,
    onView,
    onRestore,
    onDelete,
}: AvaluoTableRowProps) {
    const getDiasRestantesColor = (dias: number) => {
        if (dias <= 7) return 'text-red-600 dark:text-red-400';
        if (dias <= 15) return 'text-orange-600 dark:text-orange-400';
        return 'text-green-600 dark:text-green-400';
    };

    const getDiasRestantesBg = (dias: number) => {
        if (dias <= 7) return 'bg-red-100 dark:bg-red-900/30';
        if (dias <= 15) return 'bg-orange-100 dark:bg-orange-900/30';
        return 'bg-green-100 dark:bg-green-900/30';
    };

    return (
        <tr className="border-b border-[#e2e8f0] dark:border-[#20384b] hover:bg-[#f8fafc] dark:hover:bg-[#1a2c3a] transition-colors">
            <td className="px-6 py-4">
                <div>
                    <p className="font-medium text-[#1e293b] dark:text-white/90">
                        {avaluo.entidad}
                    </p>
                    <p className="text-sm text-[#64748b] dark:text-white/70">
                        {new Date(avaluo.fecha_evaluacion).toLocaleDateString('es-ES')}
                    </p>
                </div>
            </td>
            <td className="px-6 py-4">
                <div>
                    <p className="font-medium text-[#1e293b] dark:text-white/90">
                        {avaluo.marca}
                    </p>
                    <p className="text-sm text-[#64748b] dark:text-white/70">
                        {avaluo.modelo}
                    </p>
                </div>
            </td>
            <td className="px-6 py-4 text-[#64748b] dark:text-white/70">
                {avaluo.ano_fabricacion}
            </td>
            <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00AEEF]/10 text-[#00AEEF]">
                    {avaluo.placa || 'Sin placa'}
                </span>
            </td>
            <td className="px-6 py-4 text-[#64748b] dark:text-white/70">
                {new Date(avaluo.deleted_at).toLocaleDateString('es-ES')}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${getDiasRestantesColor(avaluo.dias_restantes)}`} />
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDiasRestantesBg(avaluo.dias_restantes)} ${getDiasRestantesColor(avaluo.dias_restantes)}`}
                    >
                        {avaluo.dias_restantes} {avaluo.dias_restantes === 1 ? 'día' : 'días'}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(avaluo)}
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
                                onClick={() => onRestore(avaluo)}
                                className="cursor-pointer text-green-600 dark:text-green-400"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Restaurar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-[#e2e8f0] dark:bg-[#20384b]" />
                            <DropdownMenuItem
                                onClick={() => onDelete(avaluo)}
                                className="cursor-pointer text-red-600 dark:text-red-400"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar Permanentemente
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </td>
        </tr>
    );
}
