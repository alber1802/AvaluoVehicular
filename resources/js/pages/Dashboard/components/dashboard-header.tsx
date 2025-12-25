import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Clock, CheckCircle, Users } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState, useEffect } from 'react';

interface Usuario {
    id: number;
    name: string;
}

interface DashboardHeaderProps {
    marcas: any[];
    años_vehiculo: any[];
    usuarios: Usuario[];
    filters: {
        search: string;
        marca: string;
        año: string;
        estado: string;
        evaluador: string;
    };
    isAdmin: boolean;
}

export function DashboardHeader({ marcas, años_vehiculo, usuarios = [], filters, isAdmin }: DashboardHeaderProps) {
    const { auth } = usePage<SharedData>().props;

    const [search, setSearch] = useState(filters.search || '');
    const [marca, setMarca] = useState(filters.marca || 'all');
    const [año, setAño] = useState(filters.año || 'all');
    const [estado, setEstado] = useState(filters.estado || 'all');
    const [evaluador, setEvaluador] = useState(filters.evaluador || 'all');

    // Debounce para la búsqueda por texto
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleFilter({ search, marca, año, estado, evaluador });
        }, 700); // Espera 700ms después de que el usuario deje de escribir

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
        handleFilter({ search, marca: value, año, estado, evaluador });
    };

    // Manejar cambio de año
    const handleAñoChange = (value: string) => {
        setAño(value);
        handleFilter({ search, marca, año: value, estado, evaluador });
    };

    // Manejar cambio de estado
    const handleEstadoChange = (value: string) => {
        setEstado(value);
        handleFilter({ search, marca, año, estado: value, evaluador });
    };

    // Manejar cambio de evaluador
    const handleEvaluadorChange = (value: string) => {
        setEvaluador(value);
        handleFilter({ search, marca, año, estado, evaluador: value });
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

                <Link href={route('registro.index')}>
                    <Button
                        className="w-full gap-2 bg-[#00AEEF] hover:bg-[#00AEEF]/90 sm:w-auto"
                    >
                        <Plus className="h-4 w-4" />
                        Nueva Evaluación
                    </Button>
                </Link>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2">
                {/* Filtro por Marca */}
                <Select value={marca} onValueChange={handleMarcaChange}>
                    <SelectTrigger className="w-full border-[#e2e8f0] bg-white text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#1a2c3a] dark:text-white/90 dark:focus:border-[#00AEEF] sm:w-[160px]">
                        <SelectValue placeholder="Marca" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las Marcas</SelectItem>
                        {marcas.map((marca: any) => (
                            <SelectItem key={marca.id} value={marca.id.toString()}>
                                {marca.nombre}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Filtro por Año */}
                <Select value={año} onValueChange={handleAñoChange}>
                    <SelectTrigger className="w-full border-[#e2e8f0] bg-white text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#1a2c3a] dark:text-white/90 dark:focus:border-[#00AEEF] sm:w-[150px]">
                        <SelectValue placeholder="Año" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key="all" value="all">Todos los Años</SelectItem>
                        {años_vehiculo.map((año: any) => (
                            <SelectItem key={año.año_fabricacion} value={año.año_fabricacion.toString()}>
                                {año.año_fabricacion}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Filtro por Estado (Pendiente/Completado) */}
                <Select value={estado} onValueChange={handleEstadoChange}>
                    <SelectTrigger className={`w-full sm:w-[160px] border-[#e2e8f0] bg-white text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#1a2c3a] dark:text-white/90 dark:focus:border-[#00AEEF] ${estado === 'pendiente' ? 'border-orange-400 dark:border-orange-600' :
                        estado === 'completado' ? 'border-green-400 dark:border-green-600' : ''
                        }`}>
                        <div className="flex items-center gap-2">
                            {estado === 'pendiente' && <Clock className="h-4 w-4 text-orange-500" />}
                            {estado === 'completado' && <CheckCircle className="h-4 w-4 text-green-500" />}
                            <SelectValue placeholder="Estado" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los Estados</SelectItem>
                        <SelectItem value="pendiente">
                            <div className="flex items-center gap-2">
                                <span>Pendientes</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* Filtro por Usuario/Evaluador (Solo Admin) */}
                {isAdmin && (
                    <Select value={evaluador} onValueChange={handleEvaluadorChange}>
                        <SelectTrigger className="w-full border-[#e2e8f0] bg-white text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#1a2c3a] dark:text-white/90 dark:focus:border-[#00AEEF] sm:w-[180px]">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-[#00AEEF]" />
                                <SelectValue placeholder="Evaluador" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los Usuarios</SelectItem>
                            {usuarios.map((usuario: Usuario) => (
                                <SelectItem key={usuario.id} value={usuario.id.toString()}>
                                    {usuario.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>
        </div>
    );
}
