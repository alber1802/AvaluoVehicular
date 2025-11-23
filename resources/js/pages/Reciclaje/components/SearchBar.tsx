import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function SearchBar({
    value,
    onChange,
    placeholder = 'Buscar por entidad, marca, modelo, placa...',
}: SearchBarProps) {
    return (
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
    );
}
