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
import { route } from 'ziggy-js';
import { useState, useEffect } from 'react';



export function DashboardHeader({ marcas, años_vehiculo, filters }: any) {
    const { auth } = usePage<SharedData>().props;

    const [search, setSearch] = useState(filters.search || '');
    const [marca, setMarca] = useState(filters.marca || 'all');
    const [año, setAño] = useState(filters.año || 'all');

    // Debounce para la búsqueda por texto
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleFilter({ search, marca, año });
        }, 700); // Espera 500ms después de que el usuario deje de escribir

        return () => clearTimeout(timeoutId);
    }, [search]);

    // Función para manejar los filtros
    const handleFilter = (params: any) => {
        router.get(route('dashboard'), params, {
            preserveState: true,
            preserveScroll: true,
            only: ['vehiculos'], // Solo actualizar los vehículos
        });
    };

    // Manejar cambio de marca
    const handleMarcaChange = (value: string) => {
        setMarca(value);
        handleFilter({ search, marca: value, año });
    };

    // Manejar cambio de año
    const handleAñoChange = (value: string) => {
        setAño(value);
        handleFilter({ search, marca, año: value });
    };

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-[#1e293b] dark:text-white/90">
                Bienvenido de nuevo, {auth.user.name}!
            </h1>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00AEEF]" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por marca, modelo, placa..."
                        className="border-[#e2e8f0] bg-white pl-10 text-[#1e293b] placeholder:text-[#64748b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#1a2c3a] dark:text-white/90 dark:placeholder:text-white/50 dark:focus:border-[#00AEEF]"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <Select value={marca} onValueChange={handleMarcaChange}>
                        <SelectTrigger className="w-full border-[#e2e8f0] bg-white text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#1a2c3a] dark:text-white/90 dark:focus:border-[#00AEEF] sm:w-[140px]">
                            <SelectValue placeholder="Marca" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            {marcas.map((marca: any) => (
                                <SelectItem key={marca.id} value={marca.id.toString()}>
                                    {marca.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>


                    <Select value={año} onValueChange={handleAñoChange}>
                        <SelectTrigger className="w-full border-[#e2e8f0] bg-white text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#1a2c3a] dark:text-white/90 dark:focus:border-[#00AEEF] sm:w-[140px]">
                            <SelectValue placeholder="Año" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key="all" value="all">Todos</SelectItem>
                            {años_vehiculo.map((año: any) => (
                                <SelectItem key={año.año_fabricacion} value={año.año_fabricacion.toString()}>
                                    {año.año_fabricacion}
                                </SelectItem>
                            ))}
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
