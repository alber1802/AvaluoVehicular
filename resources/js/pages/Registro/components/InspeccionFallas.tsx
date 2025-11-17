import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, Check } from 'lucide-react';

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

interface InspeccionFallasProps {
    onSubmit?: (data: FallaData[]) => void;
    onCancel?: () => void;
}

const seccionesFallas: SeccionFallas[] = [
    {
        titulo: 'MOTOR ENCENDIDO',
        items: [
            { caracteristica: 'Falla de encendido inicial', valoracion: 0.025 },
            { caracteristica: 'Mala partida', valoracion: 0.025 },
            { caracteristica: 'Demora partida', valoracion: 0.025 },
            { caracteristica: 'El motor se detiene al encender', valoracion: 0.025 },
            { caracteristica: 'Se suelta el acelerador', valoracion: 0.025 },
        ],
    },
    {
        titulo: 'MOTOR CONDUCCION',
        items: [
            { caracteristica: 'Falla al acelerar', valoracion: 0.02 },
            { caracteristica: 'Encendido adelantado/atrasado', valoracion: 0.02 },
            { caracteristica: 'Pérdida de potencia', valoracion: 0.02 },
            { caracteristica: 'Humo negro', valoracion: 0.02 },
            { caracteristica: 'Embrague defectuoso', valoracion: 0.02 },
        ],
    },
    {
        titulo: 'MARCHA EN VACIO',
        items: [
            { caracteristica: 'Marcha en vacio anormal', valoracion: 0.02 },
            { caracteristica: 'Marcha en vacio inestable', valoracion: 0.02 },
        ],
    },
    {
        titulo: 'Indicador CHECK ENGINE en el tablero',
        items: [
            { caracteristica: 'No se enciende', valoracion: 0.02 },
            { caracteristica: 'Siempre encendida', valoracion: 0.02 },
            { caracteristica: 'Ocasionalmente encendida', valoracion: 0.02 },
        ],
    },
    {
        titulo: 'TRANSMISIÓN',
        items: [
            { caracteristica: 'Resbala', valoracion: 0.015 },
            { caracteristica: 'Patina el embrague', valoracion: 0.015 },
            { caracteristica: 'Pedal de embrague atascado', valoracion: 0.015 },
            { caracteristica: 'Vibración al partir', valoracion: 0.015 },
            { caracteristica: 'No entra los cambios', valoracion: 0.015 },
            { caracteristica: 'Se suelta la marcha', valoracion: 0.015 },
            { caracteristica: 'Sonidos en los cambios', valoracion: 0.015 },
            { caracteristica: 'Sonido en el diferencial', valoracion: 0.015 },
        ],
    },
    {
        titulo: 'FRENOS',
        items: [
            { caracteristica: 'Sonidos en las ruedas al curvar', valoracion: 0.015 },
            { caracteristica: 'Fugas de aceite', valoracion: 0.015 },
            { caracteristica: 'Sonidos al frenar', valoracion: 0.015 },
            { caracteristica: 'Frenos defectuosos', valoracion: 0.025 },
            { caracteristica: 'No funciona freno de mano', valoracion: 0.025 },
        ],
    },
    {
        titulo: 'SUSPENSIÓN Y CARROCERIA',
        items: [
            { caracteristica: 'Fugas de liquido', valoracion: 0.025 },
            { caracteristica: 'Sonidos o golpeteo', valoracion: 0.02 },
            { caracteristica: 'Rebotes', valoracion: 0.02 },
            { caracteristica: 'Suspensión floja', valoracion: 0.02 },
        ],
    },
    {
        titulo: 'DIRECCIÓN',
        items: [
            { caracteristica: 'Tiende a ir al lado', valoracion: 0.0225 },
            { caracteristica: 'Suena al curvar', valoracion: 0.0225 },
            { caracteristica: 'No responde efectivamente', valoracion: 0.0225 },
            { caracteristica: 'Mala distribución', valoracion: 0.0225 },
        ],
    },
    {
        titulo: 'ELECTRICIDAD',
        items: [
            { caracteristica: 'Fallan luces delanteras', valoracion: 0.01 },
            { caracteristica: 'Fallan luces direccionales', valoracion: 0.01 },
            { caracteristica: 'Fallan luces de freno', valoracion: 0.01 },
            { caracteristica: 'Fallan luces de retro', valoracion: 0.01 },
            { caracteristica: 'Fallan luces de salón', valoracion: 0.01 },
            { caracteristica: 'Fallan luces de tablero', valoracion: 0.01 },
            { caracteristica: 'Fallan instrumentos del tablero', valoracion: 0.01 },
            { caracteristica: 'Descarga de batería', valoracion: 0.01 },
            { caracteristica: 'Falla bocina', valoracion: 0.01 },
            { caracteristica: 'Fallan limpiaparabrisas', valoracion: 0.01 },
        ],
    },
    {
        titulo: 'APARIENCIA INTERIOR Y EXTERIOR',
        items: [
            { caracteristica: 'Tablero', valoracion: 0.015 },
            { caracteristica: 'Motor', valoracion: 0.015 },
            { caracteristica: 'Caja de cambios', valoracion: 0.015 },
            { caracteristica: 'Diferencial', valoracion: 0.015 },
            { caracteristica: 'Engrasado', valoracion: 0.015 },
            { caracteristica: 'Lavado', valoracion: 0.015 },
        ],
    },
    {
        titulo: 'ACCESORIOS Y ADICIONALES',
        items: [
            { caracteristica: 'Llave de ruedas', valoracion: 0.005 },
            { caracteristica: 'Retrovisores', valoracion: 0.005 },
            { caracteristica: 'Alarma de emergencia', valoracion: 0.005 },
            { caracteristica: 'Espejos', valoracion: 0.005 },
            { caracteristica: 'Antena', valoracion: 0.005 },
            { caracteristica: 'Parrillas radio', valoracion: 0.005 },
            { caracteristica: 'Tapa de gasolina', valoracion: 0.005 },
            { caracteristica: 'Gata', valoracion: 0.005 },
            { caracteristica: 'Rayones', valoracion: 0.005 },
            { caracteristica: 'Radio', valoracion: 0.005 },
            { caracteristica: 'Encendedor', valoracion: 0.005 },
            { caracteristica: 'Tapacubos', valoracion: 0.005 },
            { caracteristica: 'Extintor', valoracion: 0.005 },
            { caracteristica: 'Herramientas', valoracion: 0.005 },
            { caracteristica: 'Alfombras', valoracion: 0.005 },
            { caracteristica: 'Parabrisas', valoracion: 0.005 },
        ],
    },
];

