import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, Check } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface InspeccionData {
    id?: number;
    id_vehiculo: number;
    nombre: string;
    caracteristica: string;
    tiene: boolean;
    valoracion: number;
    observaciones: string;
}

interface FallaItem {
    caracteristica: string;
    valoracion: number;
}

interface SeccionFallas {
    titulo: string;
    items: FallaItem[];
}

interface FallaData {
    nombre: string;
    caracteristica: string;
    tiene: boolean;
    valoracion: number;
    observaciones: string;
}


const seccionesFallas: SeccionFallas[] = [
    {
        titulo: 'Motor Encendido',
        items: [
            { caracteristica: 'Falla de encendido inicial', valoracion: 0.0250 },
            { caracteristica: 'Mala partida', valoracion: 0.0250 },
            { caracteristica: 'Demora partida', valoracion: 0.0250 },
            { caracteristica: 'El motor se detiene al encender', valoracion: 0.0250 },
            { caracteristica: 'Se suelta el acelerador', valoracion: 0.0250 },
        ],
    },
    {
        titulo: 'Motor Conducción',
        items: [
            { caracteristica: 'Falla al acelerar', valoracion: 0.0200 },
            { caracteristica: 'Encendido adelantado/atrasado', valoracion: 0.0200 },
            { caracteristica: 'Pérdida de potencia', valoracion: 0.0200 },
            { caracteristica: 'Humo negro', valoracion: 0.0200 },
            { caracteristica: 'Embrague defectuoso', valoracion: 0.0200 },
        ],
    },
    {
        titulo: 'Marcha en Vacío',
        items: [
            { caracteristica: 'Marcha en vacío anormal', valoracion: 0.0200 },
            { caracteristica: 'Marcha en vacío inestable', valoracion: 0.0200 },
            { caracteristica: 'Oscilaciónes', valoracion: 0.0200 },
        ],
    },
    {
        titulo: 'Indicador CHECK ENGINE en el tablero',
        items: [
            { caracteristica: 'No se enciende', valoracion: 0.0200 },
            { caracteristica: 'Siempre encendida', valoracion: 0.0200 },
            { caracteristica: 'Ocasionalmente encendida', valoracion: 0.0200 },
        ],
    },
    {
        titulo: 'Transmisión',
        items: [
            { caracteristica: 'Patina el embrague', valoracion: 0.0150 },
            { caracteristica: 'Pedal de embrague atascado', valoracion: 0.0150 },
            { caracteristica: 'Vibración al partir', valoracion: 0.0150 },
            { caracteristica: 'No entra los cambios', valoracion: 0.0150 },
            { caracteristica: 'Se suelta la marcha', valoracion: 0.0150 },
            { caracteristica: 'Sonidos en los cambios', valoracion: 0.0150 },
            { caracteristica: 'Sonido en el diferencial', valoracion: 0.0150 },
            { caracteristica: 'Fugas de aceite', valoracion: 0.0150 },
            { caracteristica: 'Sonidos en las ruedas al curvar', valoracion: 0.0150 },
        ],
    },
    {
        titulo: 'Frenos',
        items: [

            { caracteristica: 'Sonidos al frenar', valoracion: 0.0250 },
            { caracteristica: 'Frenos defectuosos', valoracion: 0.0250 },
            { caracteristica: 'No funciona freno de mano', valoracion: 0.0250 },
            { caracteristica: 'Fuga de líquido', valoracion: 0.0250 },
        ],
    },
    {
        titulo: 'Suspensión y Carrocería',
        items: [
            { caracteristica: 'Sonidos o golpeteo', valoracion: 0.0200 },
            { caracteristica: 'Rebotes', valoracion: 0.0200 },
            { caracteristica: 'Suspensión floja', valoracion: 0.0200 },
        ],
    },
    {
        titulo: 'Dirección',
        items: [
            { caracteristica: 'Tiende a ir al lado', valoracion: 0.0225 },
            { caracteristica: 'Suena al curvar', valoracion: 0.0225 },
            { caracteristica: 'No responde efectivamente', valoracion: 0.0225 },
            { caracteristica: 'Mala distribución', valoracion: 0.0225 },
        ],
    },
    {
        titulo: 'Electricidad',
        items: [
            { caracteristica: 'Fallan luces delanteras', valoracion: 0.0100 },
            { caracteristica: 'Fallan luces direccionales', valoracion: 0.0100 },
            { caracteristica: 'Fallan luces de freno', valoracion: 0.0100 },
            { caracteristica: 'Fallan luces de retro', valoracion: 0.0100 },
            { caracteristica: 'Fallan luces de salón', valoracion: 0.0100 },
            { caracteristica: 'Fallan luces de tablero', valoracion: 0.0100 },
            { caracteristica: 'Fallan instrumentos del tablero', valoracion: 0.0100 },
            { caracteristica: 'Descarga de batería', valoracion: 0.0100 },
            { caracteristica: 'Falla bocina', valoracion: 0.0100 },
            { caracteristica: 'Fallan limpiaparabrisas', valoracion: 0.0100 },
        ],
    },
    {
        titulo: 'Apariencia Interior y Exterior',
        items: [
            { caracteristica: 'Tablero', valoracion: 0.0150 },
            { caracteristica: 'Motor', valoracion: 0.0150 },
            { caracteristica: 'Caja de cambios', valoracion: 0.0150 },
            { caracteristica: 'Diferencial', valoracion: 0.0150 },
            { caracteristica: 'Engrasado', valoracion: 0.0150 },
            { caracteristica: 'Lavado', valoracion: 0.0150 },
        ],
    },
    {
        titulo: 'Accesorios Adicionales',
        items: [
            { caracteristica: 'Llave de ruedas', valoracion: 0.0050 },
            { caracteristica: 'Retrovisores', valoracion: 0.0050 },
            { caracteristica: 'Alarma de emergencia', valoracion: 0.0050 },
            { caracteristica: 'Espejos', valoracion: 0.0050 },
            { caracteristica: 'Antena', valoracion: 0.0050 },
            { caracteristica: 'Perillas radio', valoracion: 0.0050 },
            { caracteristica: 'Tapa de gasolina', valoracion: 0.0050 },
            { caracteristica: 'Gata', valoracion: 0.0050 },
            { caracteristica: 'Rayones', valoracion: 0.0050 },
            { caracteristica: 'Radio', valoracion: 0.0050 },
            { caracteristica: 'Encendedor', valoracion: 0.0050 },
            { caracteristica: 'Tapacubos', valoracion: 0.0050 },
            { caracteristica: 'Extintor', valoracion: 0.0050 },
            { caracteristica: 'Herramientas', valoracion: 0.0050 },
            { caracteristica: 'Abolladuras', valoracion: 0.0050 },
            { caracteristica: 'Parabrisas', valoracion: 0.0050 },
        ],
    },
];

