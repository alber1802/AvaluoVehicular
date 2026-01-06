import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Share2, CheckCircle, XCircle, RefreshCw, ArrowUpDown, ArrowDownUp } from 'lucide-react';
import { type StatusFilter, type TypeFilter } from '../types';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    statusFilter: StatusFilter;
    onStatusFilterChange: (filter: StatusFilter) => void;
    typeFilter: TypeFilter;
    onTypeFilterChange: (filter: TypeFilter) => void;
    isAdmin: boolean;
}

export function SearchBar({
    value,
    onChange,
    placeholder = 'Buscar por vehículo, usuario, motivo...',
    statusFilter,
    onStatusFilterChange,
    typeFilter,
    onTypeFilterChange,
    isAdmin,
}: SearchBarProps) {
    return (
        <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#64748b] dark:text-white/70" />
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="pl-10 bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90 placeholder:text-[#64748b] dark:placeholder:text-white/70"
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Status Filters */}
                <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-[#64748b] dark:text-white/50 self-center mr-1">Estado:</span>
                    <Button
                        type="button"
                        variant={statusFilter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onStatusFilterChange('all')}
                        className={
                            statusFilter === 'all'
                                ? 'bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white'
                                : 'bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#64748b] dark:text-white/70 hover:bg-[#f8fafc] dark:hover:bg-[#1a2c3a]'
                        }
                    >
                        <Share2 className="w-4 h-4 mr-1" />
                        Todos
                    </Button>
                    <Button
                        type="button"
                        variant={statusFilter === 'activo' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onStatusFilterChange('activo')}
                        className={
                            statusFilter === 'activo'
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#64748b] dark:text-white/70 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600'
                        }
                    >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Activos
                    </Button>
                    <Button
                        type="button"
                        variant={statusFilter === 'vencido' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onStatusFilterChange('vencido')}
                        className={
                            statusFilter === 'vencido'
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#64748b] dark:text-white/70 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600'
                        }
                    >
                        <XCircle className="w-4 h-4 mr-1" />
                        Vencidos
                    </Button>
                    <Button
                        type="button"
                        variant={statusFilter === 'renovado' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onStatusFilterChange('renovado')}
                        className={
                            statusFilter === 'renovado'
                                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                                : 'bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#64748b] dark:text-white/70 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600'
                        }
                    >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Renovados
                    </Button>
                </div>

                {/* Type Filters (solo para evaluador) */}
                {!isAdmin && (
                    <div className="flex flex-wrap gap-2 sm:border-l sm:border-[#e2e8f0] dark:sm:border-[#20384b] sm:pl-4">
                        <span className="text-xs text-[#64748b] dark:text-white/50 self-center mr-1">Tipo:</span>
                        <Button
                            type="button"
                            variant={typeFilter === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onTypeFilterChange('all')}
                            className={
                                typeFilter === 'all'
                                    ? 'bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white'
                                    : 'bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#64748b] dark:text-white/70 hover:bg-[#f8fafc] dark:hover:bg-[#1a2c3a]'
                            }
                        >
                            Todos
                        </Button>
                        <Button
                            type="button"
                            variant={typeFilter === 'compartido_por_mi' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onTypeFilterChange('compartido_por_mi')}
                            className={
                                typeFilter === 'compartido_por_mi'
                                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                    : 'bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#64748b] dark:text-white/70 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600'
                            }
                        >
                            <ArrowUpDown className="w-4 h-4 mr-1" />
                            Compartidos por mí
                        </Button>
                        <Button
                            type="button"
                            variant={typeFilter === 'compartido_conmigo' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onTypeFilterChange('compartido_conmigo')}
                            className={
                                typeFilter === 'compartido_conmigo'
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                    : 'bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#64748b] dark:text-white/70 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600'
                            }
                        >
                            <ArrowDownUp className="w-4 h-4 mr-1" />
                            Compartidos conmigo
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
