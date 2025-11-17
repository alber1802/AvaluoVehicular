import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Link } from '@inertiajs/react';
//adicionarl

import { route } from 'ziggy-js';






export function DashboardHeader() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-[#1e293b] dark:text-white/90">
                Bienvenido de nuevo, {auth.user.name}!
            </h1>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00AEEF]" />
                    <Input
                        placeholder="Buscar por marca, modelo, año..."
                        className="border-[#e2e8f0] bg-white pl-10 text-[#1e293b] placeholder:text-[#64748b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#1a2c3a] dark:text-white/90 dark:placeholder:text-white/50 dark:focus:border-[#00AEEF]"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <Select>
                        <SelectTrigger className="w-full border-[#e2e8f0] bg-white text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#1a2c3a] dark:text-white/90 dark:focus:border-[#00AEEF] sm:w-[140px]">
                            <SelectValue placeholder="Marca" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            <SelectItem value="mazda">Mazda</SelectItem>
                            <SelectItem value="ford">Ford</SelectItem>
                            <SelectItem value="toyota">Toyota</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full border-[#e2e8f0] bg-white text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#1a2c3a] dark:text-white/90 dark:focus:border-[#00AEEF] sm:w-[140px]">
                            <SelectValue placeholder="Modelo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full border-[#e2e8f0] bg-white text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#1a2c3a] dark:text-white/90 dark:focus:border-[#00AEEF] sm:w-[140px]">
                            <SelectValue placeholder="Año" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                        </SelectContent>
                    </Select>

                    <Link href={route('registro.index')}>
                        <Button
                            className="w-full gap-2 bg-[#00AEEF] hover:bg-[#00AEEF]/90 sm:w-auto"
                        >
                            <Plus className="h-4 w-4" />
                            Nueva Evaluación
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
