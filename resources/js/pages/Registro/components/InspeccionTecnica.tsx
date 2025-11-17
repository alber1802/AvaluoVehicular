import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown } from 'lucide-react';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';

interface InspeccionItem {
    nombre: string;
    opciones: string[];
}

interface SeccionInspeccion {
    titulo: string;
    items: InspeccionItem[];
}

interface InspeccionData {
    [key: string]: {
        nombre_sistema: string;
        componente: string;
        estado: string;
        observaciones: string;
    };
}

interface InspeccionTecnicaProps {
    onSubmit?: (data: InspeccionData) => void;
    onCancel?: () => void;
}

const seccionesInspeccion: SeccionInspeccion[] = [
    {
        titulo: 'MOTOR',
        items: [
            { nombre: 'Presión compresión prom.', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Aceite y filtro de aceite', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'TURBOALIMENTADOR', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
        ],
    },
    {
        titulo: 'REFRIGERACIÓN',
        items: [
            { nombre: 'Mangueras de radiador', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Correas de ventilador', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Ventilador y tapa radiador', opciones: ['B', 'R', 'RC', 'RR'] },
        ],
    },
    {
        titulo: 'ELÉCTRICO',
        items: [
            { nombre: 'Batería', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Motor de arranque', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Alternador', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Caja de fusibles', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Tablero de instrumentos', opciones: ['B', 'R', 'RC', 'RR'] },
        ],
    },
    {
        titulo: 'DIRECCIÓN',
        items: [
            { nombre: 'Muñones de dirección', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Fugas de aceite', opciones: ['SI', 'NO'] },
        ],
    },
    {
        titulo: 'SUSPENSIÓN',
        items: [
            { nombre: 'Amortiguadores', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Muñones de suspensión', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Espiral y/o muelles tras.', opciones: ['B', 'R', 'RC', 'RR'] },
        ],
    },
    {
        titulo: 'TRANSMISIÓN',
        items: [
            { nombre: 'Aceite', opciones: ['B', 'R', 'RC', 'RR'] },
        ],
    },
    {
        titulo: 'FRENOS',
        items: [
            { nombre: 'Disco del. y/o post.', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Discos delanteros', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Balatas traseras', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Freno de mano', opciones: ['B', 'R', 'RC', 'RR'] },
        ],
    },
    {
        titulo: 'CHASIS',
        items: [
            { nombre: 'Bastidor', opciones: ['B', 'R', 'RC', 'RR'] },
        ],
    },
    {
        titulo: 'CARROCERÍA',
        items: [
            { nombre: 'Faroles delanteros', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Guiñadores', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Bocina', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Luces de parada (stop)', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Luz de retro', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Alarma de retroceso', opciones: ['SI', 'NO'] },
            { nombre: 'Cinturones de seguridad', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Espejos retrovisores later.', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Luces de emergencia', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Limpia parabrisas', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Tapicería interior', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Parabrisas y vidrios lat.', opciones: ['B', 'R', 'RC', 'RR'] },
        ],
    },
    {
        titulo: 'AIRE ACONDICIONADO Y OTROS',
        items: [
            { nombre: 'Aire acondicionado', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Calefacción', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Radio', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Llantas', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Llanta de repuesto', opciones: ['SI', 'NO'] },
        ],
    },
    {
        titulo: 'HERRAMIENTAS',
        items: [
            { nombre: 'Llave de ruedas y barrote', opciones: ['SI', 'NO'] },
            { nombre: 'Gato hidráulico', opciones: ['SI', 'NO'] },
        ],
    },
];

export default function InspeccionTecnica({ onSubmit, onCancel }: InspeccionTecnicaProps) {
    const [seccionesAbiertas, setSeccionesAbiertas] = useState<{ [key: string]: boolean }>({
        MOTOR: true,
    });
    const [datosInspeccion, setDatosInspeccion] = useState<InspeccionData>({});

    const toggleSeccion = (titulo: string) => {
        setSeccionesAbiertas((prev) => ({
            ...prev,
            [titulo]: !prev[titulo],
        }));
    };

    const handleEstadoChange = (itemNombre: string, estado: string, nombreSistema: string) => {
        setDatosInspeccion((prev) => ({
            ...prev,
            [itemNombre]: {
                ...prev[itemNombre],
                nombre_sistema: nombreSistema,
                componente: itemNombre,
                estado,
            },
        }));
    };

    const handleObservacionChange = (itemNombre: string, observaciones: string, nombreSistema: string) => {
        setDatosInspeccion((prev) => ({
            ...prev,
            [itemNombre]: {
                ...prev[itemNombre],
                nombre_sistema: nombreSistema,
                componente: itemNombre,
                observaciones,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(datosInspeccion);
        }
    };

    return (
        <div className="w-full">
            <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-6 shadow-sm dark:border-[#20384b] dark:bg-[#1a2c3a]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {seccionesInspeccion.map((seccion) => (
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
                                    className={`h-5 w-5 text-[#64748b] transition-transform duration-300 dark:text-white/70 ${seccionesAbiertas[seccion.titulo] ? 'rotate-180' : ''
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
                                <div className="space-y-3">
                                    {seccion.items.map((item) => (
                                        <div
                                            key={item.nombre}
                                            className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center"
                                        >
                                            {/* Nombre del item */}
                                            <div className="lg:col-span-3">
                                                <Label className="font-medium text-[#1e293b] dark:text-white/90">
                                                    {item.nombre}
                                                </Label>
                                            </div>

                                            {/* Opciones de radio */}
                                            <div className="flex flex-wrap items-center gap-2 lg:col-span-5">
                                                {item.opciones.map((opcion) => (
                                                    <label
                                                        key={opcion}
                                                        className={`cursor-pointer rounded-full border px-3 py-1 text-sm transition-all duration-200 ${datosInspeccion[item.nombre]?.estado === opcion
                                                                ? 'border-[#00AEEF] bg-[#00AEEF] text-white'
                                                                : 'border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] hover:border-[#00AEEF] dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:hover:border-[#00AEEF]'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={item.nombre}
                                                            value={opcion}
                                                            checked={datosInspeccion[item.nombre]?.estado === opcion}
                                                            onChange={() => handleEstadoChange(item.nombre, opcion, seccion.titulo)}
                                                            className="hidden"
                                                        />
                                                        {opcion}
                                                    </label>
                                                ))}
                                            </div>

                                            {/* Campo de observaciones */}
                                            <div className="lg:col-span-4">
                                                <Input
                                                    type="text"
                                                    placeholder="Observaciones"
                                                    value={datosInspeccion[item.nombre]?.observaciones || ''}
                                                    onChange={(e) =>
                                                        handleObservacionChange(item.nombre, e.target.value, seccion.titulo)
                                                    }
                                                    className="border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF]"
                                                />
                                            </div>
                                        </div>
                                    ))}
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
                        <Button
                            type="submit"
                            className="bg-[#00AEEF] hover:bg-[#00AEEF]/90"
                        >
                            Guardar Inspección
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
