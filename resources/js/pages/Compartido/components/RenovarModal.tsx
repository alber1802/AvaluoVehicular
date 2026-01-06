import { useState, useEffect } from 'react';
import { X, RefreshCw, Calendar, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type AvaluoCompartido } from '../types';
import InputError from '@/components/input-error';

// Función para obtener la fecha de hoy en formato YYYY-MM-DD
const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Función para formatear fecha de objeto Date o string a YYYY-MM-DD
const formatDateToInput = (dateString: string | null): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

interface RenovarModalProps {
    item: AvaluoCompartido | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (id: number, data: { fecha_fin: string }) => void;
    errors?: Record<string, string>;
}

export function RenovarModal({ item, isOpen, onClose, onConfirm, errors = {} }: RenovarModalProps) {
    const [fechaFin, setFechaFin] = useState('');
    const [validationError, setValidationError] = useState('');

    // Obtener la fecha mínima permitida (mayor entre fecha_fin anterior y hoy)
    const getMinDate = (): string => {
        const today = getTodayDate();
        if (item?.fecha_fin) {
            const previousDate = formatDateToInput(item.fecha_fin);
            // Retornar la fecha mayor entre hoy y la fecha_fin anterior
            return previousDate > today ? previousDate : today;
        }
        return today;
    };

    // Cargar datos cuando se abre el modal
    useEffect(() => {
        if (item && isOpen) {
            // Por defecto, poner una fecha 30 días después de la fecha mínima
            const minDate = new Date(getMinDate());
            minDate.setDate(minDate.getDate() + 30);
            const year = minDate.getFullYear();
            const month = String(minDate.getMonth() + 1).padStart(2, '0');
            const day = String(minDate.getDate()).padStart(2, '0');
            setFechaFin(`${year}-${month}-${day}`);
            setValidationError('');
        }
    }, [item, isOpen]);

    // Validar la fecha cuando cambia
    const validateDate = (date: string): boolean => {
        if (!date) {
            setValidationError('La fecha de fin es requerida');
            return false;
        }

        const today = getTodayDate();
        const minDate = getMinDate();

        if (date < today) {
            setValidationError('La fecha de fin no puede ser menor al día de hoy');
            return false;
        }

        if (item?.fecha_fin && date <= formatDateToInput(item.fecha_fin)) {
            setValidationError('La fecha de fin debe ser mayor a la fecha anterior');
            return false;
        }

        setValidationError('');
        return true;
    };

    const handleDateChange = (value: string) => {
        setFechaFin(value);
        validateDate(value);
    };

    const handleSubmit = () => {
        if (!item) return;

        if (!validateDate(fechaFin)) return;

        onConfirm(item.id, { fecha_fin: fechaFin });
    };

    const handleClose = () => {
        setFechaFin('');
        setValidationError('');
        onClose();
    };

    if (!isOpen || !item) return null;

    const previousFechaFin = item.fecha_fin ? formatDateToInput(item.fecha_fin) : 'Sin fecha';
    const minDateForInput = getMinDate();

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
                        "relative w-full max-w-md",
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
                                <RefreshCw className="w-5 h-5 text-amber-500" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-[#1e293b] dark:text-white/90">
                                    Renovar Acceso
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
                        {/* Información del estado actual */}
                        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                            <div className="flex gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                        El período de acceso ha vencido
                                    </p>
                                    <p className="text-sm text-amber-700 dark:text-amber-300/80">
                                        La fecha de fin anterior era: <strong>{previousFechaFin}</strong>
                                    </p>
                                    <p className="text-sm text-amber-700 dark:text-amber-300/80">
                                        Ingresa una nueva fecha de fin para renovar el acceso.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Compartido con */}
                        <div className="p-3 rounded-lg bg-[#f8fafc] dark:bg-[#0f1a23] border border-[#e2e8f0] dark:border-[#20384b]">
                            <p className="text-xs text-[#64748b] dark:text-white/50 mb-1">Compartido con:</p>
                            <p className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                {item.user?.name} ({item.user?.email})
                            </p>
                        </div>

                        {/* Nueva fecha de fin */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#00AEEF]" />
                                <label className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    Nueva fecha de fin <span className="text-red-500">*</span>
                                </label>
                            </div>
                            <input
                                type="date"
                                value={fechaFin}
                                min={minDateForInput}
                                onChange={(e) => handleDateChange(e.target.value)}
                                className={cn(
                                    "w-full px-3 py-2 rounded-lg border",
                                    validationError
                                        ? "border-red-500 dark:border-red-500"
                                        : "border-[#e2e8f0] dark:border-[#20384b]",
                                    "bg-white dark:bg-[#0f1a23]",
                                    "text-[#1e293b] dark:text-white/90",
                                    "text-sm",
                                    "focus:outline-none focus:ring-2",
                                    validationError
                                        ? "focus:ring-red-500/50"
                                        : "focus:ring-[#00AEEF]/50"
                                )}
                            />
                            {validationError && (
                                <p className="text-sm text-red-500">{validationError}</p>
                            )}
                            <InputError message={errors.fecha_fin} />
                        </div>

                        {/* Info */}
                        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
                            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                                Al renovar, el estado del compartido cambiará a <strong>"renovado"</strong> y el usuario podrá acceder nuevamente hasta la nueva fecha de fin.
                            </p>
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
                            disabled={!fechaFin || !!validationError}
                            className={cn(
                                "w-full sm:w-auto sm:flex-1 order-1 sm:order-2 gap-2",
                                "bg-amber-500 hover:bg-amber-600 text-white",
                                "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                        >
                            <RefreshCw className="w-4 h-4" />
                            Renovar Acceso
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
