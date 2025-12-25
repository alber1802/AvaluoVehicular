import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users, UserCheck, UserX } from 'lucide-react';

type StatusFilter = 'all' | 'active' | 'suspended';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    statusFilter: StatusFilter;
    onStatusFilterChange: (filter: StatusFilter) => void;
}

export function SearchBar({
    value,
    onChange,
    placeholder = 'Buscar por nombre, email, teléfono o rol...',
    statusFilter,
    onStatusFilterChange,
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
            <div className="flex flex-wrap gap-2">
                <Button
                    type="button"
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onStatusFilterChange('all')}
                    className={
                        statusFilter === 'all'
                            ? 'bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white'
                            : 'bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#64748b] dark:text-white/70 hover:bg-[#f8fafc] dark:hover:bg-[#1a2c3a] hover:text-[#1e293b] dark:hover:text-white/90'
                    }
                >
                    <Users className="w-4 h-4 mr-2" />
                    Todos
                </Button>
                <Button
                    type="button"
                    variant={statusFilter === 'active' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onStatusFilterChange('active')}
                    className={
                        statusFilter === 'active'
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#64748b] dark:text-white/70 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-800'
                    }
                >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Activos
                </Button>
                <Button
                    type="button"
                    variant={statusFilter === 'suspended' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onStatusFilterChange('suspended')}
                    className={
                        statusFilter === 'suspended'
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#64748b] dark:text-white/70 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-800'
                    }
                >
                    <UserX className="w-4 h-4 mr-2" />
                    Suspendidos
                </Button>
            </div>
        </div>
    );
}