interface Inf_Inpeccion {
    onSubmit?: (data: FallaData[]) => void;
    onCancel?: () => void;
    inspecciones?: InspeccionData[];
}

export default function Inf_Inpeccion({ onSubmit, onCancel, inspecciones }: Inf_Inpeccion) {

    // Helper function to create unique keys
    const getItemKey = (titulo: string, caracteristica: string) => {

        return `${titulo}__${caracteristica}`;
    };

    // Initialize state with existing inspection data

    const initializeDatosFallas = () => {
        if (!inspecciones || inspecciones.length === 0) {
            return {};
        }

        const initialData: { [key: string]: { tiene: boolean; observaciones: string } } = {};

        inspecciones.forEach((inspeccion) => {
            const key = getItemKey(inspeccion.nombre, inspeccion.caracteristica);

            initialData[key] = {
                tiene: inspeccion.tiene,
                observaciones: inspeccion.observaciones || '',
            };


        });
        return initialData;
    };

    const [seccionesAbiertas, setSeccionesAbiertas] = useState<{ [key: string]: boolean }>({
        'Motor Encendido': true,
    });

    const [datosFallas, setDatosFallas] = useState<{
        [key: string]: { tiene: boolean; observaciones: string };

    }>(initializeDatosFallas());

    const toggleSeccion = (titulo: string) => {
        setSeccionesAbiertas((prev) => ({
            ...prev,
            [titulo]: !prev[titulo],
        }));
    };

    const handleCheckboxChange = (titulo: string, caracteristica: string, checked: boolean) => {
        const key = getItemKey(titulo, caracteristica);
        setDatosFallas((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                tiene: checked,
            },
        }));
    };

    const handleObservacionChange = (titulo: string, caracteristica: string, observaciones: string) => {
        const key = getItemKey(titulo, caracteristica);
        setDatosFallas((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                observaciones,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construir array de datos para enviar al backend
        const fallasData: FallaData[] = [];

        seccionesFallas.forEach((seccion) => {
            seccion.items.forEach((item) => {
                const key = getItemKey(seccion.titulo, item.caracteristica);
                const datos = datosFallas[key];


                // Solo incluir items que tienen el checkbox marcado o tienen observaciones
                if (datos?.tiene || datos?.observaciones) {
                    fallasData.push({
                        nombre: seccion.titulo,
                        caracteristica: item.caracteristica,
                        tiene: datos?.tiene || false,
                        valoracion: item.valoracion,
                        observaciones: datos?.observaciones || '',
                    });
                }

            });
        });

        //console.log('Datos de fallas a enviar:', fallasData);



        if (onSubmit) {
            onSubmit(fallasData);
        }
    };

    return (
        <div className="w-full">
            <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 shadow-sm dark:border-[#20384b] dark:bg-[#1a2c3a] sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {seccionesFallas.map((seccion) => (
                        <div
                            key={seccion.titulo}
                            className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 dark:border-[#20384b] dark:bg-[#0f1a23]"
                        >
                            {/* Header de la sección */}
                            <button
                                type="button"
                                onClick={() => toggleSeccion(seccion.titulo)}
                                className="flex w-full items-center justify-between text-left"
                            >
                                <h3 className="text-lg font-bold text-[#1e293b] dark:text-white/90">
                                    {seccion.titulo}
                                </h3>
                                <ChevronDown
                                    className={`h-5 w-5 text-[#64748b] transition-transform duration-300 dark:text-white/70 
                                        ${seccionesAbiertas[seccion.titulo] ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Contenido de la sección */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ${seccionesAbiertas[seccion.titulo]
                                    ? 'mt-4 max-h-[5000px] border-t border-[#e2e8f0] pt-4 dark:border-[#20384b]'
                                    : 'max-h-0'
                                    }`}
                            >
                                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                                    {seccion.items.map((item) => {
                                        const key = getItemKey(seccion.titulo, item.caracteristica);
                                        const isChecked = datosFallas[key]?.tiene || false;

                                        return (
                                            <div
                                                key={item.caracteristica}
                                                className="flex flex-col gap-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-3 dark:border-[#20384b] dark:bg-[#0f1a23]/50 sm:flex-row sm:items-center"
                                            >
                                                {/* Nombre de la característica y checkbox */}
                                                <div className="flex flex-1 items-center gap-3">
                                                    {/* Checkbox personalizado */}
                                                    <label className="relative flex shrink-0 cursor-pointer items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={(e) =>
                                                                handleCheckboxChange(
                                                                    seccion.titulo,
                                                                    item.caracteristica,
                                                                    e.target.checked
                                                                )
                                                            }
                                                            className="peer sr-only"
                                                        />
                                                        <div
                                                            className={`h-6 w-6 rounded-md border-2 transition-all duration-200 ${isChecked
                                                                ? 'border-[#00AEEF] bg-[#00AEEF]'
                                                                : 'border-[#94a3b8] bg-transparent dark:border-[#64748b]'
                                                                }`}
                                                        >
                                                            {isChecked && (
                                                                <Check className="h-full w-full p-0.5 text-white" />
                                                            )}
                                                        </div>
                                                    </label>

                                                    {/* Nombre de la característica */}
                                                    <Label className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                                        {item.caracteristica}
                                                    </Label>
                                                </div>

                                                {/* Campo de observaciones */}
                                                <div className="sm:w-48">
                                                    <Input
                                                        type="text"
                                                        placeholder="Observaciones"
                                                        value={datosFallas[key]?.observaciones || ''}
                                                        onChange={(e) =>
                                                            handleObservacionChange(
                                                                seccion.titulo,
                                                                item.caracteristica,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Botones de acción */}
                    <div className="flex items-center justify-end gap-4 border-t border-[#e2e8f0] pt-6 dark:border-[#20384b]">
                        <Link href={route('dashboard')}>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-[#e2e8f0] text-[#1e293b] hover:bg-[#f8fafc] dark:border-[#20384b] dark:text-white/90 dark:hover:bg-[#0f1a23]"
                            >
                                Cancelar
                            </Button>
                        </Link>

                        <Button type="submit" className="bg-[#00AEEF] hover:bg-[#00AEEF]/90">
                            Guardar Registro de Fallas
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
