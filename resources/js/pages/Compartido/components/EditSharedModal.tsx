import { useState, useEffect } from 'react';
import { X, Edit, Calendar, FileText, MessageSquare, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type AvaluoCompartido } from '../types';
import InputError from '@/components/input-error';

// Opciones de motivo
const MOTIVO_OPTIONS = [
    { value: 'consulta', label: 'Consulta' },
    { value: 'revision', label: 'Revisión' },
    { value: 'aprobacion', label: 'Aprobación' },
    { value: 'vista general', label: 'Vista General' },
    { value: 'acceso publico', label: 'Acceso Público' },
    { value: 'otro', label: 'Otro' },
];

// Opciones de estado
const ESTADO_OPTIONS = [
    { value: 'activo', label: 'Activo' },
    { value: 'vencido', label: 'Vencido' },
    { value: 'renovado', label: 'Renovado' },
];

interface EditSharedModalProps {
    item: AvaluoCompartido | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (id: number, data: {
        fecha_inicio: string | null;
        fecha_fin: string | null;
        motivo: string;
        estado: string;
        observaciones: string | null;
    }) => void;
    errors?: Record<string, string>;
}

export function EditSharedModal({ item, isOpen, onClose, onConfirm, errors = {} }: EditSharedModalProps) {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [motivo, setMotivo] = useState('');
    const [estado, setEstado] = useState('');
    const [observaciones, setObservaciones] = useState('');

    // Cargar datos cuando se abre el modal
    useEffect(() => {
        if (item && isOpen) {
            setFechaInicio(item.fecha_inicio ? item.fecha_inicio.split('T')[0] : '');
            setFechaFin(item.fecha_fin ? item.fecha_fin.split('T')[0] : '');
            setMotivo(item.motivo || '');
            setEstado(item.estado || 'activo');
            setObservaciones(item.observaciones || '');
        }
    }, [item, isOpen]);

    const handleSubmit = () => {
        if (!item || !motivo || !estado) return;

        onConfirm(item.id, {
            fecha_inicio: fechaInicio || null,
            fecha_fin: fechaFin || null,
            motivo,
            estado,
            observaciones: observaciones || null,
        });
    };

    const handleClose = () => {
        setFechaInicio('');
        setFechaFin('');
        setMotivo('');
        setEstado('');
        setObservaciones('');
        onClose();
    };

    // Verificar si las fechas están vacías (sin expiración)
    const sinExpiracion = !fechaInicio && !fechaFin;

    if (!isOpen || !item) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className={cn(
                        "relative w-full max-w-lg",
                        "bg-white dark:bg-[#1a2c3a]",
                        "border border-[#e2e8f0] dark:border-[#20384b]",
                        "rounded-xl shadow-2xl",
                        "animate-in fade-in-0 zoom-in-95 duration-300",
                        "max-h-[90vh] overflow-hidden flex flex-col"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#e2e8f0] dark:border-[#20384b]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center">
                                <Edit className="w-5 h-5 text-amber-500" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-[#1e293b] dark:text-white/90">
                                    Editar Compartido
                                </h2>
                                <p className="text-sm text-[#64748b] dark:text-white/50">
                                    {item.avaluo?.vehiculo?.marca?.nombre} {item.avaluo?.vehiculo?.modelo}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-8 h-8 rounded-full flex items-center justify-center 
                                text-[#64748b] dark:text-white/50
                                hover:bg-[#f8fafc] dark:hover:bg-[#20384b]
                                transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                        {/* Fechas de inicio y fin */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#00AEEF]" />
                                <label className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    Período de acceso
                                </label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs text-[#64748b] dark:text-white/50">
                                        Fecha inicio
                                    </label>
                                    <input
                                        type="date"
                                        value={fechaInicio}
                                        disabled
                                        className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] dark:border-[#20384b]
                                            bg-[#f8fafc] dark:bg-[#0f1a23]/50
                                            text-[#64748b] dark:text-white/40
                                            text-sm
                                            cursor-not-allowed
                                            focus:outline-none"
                                    />
                                    <InputError message={errors.fecha_inicio} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs text-[#64748b] dark:text-white/50">
                                        Fecha fin
                                    </label>
                                    <input
                                        type="date"
                                        value={fechaFin}
                                        onChange={(e) => setFechaFin(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] dark:border-[#20384b]
                                            bg-white dark:bg-[#0f1a23]
                                            text-[#1e293b] dark:text-white/90
                                            text-sm
                                            focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/50"
                                    />
                                    <InputError message={errors.fecha_fin} />
                                </div>
                            </div>
                            {/* Advertencia de sin expiración */}
                            {sinExpiracion && (
                                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
                                    <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        <strong>Sin expiración:</strong> Si dejas ambas fechas vacías, el acceso compartido no tendrá fecha de vencimiento.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Estado */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#00AEEF]" />
                                <label className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    Estado <span className="text-red-500">*</span>
                                </label>
                            </div>
                            <select
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] dark:border-[#20384b]
                                    bg-white dark:bg-[#0f1a23]
                                    text-[#1e293b] dark:text-white/90
                                    text-sm
                                    focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/50
                                    cursor-pointer"
                            >
                                {ESTADO_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.estado} />
                        </div>

                        {/* Motivo */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#00AEEF]" />
                                <label className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    Motivo <span className="text-red-500">*</span>
                                </label>
                            </div>
                            <select
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] dark:border-[#20384b]
                                    bg-white dark:bg-[#0f1a23]
                                    text-[#1e293b] dark:text-white/90
                                    text-sm
                                    focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/50
                                    cursor-pointer"
                            >
                                <option value="">Selecciona un motivo...</option>
                                {MOTIVO_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.motivo} />
                            {motivo === 'acceso publico' && (
                                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/30">
                                    <Info className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-purple-700 dark:text-purple-300">
                                        Se generará un enlace público para acceder a este avalúo.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Observaciones */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-[#00AEEF]" />
                                <label className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    Observaciones <span className="text-xs text-[#64748b] dark:text-white/50">(opcional)</span>
                                </label>
                            </div>
                            <textarea
                                value={observaciones}
                                onChange={(e) => setObservaciones(e.target.value)}
                                placeholder="Añade notas o instrucciones adicionales..."
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] dark:border-[#20384b]
                                    bg-white dark:bg-[#0f1a23]
                                    text-[#1e293b] dark:text-white/90
                                    text-sm resize-none
                                    focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/50
                                    placeholder:text-[#94a3b8] dark:placeholder:text-white/40"
                            />
                            <InputError message={errors.observaciones} />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-[#e2e8f0] dark:border-[#20384b] bg-[#f8fafc] dark:bg-[#0f1a23]">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="w-full sm:w-auto order-2 sm:order-1
                                border-[#e2e8f0] dark:border-[#20384b]
                                text-[#64748b] dark:text-white/70
                                hover:bg-[#f8fafc] dark:hover:bg-[#20384b]"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!motivo || !estado}
                            className={cn(
                                "w-full sm:w-auto sm:flex-1 order-1 sm:order-2 gap-2",
                                "bg-amber-500 hover:bg-amber-600 text-white",
                                "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                        >
                            <Edit className="w-4 h-4" />
                            Guardar Cambios
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
