import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { consultar } from '@/routes/depreciacion';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Plus, Trash2, Download, TrendingDown, Calculator, AlertCircle, Edit, Percent } from 'lucide-react';
import { type MarcaDepreciacion, type DepreciacionAnual } from './types';
import { CreateMarcaModal } from './components/CreateMarcaModal';
import { EditMarcaModal } from './components/EditMarcaModal';
import { DeleteMarcaDialog } from './components/DeleteMarcaDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Depreciación',
        href: consultar().url,
    },
    {
        title: 'Depreciación por Marca',
        href: '/depreciacion/marca',
    },
];

interface DepreMarcaVehiculoProps {
    marcas?: MarcaDepreciacion[];
}

// Datos de prueba de marcas
const marcasPrueba: MarcaDepreciacion[] = [
    { id: '1', marca: 'Toyota', factor_k: 0.05, valor_residual: 0.107 },
    { id: '2', marca: 'Chevrolet', factor_k: 0.08, valor_residual: 0.107 },
    { id: '3', marca: 'Nissan', factor_k: 0.06, valor_residual: 0.107 },
    { id: '4', marca: 'Mazda', factor_k: 0.07, valor_residual: 0.107 },
    { id: '5', marca: 'Honda', factor_k: 0.04, valor_residual: 0.107 },
    { id: '6', marca: 'Hyundai', factor_k: 0.09, valor_residual: 0.107 },
    { id: '7', marca: 'Kia', factor_k: 0.04, valor_residual: 0.107 },
    { id: '8', marca: 'Ford', factor_k: 0.07, valor_residual: 0.107 },
];

