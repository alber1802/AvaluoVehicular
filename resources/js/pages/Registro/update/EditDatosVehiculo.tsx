import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Toast from '@/components/Toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { FormEventHandler, useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Nueva Evaluación',
        href: '/registro/crear',
    },
];

interface FormData {
    entidad: string;
    fecha_evaluacion: string;
    ubicacion_actual: string;
    tipo_vehiculo: string;
    tipo_combustible: string;
    id_marca: string;
    modelo: string;
    ano_fabricacion: string;
    placa: string;
    serie_motor: string;
    chasis: string;
    color: string;
    procedencia: string;
    kilometraje: string;
    precio_referencial: string;
    estado_operativo: string[];
    estado_general: string;
    observaciones: string;
}

export default function EditDatosVehiculo({ vehiculo, condicionGeneral, marcas }: any) {


    const [estadoOperativoOtros, setEstadoOperativoOtros] = useState('');
    const [showOtrosInput, setShowOtrosInput] = useState(false);
    const [showEstadoDropdown, setShowEstadoDropdown] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    // Procesar estado_operativo inicial
    const parseEstadoOperativo = (estadoOperativoString: string | null | undefined): string[] => {
        if (!estadoOperativoString) return [];

        const estados = estadoOperativoString.split(',');


        const estadosLimpios: string[] = [];

        estados.forEach((estado: string) => {
            if (estado.startsWith('Otros: ')) {
                const otrosValue = estado.replace('Otros: ', '');
                // estadosLimpios.push('Otros: ' + otrosValue);
                estadosLimpios.push('Otros');
                // estadosLimpios.push(otrosValue);

            } else {
                estadosLimpios.push(estado);
            }
        });
        return estadosLimpios;
    };

    const estadoOperativo = parseEstadoOperativo(condicionGeneral?.estado_operativo);


    const fecha = vehiculo?.fecha_evaluacion ? vehiculo.fecha_evaluacion.split('T')[0] : '';

    const { data, setData, post, processing, errors } = useForm<FormData>({
        entidad: vehiculo?.entidad || '',
        fecha_evaluacion: fecha || '',
        ubicacion_actual: vehiculo?.ubicacion_actual || '',
        tipo_vehiculo: vehiculo?.tipo_vehiculo?.toString() || '',
        tipo_combustible: vehiculo?.tipo_combustible?.toString() || '',
        id_marca: vehiculo?.id_marca?.toString() || '',
        modelo: vehiculo?.modelo || '',
        ano_fabricacion: vehiculo?.año_fabricacion.toString() || '',
        placa: vehiculo?.placa || '',
        serie_motor: vehiculo?.serie_motor || '',
        chasis: vehiculo?.chasis || '',
        color: vehiculo?.color || '',
        procedencia: vehiculo?.procedencia || '',
        kilometraje: vehiculo?.kilometraje?.toString() || '',
        precio_referencial: vehiculo?.precio_referencial?.toString() || '',
        estado_operativo: estadoOperativo,
        estado_general: condicionGeneral?.estado_general || '',
        observaciones: condicionGeneral?.observaciones || '',
    });

    // Inicializar el campo "Otros" si existe
    useEffect(() => {
        if (condicionGeneral?.estado_operativo) {
            const estados = condicionGeneral.estado_operativo.split(', ');
            const otrosValue = estados.find((estado: string) => estado.startsWith('Otros: '));

            if (otrosValue) {
                setShowOtrosInput(true);
                setEstadoOperativoOtros(otrosValue.replace('Otros: ', ''));
            }
        }
    }, [condicionGeneral]);


    const estadoOperativoOptions = [
        'Operable',
        'En reparación',
        'Desmantelado',
        'Parado',
        'Siniestrado',
        'Para respuesto',
        'Con otro motor',
        'Otros'
    ];

    const marcasData = marcas.map((marca: any) => ({ id: marca.id, nombre: marca.nombre }));



    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowEstadoDropdown(false);
            }
        };

        if (showEstadoDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEstadoDropdown]);

    const toggleEstadoOperativo = (option: string) => {
        const currentEstados = Array.isArray(data.estado_operativo) ? data.estado_operativo : [];

        if (currentEstados.includes(option)) {
            const newEstados = currentEstados.filter(item => item !== option);
            setData('estado_operativo', newEstados);

            if (option === 'Otros') {
                setShowOtrosInput(false);
                setEstadoOperativoOtros('');
            }
        } else {
            setData('estado_operativo', [...currentEstados, option]);

            if (option === 'Otros') {
                setShowOtrosInput(true);
            }
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Validar que los selects no estén vacíos
        if (!data.tipo_vehiculo) {
            setToastMessage('⚠️ Por favor seleccione el tipo de vehículo');
            setToastType('warning');
            setShowToast(true);
            return;
        }

        if (!data.tipo_combustible) {
            setToastMessage('⚠️ Por favor seleccione el tipo de combustible');
            setToastType('warning');
            setShowToast(true);
            return;
        }

        if (!data.id_marca) {
            setToastMessage('⚠️ Por favor seleccione la marca del vehículo');
            setToastType('warning');
            setShowToast(true);
            return;
        }

        if (!data.estado_general) {
            setToastMessage('⚠️ Por favor seleccione el estado general');
            setToastType('warning');
            setShowToast(true);
            return;
        }

        // Validar que se haya seleccionado al menos un estado operativo
        if (!Array.isArray(data.estado_operativo) || data.estado_operativo.length === 0) {
            setToastMessage('⚠️ Por favor seleccione al menos un en el campo "Estado Operativo"');
            setToastType('warning');
            setShowToast(true);
            return;
        }

        // Si se seleccionó "Otros" y hay texto, incluirlo en el array
        let finalEstadoOperativo = Array.isArray(data.estado_operativo) ? [...data.estado_operativo] : [];
        if (showOtrosInput && estadoOperativoOtros.trim()) {
            const otrosIndex = finalEstadoOperativo.indexOf('Otros');
            if (otrosIndex !== -1) {
                finalEstadoOperativo[otrosIndex] = `Otros: ${estadoOperativoOtros.trim()}`;
            }
        } else if (showOtrosInput && !estadoOperativoOtros.trim()) {
            // Si seleccionó "Otros" pero no escribió nada
            setToastMessage('⚠️ Por favor especifique el estado operativo en "Otros"');
            setToastType('warning');
            setShowToast(true);
            return;
        }

        // Actualizar el dato antes de enviar
        data.estado_operativo = finalEstadoOperativo;

        post(route('avaluo.editDatosVehiculo.update', vehiculo.id), {
            onSuccess: () => {
                setToastMessage('✅ Datos del vehículo actualizados exitosamente');
                setToastType('success');
                setShowToast(true);
            },
            onError: () => {
                setToastMessage('❌ Error al actualizar los datos. Por favor, revise los campos');
                setToastType('error');
                setShowToast(true);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva Evaluación de Vehículo" />

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}

            <div className="h-full w-full">
                <div className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-6 shadow-sm dark:border-[#20384b] 
                dark:bg-[#1a2c3a]">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-[#1e293b] dark:text-white/90">
                            Editar Datos del Vehículo
                        </h2>
                        <p className="mt-1 text-sm text-[#64748b] dark:text-white/70">
                            Modifique los campos necesarios para actualizar la información del vehículo
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Información General */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                Información General
                            </h3>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="entidad">
                                        Entidad
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="entidad"
                                        value={data.entidad}
                                        onChange={(e) => setData('entidad', e.target.value)}
                                        required
                                        placeholder="Nombre de la entidad"
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.entidad} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="fecha_evaluacion">
                                        Fecha de Evaluación
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="fecha_evaluacion"
                                        type="date"
                                        value={data.fecha_evaluacion}
                                        onChange={(e) => setData('fecha_evaluacion', e.target.value)}
                                        required
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.fecha_evaluacion} />
                                </div>

                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="ubicacion_actual">
                                        Ubicación Actual
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="ubicacion_actual"
                                        value={data.ubicacion_actual}
                                        onChange={(e) => setData('ubicacion_actual', e.target.value)}
                                        required
                                        placeholder="Dirección o ubicación del vehículo"
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.ubicacion_actual} />
                                </div>
                            </div>
                        </div>

                        {/* Información del Vehículo */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                Información del Vehículo
                            </h3>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="tipo_vehiculo">
                                        Tipo de Vehículo
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.tipo_vehiculo}
                                        onValueChange={(value) => setData('tipo_vehiculo', value)}
                                    >
                                        <SelectTrigger id="tipo_vehiculo" className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:focus:border-[#00AEEF]">
                                            <SelectValue placeholder="Seleccione tipo" className="dark:placeholder:text-[#64748b]" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Automovil">Automóvil</SelectItem>
                                            <SelectItem value="Camioneta">Camioneta</SelectItem>
                                            <SelectItem value="Camion">Camión</SelectItem>
                                            <SelectItem value="Vagoneta">Vagoneta</SelectItem>
                                            <SelectItem value="Bus">Bus</SelectItem>
                                            <SelectItem value="Otro">Otro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.tipo_vehiculo} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="tipo_combustible">
                                        Tipo de Combustible
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.tipo_combustible}
                                        required
                                        onValueChange={(value) => setData('tipo_combustible', value)}
                                    >
                                        <SelectTrigger id="tipo_combustible" className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:focus:border-[#00AEEF]">
                                            <SelectValue placeholder="Seleccione combustible" className="dark:placeholder:text-[#64748b]" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="No tiene">No tiene</SelectItem>
                                            <SelectItem value="Gasolina">Gasolina</SelectItem>
                                            <SelectItem value="Diésel">Diésel</SelectItem>
                                            <SelectItem value="Eléctrico">Eléctrico</SelectItem>
                                            <SelectItem value="Híbrido">Híbrido</SelectItem>
                                            <SelectItem value="Gas">Gas</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.tipo_combustible} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="marca">
                                        Marca
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.id_marca ? data.id_marca.toString() : ''}
                                        required
                                        onValueChange={(value) => setData('id_marca', value)}
                                    >
                                        <SelectTrigger id="marca" className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:focus:border-[#00AEEF]">
                                            <SelectValue placeholder="Seleccione marca" className="dark:placeholder:text-[#64748b]" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {marcasData.map((marca: any) => (
                                                <SelectItem key={marca.id} value={marca.id.toString()}>
                                                    {marca.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.id_marca} />

                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="modelo">
                                        Modelo Motor
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="modelo"
                                        value={data.modelo}
                                        required
                                        onChange={(e) => setData('modelo', e.target.value)}
                                        placeholder="Modelo del vehículo"
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.modelo} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="ano_fabricacion">
                                        Año de Fabricación
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="ano_fabricacion"
                                        type="number"
                                        value={data.ano_fabricacion}
                                        onChange={(e) => setData('ano_fabricacion', e.target.value)}
                                        required
                                        placeholder="2024"
                                        min="1900"
                                        max={new Date().getFullYear() + 1}
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.ano_fabricacion} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="color">
                                        Color
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="color"
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                        required
                                        placeholder="Color del vehículo"
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.color} />
                                </div>
                            </div>
                        </div>

                        {/* Identificación del Vehículo */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                Identificación del Vehículo
                            </h3>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="placa">
                                        Nro Placa
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="placa"
                                        value={data.placa}
                                        onChange={(e) => setData('placa', e.target.value)}
                                        required
                                        placeholder="Número de placa"
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.placa} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="chasis">
                                        Nro Chasis
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="chasis"
                                        value={data.chasis}
                                        onChange={(e) => setData('chasis', e.target.value)}
                                        required
                                        placeholder="Número de chasis"
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.chasis} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="serie_motor">
                                        Serie del Motor
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="serie_motor"
                                        value={data.serie_motor}
                                        onChange={(e) => setData('serie_motor', e.target.value)}
                                        placeholder="Número de serie del motor"
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.serie_motor} />
                                </div>


                            </div>
                        </div>

                        {/* Información Adicional */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                Información Adicional
                            </h3>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="procedencia">
                                        Procedencia
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="procedencia"
                                        value={data.procedencia}
                                        onChange={(e) => setData('procedencia', e.target.value)}
                                        required
                                        placeholder="Origen del vehículo"
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.procedencia} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="kilometraje">
                                        Kilometraje o Millaje
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="kilometraje"
                                        value={data.kilometraje}
                                        onChange={(e) => setData('kilometraje', e.target.value)}
                                        required
                                        placeholder="Kilometraje actual"
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.kilometraje} />
                                </div>

                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="precio_referencial">
                                        Precio Referencial $
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="precio_referencial"
                                        type="number"
                                        step="0.01"
                                        value={data.precio_referencial}
                                        onChange={(e) => setData('precio_referencial', e.target.value)}
                                        required
                                        placeholder="0.00"
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.precio_referencial} />
                                </div>
                            </div>
                        </div>

                        {/* Condiciones  Generales */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                Condiciones  Generales
                            </h3>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="estado_operativo">
                                        Estado Operativo
                                        <span className="text-red-500">*</span> (Seleccione uno o varios)
                                    </Label>
                                    <div className="relative" ref={dropdownRef}>
                                        <Button
                                            type="button"
                                            variant="outline"

                                            onClick={() => setShowEstadoDropdown(!showEstadoDropdown)}
                                            className="w-full justify-between border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] hover:bg-[#f8fafc] dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:hover:bg-[#0f1a23]"
                                        >
                                            <span className="truncate text-left">
                                                {Array.isArray(data.estado_operativo) && data.estado_operativo.length > 0
                                                    ? data.estado_operativo.join(',')
                                                    : 'Seleccione estados operativos'}
                                            </span>
                                            <ChevronDown className={`ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform ${showEstadoDropdown ? 'rotate-180' : ''}`} />
                                        </Button>
                                        {showEstadoDropdown && (
                                            <div className="absolute z-50 mt-2 w-full rounded-md border border-[#e2e8f0] bg-[#ffffff] p-4 shadow-lg dark:border-[#20384b] dark:bg-[#0f1a23]">
                                                <div className="max-h-64 space-y-2 overflow-y-auto">
                                                    {estadoOperativoOptions.map((option) => {
                                                        const isChecked = Array.isArray(data.estado_operativo) && data.estado_operativo.includes(option);
                                                        return (
                                                            <div
                                                                key={option}
                                                                className="flex items-center space-x-2 py-1"
                                                            >
                                                                <Checkbox
                                                                    id={`estado-${option}`}
                                                                    checked={isChecked}
                                                                    onCheckedChange={() => toggleEstadoOperativo(option)}
                                                                />
                                                                <label
                                                                    htmlFor={`estado-${option}`}
                                                                    className="flex-1 cursor-pointer text-sm font-medium leading-none text-[#1e293b] dark:text-white/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                >
                                                                    {option}
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {showOtrosInput && (
                                        <Input
                                            id="estado_operativo_otros"
                                            value={estadoOperativoOtros}
                                            onChange={(e) => setEstadoOperativoOtros(e.target.value)}
                                            placeholder="Especifique el estado operativo"
                                            className="mt-2 border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                        />
                                    )}
                                    <InputError message={errors.estado_operativo} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="estado_general">
                                        Estado General
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.estado_general}
                                        onValueChange={(value) => setData('estado_general', value)}
                                    >
                                        <SelectTrigger id="estado_general" className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:focus:border-[#00AEEF]">
                                            <SelectValue placeholder="Seleccione estado general" className="dark:placeholder:text-[#64748b]" />
                                        </SelectTrigger>
                                        <SelectContent>

                                            <SelectItem value="Bueno">Bueno</SelectItem>
                                            <SelectItem value="Regular">Regular</SelectItem>
                                            <SelectItem value="Malo">Malo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.estado_general} />
                                </div>

                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="observaciones">
                                        Observaciones
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="observaciones"
                                        type="text"
                                        value={data.observaciones}
                                        onChange={(e) => setData('observaciones', e.target.value)}
                                        required
                                        placeholder="Observaciones"
                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                    />
                                    <InputError message={errors.observaciones} />
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex items-center justify-end gap-4 border-t border-[#e2e8f0] pt-6 dark:border-[#20384b]">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                                className="border-[#e2e8f0] text-[#1e293b] hover:bg-[#f8fafc] dark:border-[#20384b] dark:text-white/90 dark:hover:bg-[#0f1a23]"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-[#00AEEF] hover:bg-[#00AEEF]/90"
                            >
                                {processing ? 'Actualizando...' : 'Actualizar Datos'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

