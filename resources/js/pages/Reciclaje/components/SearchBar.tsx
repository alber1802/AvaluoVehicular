import { Input } from '@/components/ui/input';
import { Search, Clock, User, Filter } from 'lucide-react';

interface Usuario {
    id: number;
    name: string;
}

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    // Nuevos filtros
    diasFilter: string;
    onDiasFilterChange: (value: string) => void;
    usuarioFilter: string;
    onUsuarioFilterChange: (value: string) => void;
    usuarios: Usuario[];
    isAdmin: boolean;
}

export function SearchBar({
    value,
    onChange,
    placeholder = 'Buscar por entidad, marca, modelo, placa...',
    diasFilter,
    onDiasFilterChange,
    usuarioFilter,
    onUsuarioFilterChange,
    usuarios,
    isAdmin,
}: SearchBarProps) {
    return (
        <div className="space-y-4">
            {/* Barra de búsqueda principal */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#64748b] dark:text-white/70" />
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="pl-10 bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90 placeholder:text-[#94a3b8] dark:placeholder:text-white/70"
                />
            </div>

            {/* Filtros adicionales */}
            <div className="flex flex-wrap gap-3">
                {/* Filtro por días restantes */}
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#64748b] dark:text-white/70" />
                    <select
                        value={diasFilter}
                        onChange={(e) => onDiasFilterChange(e.target.value)}
                        className="px-3 py-2 rounded-md text-sm bg-white dark:bg-[#1a2c3a] border border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent cursor-pointer"
                    >
                        <option value="all">Todos los días</option>
                        <option value="7">≤ 7 días (Crítico)</option>
                        <option value="15">≤ 15 días (Advertencia)</option>
                        <option value="30">≤ 30 días</option>
                    </select>
                </div>

                {/* Filtro por usuario (solo para admin) */}
                {isAdmin && usuarios.length > 0 && (
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#64748b] dark:text-white/70" />
                        <select
                            value={usuarioFilter}
                            onChange={(e) => onUsuarioFilterChange(e.target.value)}
                            className="px-3 py-2 rounded-md text-sm bg-white dark:bg-[#1a2c3a] border border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent cursor-pointer"
                        >
                            <option value="all">Todos los usuarios</option>
                            {usuarios.map((usuario) => (
                                <option key={usuario.id} value={usuario.id.toString()}>
                                    {usuario.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Indicador de filtros activos */}
                {(diasFilter !== 'all' || usuarioFilter !== 'all') && (
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-[#00AEEF]" />
                        <span className="text-sm text-[#00AEEF] font-medium">
                            Filtros activos
                        </span>
                        <button
                            onClick={() => {
                                onDiasFilterChange('all');
                                onUsuarioFilterChange('all');
                            }}
                            className="text-xs px-2 py-1 rounded bg-[#00AEEF]/10 text-[#00AEEF] hover:bg-[#00AEEF]/20 transition-colors"
                        >
                            Limpiar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