export default function DepreMarcaVehiculo({ marcas: marcasIniciales = marcasPrueba }: DepreMarcaVehiculoProps) {
    const [marcas, setMarcas] = useState<MarcaDepreciacion[]>(marcasIniciales);
    const [anoActual, setAnoActual] = useState<number>(new Date().getFullYear());
    const [anoModelo, setAnoModelo] = useState<number>(2020);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState<string | null>(null);
    const [mostrarResultados, setMostrarResultados] = useState(false);

    // Estados para modales
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [marcaParaEditar, setMarcaParaEditar] = useState<MarcaDepreciacion | null>(null);
    const [marcaParaEliminar, setMarcaParaEliminar] = useState<MarcaDepreciacion | null>(null);

    // Calcular depreciación
    const calcularDepreciacion = useMemo((): DepreciacionAnual[] => {
        if (!marcaSeleccionada) return [];

        const marca = marcas.find((m) => m.id === marcaSeleccionada);
        if (!marca) return [];

        const resultados: DepreciacionAnual[] = [];
        let anoActualCalculo = anoModelo;

        while (anoActualCalculo <= anoActual) {
            const antiguedad = anoActualCalculo - anoModelo;
            const factor_a = Math.max(1 - marca.factor_k * antiguedad, marca.valor_residual);

            resultados.push({
                ano_actual: anoActualCalculo,
                antiguedad,
                ano_modelo: anoModelo,
                factor_k: marca.factor_k,
                valor_residual: marca.valor_residual,
                factor_a: parseFloat(factor_a.toFixed(4)),
            });

            // Detener si alcanzó el valor residual
            if (factor_a === marca.valor_residual) break;

            anoActualCalculo++;
        }

        return resultados;
    }, [marcaSeleccionada, marcas, anoActual, anoModelo]);

    // Calcular porcentaje de depreciación total
    const porcentajeDepreciacion = useMemo(() => {
        if (calcularDepreciacion.length === 0) return null;

        const marca = marcas.find((m) => m.id === marcaSeleccionada);
        if (!marca) return null;

        const antiguedad = anoActual - anoModelo;
        const depreciacion = antiguedad * marca.factor_k * 100;

        return {
            porcentaje: Math.min(depreciacion, (1 - marca.valor_residual) * 100).toFixed(2),
            antiguedad,
        };
    }, [calcularDepreciacion, marcaSeleccionada, marcas, anoActual, anoModelo]);

    // Handlers para modales
    const handleCreateMarca = (data: { marca: string; factor_k: number; valor_residual: number }) => {
        // TODO: Enviar al backend
        console.log('Crear marca:', data);
        // router.post('/depreciacion/marcas', data);

        // Simulación temporal
        const nuevaMarca: MarcaDepreciacion = {
            id: Date.now().toString(),
            ...data,
        };
        setMarcas([...marcas, nuevaMarca]);
    };

    const handleEditMarca = (id: string, data: { marca: string; factor_k: number; valor_residual: number }) => {
        // TODO: Enviar al backend
        console.log('Editar marca:', id, data);
        // router.put(`/depreciacion/marcas/${id}`, data);

        // Simulación temporal
        setMarcas(marcas.map((m) => (m.id === id ? { ...m, ...data } : m)));
    };

    const handleDeleteMarca = () => {
        if (!marcaParaEliminar) return;

        // TODO: Enviar al backend
        console.log('Eliminar marca:', marcaParaEliminar.id);
        // router.delete(`/depreciacion/marcas/${marcaParaEliminar.id}`);

        // Simulación temporal
        setMarcas(marcas.filter((m) => m.id !== marcaParaEliminar.id));
        if (marcaSeleccionada === marcaParaEliminar.id) {
            setMarcaSeleccionada(null);
            setMostrarResultados(false);
        }
        setIsDeleteDialogOpen(false);
        setMarcaParaEliminar(null);
    };

    const abrirModalEditar = (marca: MarcaDepreciacion) => {
        setMarcaParaEditar(marca);
        setIsEditModalOpen(true);
    };

    const abrirDialogEliminar = (marca: MarcaDepreciacion) => {
        setMarcaParaEliminar(marca);
        setIsDeleteDialogOpen(true);
    };

    const generarTabla = () => {
        if (!marcaSeleccionada) {
            // alert('Por favor seleccione una marca');
            return;
        }
        if (anoModelo > anoActual) {
            // alert('El año de modelo no puede ser mayor al año actual');
            return;
        }
        setMostrarResultados(true);
    };

    const descargarTabla = () => {
        if (calcularDepreciacion.length === 0) return;

        const csv = [
            ['Año Actual', 'Antigüedad', 'Año Modelo', 'Factor K', 'Valor Residual', 'Factor A'],
            ...calcularDepreciacion.map((d) => [
                d.ano_actual,
                d.antiguedad,
                d.ano_modelo,
                d.factor_k,
                d.valor_residual,
                d.factor_a,
            ]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `depreciacion_${marcaSeleccionada}_${Date.now()}.csv`;
        a.click();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Depreciación por Marca de Vehículo" />

            <div className="space-y-6 m-1 lg:m-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1e293b] dark:text-white/90">
                            Cálculo de Depreciación por Marca
                        </h1>
                        <p className="text-[#64748b] dark:text-white/70 mt-1">
                            Configure las marcas y calcule la depreciación anual de vehículos
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingDown className="w-8 h-8 text-[#00AEEF]" />
                    </div>
                </div>

                {/* Panel de Configuración de Marcas */}
                <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                            Configuración de Marcas
                        </h2>
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Marca
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#f8fafc] dark:bg-[#0f1a23] border-b border-[#e2e8f0] dark:border-[#20384b]">
                                    <TableHead className="text-[#64748b] dark:text-white/70">Marca</TableHead>
                                    <TableHead className="text-[#64748b] dark:text-white/70">Factor K</TableHead>
                                    <TableHead className="text-[#64748b] dark:text-white/70">Valor Residual</TableHead>
                                    <TableHead className="text-[#64748b] dark:text-white/70">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {marcas.length > 0 ? (
                                    marcas.map((marca) => (
                                        <TableRow
                                            key={marca.id}
                                            className="border-b border-[#e2e8f0] dark:border-[#20384b] hover:bg-[#f8fafc] dark:hover:bg-[#1a2c3a]"
                                        >
                                            <TableCell className="font-medium text-[#1e293b] dark:text-white/90">
                                                {marca.marca}
                                            </TableCell>
                                            <TableCell className="text-[#64748b] dark:text-white/70">
                                                {marca.factor_k.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-[#64748b] dark:text-white/70">
                                                {marca.valor_residual.toFixed(3)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => abrirModalEditar(marca)}
                                                        className="text-[#00AEEF] hover:text-[#00AEEF] hover:bg-[#00AEEF]/10"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => abrirDialogEliminar(marca)}
                                                        className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="text-center py-8 text-[#64748b] dark:text-white/70"
                                        >
                                            No hay marcas configuradas. Agregue una marca para comenzar.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Parámetros de Cálculo */}
                <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-6">
                    <h2 className="text-lg font-semibold text-[#1e293b] dark:text-white/90 mb-4">
                        Parámetros de Cálculo
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="marca" className="text-[#1e293b] dark:text-white/90">
                                Seleccionar Marca <span className="text-red-500">*</span>
                            </Label>
                            <Select value={marcaSeleccionada || ''} onValueChange={setMarcaSeleccionada}>
                                <SelectTrigger className="bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b]">
                                    <SelectValue placeholder="Seleccione una marca" />
                                </SelectTrigger>
                                <SelectContent>
                                    {marcas.map((marca) => (
                                        <SelectItem key={marca.id} value={marca.id}>
                                            {marca.marca}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ano_actual" className="text-[#1e293b] dark:text-white/90">
                                Año Actual <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="ano_actual"
                                type="number"
                                value={anoActual}
                                onChange={(e) => setAnoActual(parseInt(e.target.value))}
                                className="bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ano_modelo" className="text-[#1e293b] dark:text-white/90">
                                Año de Modelo <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="ano_modelo"
                                type="number"
                                value={anoModelo}
                                onChange={(e) => setAnoModelo(parseInt(e.target.value))}
                                className="bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b]"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={generarTabla}
                            className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white"
                        >
                            <Calculator className="w-4 h-4 mr-2" />
                            Generar Tabla y Gráfico de Depreciación
                        </Button>
                        {mostrarResultados && calcularDepreciacion.length > 0 && (
                            <Button
                                onClick={descargarTabla}
                                variant="outline"
                                className="border-[#e2e8f0] dark:border-[#20384b]"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Descargar Tabla (CSV)
                            </Button>
                        )}
                    </div>
                </div>

                {/* Resumen de Depreciación */}
                {mostrarResultados && porcentajeDepreciacion && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Percent className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-blue-900 dark:text-blue-300">
                                    Depreciación Total de la Marca
                                </h3>
                                <p className="text-sm text-blue-800 dark:text-blue-400 mt-1">
                                    El vehículo ha sufrido una depreciación del{' '}
                                    <span className="font-bold text-lg">{porcentajeDepreciacion.porcentaje}%</span>{' '}
                                    en {porcentajeDepreciacion.antiguedad} {porcentajeDepreciacion.antiguedad === 1 ? 'año' : 'años'}.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabla de Resultados */}
                {mostrarResultados && calcularDepreciacion.length > 0 && (
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-6">
                        <h2 className="text-lg font-semibold text-[#1e293b] dark:text-white/90 mb-4">
                            Tabla de Depreciación Anual
                        </h2>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-[#f8fafc] dark:bg-[#0f1a23] border-b border-[#e2e8f0] dark:border-[#20384b]">
                                        <TableHead className="text-[#64748b] dark:text-white/70">Año Actual</TableHead>
                                        <TableHead className="text-[#64748b] dark:text-white/70">Antigüedad</TableHead>
                                        <TableHead className="text-[#64748b] dark:text-white/70">Año Modelo</TableHead>
                                        <TableHead className="text-[#64748b] dark:text-white/70">Factor K</TableHead>
                                        <TableHead className="text-[#64748b] dark:text-white/70">Valor Residual</TableHead>
                                        <TableHead className="text-[#64748b] dark:text-white/70">Factor A</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {calcularDepreciacion.map((dep, index) => (
                                        <TableRow
                                            key={index}
                                            className="border-b border-[#e2e8f0] dark:border-[#20384b] hover:bg-[#f8fafc] dark:hover:bg-[#1a2c3a]"
                                        >
                                            <TableCell className="font-medium text-[#1e293b] dark:text-white/90">
                                                {dep.ano_actual}
                                            </TableCell>
                                            <TableCell className="text-[#64748b] dark:text-white/70">
                                                {dep.antiguedad} {dep.antiguedad === 1 ? 'año' : 'años'}
                                            </TableCell>
                                            <TableCell className="text-[#64748b] dark:text-white/70">
                                                {dep.ano_modelo}
                                            </TableCell>
                                            <TableCell className="text-[#64748b] dark:text-white/70">
                                                {dep.factor_k.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-[#64748b] dark:text-white/70">
                                                {dep.valor_residual.toFixed(3)}
                                            </TableCell>
                                            <TableCell className="font-semibold text-[#00AEEF]">
                                                {dep.factor_a.toFixed(4)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}

                {/* Gráfico de Depreciación */}
                {mostrarResultados && calcularDepreciacion.length > 0 && (
                    <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-6">
                        <h2 className="text-lg font-semibold text-[#1e293b] dark:text-white/90 mb-4">
                            Gráfico de Depreciación
                        </h2>

                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={calcularDepreciacion}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="ano_actual"
                                        stroke="#64748b"
                                        label={{ value: 'Año', position: 'insideBottom', offset: -5 }}
                                    />
                                    <YAxis
                                        stroke="#64748b"
                                        label={{ value: 'Factor de Depreciación (a)', angle: -90, position: 'insideLeft' }}
                                        domain={[0, 1]}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            //backgroundColor: '#ffffff',
                                            color: '#1e293b',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="factor_a"
                                        stroke="#00AEEF"
                                        strokeWidth={3}
                                        name="Factor de Depreciación"
                                        dot={{ fill: '#00AEEF', r: 5 }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>

            {/* Modales */}
            <CreateMarcaModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onConfirm={handleCreateMarca}
            />

            <EditMarcaModal
                marca={marcaParaEditar}
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setMarcaParaEditar(null);
                }}
                onConfirm={handleEditMarca}
            />

            <DeleteMarcaDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setMarcaParaEliminar(null);
                }}
                onConfirm={handleDeleteMarca}
                marcaNombre={marcaParaEliminar?.marca || null}
            />
        </AppLayout>
    );
}
