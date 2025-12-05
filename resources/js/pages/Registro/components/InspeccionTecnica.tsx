import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, AlertCircle } from 'lucide-react';
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

interface ComponenteInspeccion {
    componente: string;
    estado: string | null;
    observaciones: string | null;
}

interface SistemaInspeccion {
    nombre_sistema: string;
    componentes: ComponenteInspeccion[];
}

interface InspeccionTecnicaProps {
    onSubmit?: (data: { sistemas: SistemaInspeccion[] }) => void;
    onCancel?: () => void;
}

const seccionesInspeccion: SeccionInspeccion[] = [
    {
        titulo: 'Motor',
        items: [

            { nombre: 'Motor', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Presión compresión prom.', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Aceite y filtro de aceite', opciones: ['B', 'R', 'RC', 'RR'] },
            { nombre: 'Turboalimentador', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
        ],
    },
    {
        titulo: 'Refrigeración',
        items: [
            { nombre: 'Mangueras de radiador', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Correas de ventilador', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Ventilador y tapa radiador', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
        ],
    },
    {
        titulo: 'Eléctrico',
        items: [
            { nombre: 'Batería', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Motor de arranque', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Alternador', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Caja de fusibles', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Tablero de instrumentos', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
        ],
    },
    {
        titulo: 'Direccionamiento',
        items: [
            { nombre: 'Hidraulica', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Electrica', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Mecanica', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Muñones de dirección', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Fugas de aceite', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
        ],
    },
    {
        titulo: 'Suspensión',
        items: [
            { nombre: 'Amortiguadores', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Muñones de suspensión', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Espiral y/o muelles tras.', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
        ],
    },
    {
        titulo: 'Transmisión',
        items: [
            { nombre: 'Mecanica', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Automatica', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Secuencial', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Aceite', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
        ],
    },
    {
        titulo: 'Frenos',
        items: [
            { nombre: 'Disco posterior', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Discos delanteros', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Balatas traseras', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Freno de mano', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
        ],
    },
    {
        titulo: 'Chasis',
        items: [
            { nombre: 'Compacto', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Bastidor', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
        ],
    },
    {
        titulo: 'Carrocería',
        items: [
            { nombre: 'Faroles delanteros', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Guiñadores', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Bocina', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Luces de parada (stop)', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Luz de retro', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Alarma de retroceso', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Cinturones de seguridad', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Espejos retrovisores later.', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Luces de emergencia', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Limpia parabrisas', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Tapicería interior', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Parabrisas y vidrios lat.', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
        ],
    },
    {
        titulo: 'Aire acondicionado y otros',
        items: [
            { nombre: 'Aire acondicionado', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Calefacción', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Radio', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Llantas', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
            { nombre: 'Llanta de repuesto', opciones: ['B', 'R', 'RC', 'RR', 'SI', 'NO'] },
        ],
    },
    {
        titulo: 'Herramientas',
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
    const [errores, setErrores] = useState<{ [key: string]: string }>({});
    const [errorGeneral, setErrorGeneral] = useState<string>('');

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
                observaciones: prev[itemNombre]?.observaciones || '',
            },
        }));
        // Limpiar error si existe
        if (errores[itemNombre]) {
            setErrores((prev) => {
                const newErrors = { ...prev };
                delete newErrors[itemNombre];
                return newErrors;
            });
        }
    };

    const handleObservacionChange = (itemNombre: string, observaciones: string, nombreSistema: string) => {
        setDatosInspeccion((prev) => ({
            ...prev,
            [itemNombre]: {
                ...prev[itemNombre],
                nombre_sistema: nombreSistema,
                componente: itemNombre,
                estado: prev[itemNombre]?.estado || '',
                observaciones,
            },
        }));
        // Limpiar error si existe
        if (errores[itemNombre]) {
            setErrores((prev) => {
                const newErrors = { ...prev };
                delete newErrors[itemNombre];
                return newErrors;
            });
        }
    };

    const validarDatos = (): boolean => {
        const nuevosErrores: { [key: string]: string } = {};
        let hayErrores = false;

        // Validar que cada item tenga al menos estado o observaciones
        seccionesInspeccion.forEach((seccion) => {
            seccion.items.forEach((item) => {
                const dato = datosInspeccion[item.nombre];

                // Si no hay datos para este item, es válido (campo opcional)
                if (!dato) {
                    return;
                }

                // Si hay datos, validar que tenga al menos estado o observaciones
                const tieneEstado = dato.estado && dato.estado.trim() !== '';
                const tieneObservaciones = dato.observaciones && dato.observaciones.trim() !== '';

                if (!tieneEstado && !tieneObservaciones) {
                    nuevosErrores[item.nombre] = 'Debe seleccionar un estado o agregar observaciones';
                    hayErrores = true;
                }
            });
        });

        setErrores(nuevosErrores);

        if (hayErrores) {
            setErrorGeneral('Por favor, complete los campos requeridos. Cada componente debe tener un estado o una observación.');
        } else {
            setErrorGeneral('');
        }

        return !hayErrores;
    };

    const transformarDatos = (): { sistemas: SistemaInspeccion[] } => {
        const sistemasMap = new Map<string, ComponenteInspeccion[]>();

        // Agrupar componentes por sistema
        Object.values(datosInspeccion).forEach((dato) => {
            if (!dato.nombre_sistema) return;

            const componente: ComponenteInspeccion = {
                componente: dato.componente,
                estado: dato.estado && dato.estado.trim() !== '' ? dato.estado : null,
                observaciones: dato.observaciones && dato.observaciones.trim() !== '' ? dato.observaciones : null,
            };

            if (!sistemasMap.has(dato.nombre_sistema)) {
                sistemasMap.set(dato.nombre_sistema, []);
            }
            sistemasMap.get(dato.nombre_sistema)!.push(componente);
        });

        // Convertir el Map a array de sistemas
        const sistemas: SistemaInspeccion[] = Array.from(sistemasMap.entries()).map(
            ([nombre_sistema, componentes]) => ({
                nombre_sistema,
                componentes,
            })
        );

        return { sistemas };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar datos
        if (!validarDatos()) {
            return;
        }

        // Transformar y enviar datos
        const datosTransformados = transformarDatos();

        if (onSubmit) {
            onSubmit(datosTransformados);
        }
    };

    return (
        <div className="w-full">
            <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-6 shadow-sm dark:border-[#20384b] dark:bg-[#1a2c3a]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Mensaje de error general */}
                    {errorGeneral && (
                        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-800 dark:text-red-200">{errorGeneral}</p>
                        </div>
                    )}

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
                                                    className={`border-[#e2e8f0] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#00AEEF] focus:ring-[#00AEEF]/20 dark:border-[#20384b] dark:bg-[#0f1a23] dark:text-white/90 dark:placeholder:text-[#64748b] dark:focus:border-[#00AEEF] ${errores[item.nombre] ? 'border-red-500 dark:border-red-500' : ''
                                                        }`}
                                                />
                                            </div>

                                            {/* Mensaje de error individual */}
                                            {errores[item.nombre] && (
                                                <div className="lg:col-span-12">
                                                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                                        <AlertCircle className="h-4 w-4" />
                                                        {errores[item.nombre]}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
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