export default function InspeccionFallas({ onSubmit, onCancel }: InspeccionFallasProps) {
    const [seccionesAbiertas, setSeccionesAbiertas] = useState<{ [key: string]: boolean }>({
        'MOTOR ENCENDIDO': true,
    });
    const [datosFallas, setDatosFallas] = useState<{
        [key: string]: { tiene: boolean; observaciones: string };
    }>({});

    const toggleSeccion = (titulo: string) => {
        setSeccionesAbiertas((prev) => ({
            ...prev,
            [titulo]: !prev[titulo],
        }));
    };

    const getItemKey = (titulo: string, caracteristica: string) => {
        return `${titulo}__${caracteristica}`;
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

        console.log('Datos de fallas a enviar:', fallasData);
        
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
                                    className={`h-5 w-5 text-[#64748b] transition-transform duration-300 dark:text-white/70 ${
                                        seccionesAbiertas[seccion.titulo] ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {/* Contenido de la sección */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    seccionesAbiertas[seccion.titulo]
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
                                                            className={`h-6 w-6 rounded-md border-2 transition-all duration-200 ${
                                                                isChecked
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
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel || (() => window.history.back())}
                            className="border-[#e2e8f0] text-[#1e293b] hover:bg-[#f8fafc] dark:border-[#20384b] dark:text-white/90 dark:hover:bg-[#0f1a23]"
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-[#00AEEF] hover:bg-[#00AEEF]/90">
                            Guardar Registro de Fallas
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
