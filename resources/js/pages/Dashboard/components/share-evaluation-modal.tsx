import { useState } from 'react';
import { X, Share2, AlertTriangle, Eye, Download, ShieldOff, Users, Calendar, FileText, MessageSquare, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MultiSelect, type MultiSelectOption } from '@/components/ui/multi-select';
import { cn } from '@/lib/utils';
import { Auth } from '@/types';
import InputError from '@/components/input-error';
import { useForm } from '@inertiajs/react';
// Interfaz para el usuario (basada en el modelo User.php)
export interface ShareUser extends MultiSelectOption {
    id: number;
    name: string;
    email: string;
    role?: string;
    is_active?: boolean;
    phone?: string;
}

// Interfaz para los datos de compartir
export interface ShareData {
    user_ids: number[];
    fecha_inicio: string | null;
    fecha_fin: string | null;
    motivo: string;
    observaciones: string | null;
}

// Opciones de motivo
const MOTIVO_OPTIONS = [
    { value: 'consulta', label: 'Consulta' },
    { value: 'revision', label: 'Revisión' },
    { value: 'aprobacion', label: 'Aprobación' },
    { value: 'vista general', label: 'Vista General' },
    { value: 'acceso publico', label: 'Acceso Público' },
    { value: 'otro', label: 'Otro' },
];

// Función para obtener la fecha de hoy en formato YYYY-MM-DD
const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Interface para errores de validación
interface ShareFormErrors {
    user_ids?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    motivo?: string;
    observaciones?: string;
}

interface ShareEvaluationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShare: (data: ShareData) => void;
    users: ShareUser[];
    evaluationId: number;
    vehicleName?: string;
    isLoading?: boolean;
    auth: Auth;
    errors?: ShareFormErrors;
}

export function ShareEvaluationModal({
    isOpen,
    auth,
    onClose,
    onShare,
    users,
    evaluationId,
    vehicleName = "este avalúo",
    isLoading = false,
    errors = {},
}: ShareEvaluationModalProps) {
    const [selectedUsers, setSelectedUsers] = useState<ShareUser[]>([]);
    const [fechaInicio, setFechaInicio] = useState<string>(getTodayDate());
    const [fechaFin, setFechaFin] = useState<string>('');
    const [motivo, setMotivo] = useState<string>('');
    const [observaciones, setObservaciones] = useState<string>('');

    // Filtrar usuarios excluyendo al usuario autenticado (no puede compartirse a sí mismo)
    // y mapear para el MultiSelect
    const userOptions: ShareUser[] = users
        .filter(user => user.id !== auth.user.id)
        .map(user => ({
            ...user,
            status: user.is_active ? 'active' : 'inactive',
        }));

    // Verificar si las fechas están vacías (sin expiración)
    const sinExpiracion = !fechaInicio && !fechaFin;

    // Manejar envío
    const handleShare = () => {
        if (selectedUsers.length === 0 || !motivo) return;


        const shareData: ShareData = {
            user_ids: selectedUsers.map(user => user.id),
            fecha_inicio: fechaInicio || null,
            fecha_fin: fechaFin || null,
            motivo,
            observaciones: observaciones || null,
        };

        onShare(shareData);
    };

    // Resetear al cerrar
    const handleClose = () => {
        setSelectedUsers([]);
        setFechaInicio(getTodayDate());
        setFechaFin('');
        setMotivo('');
        setObservaciones('');
        onClose();
    };

    if (!isOpen) return null;

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
                            <div className="w-10 h-10 rounded-full bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 flex items-center justify-center">
                                <Share2 className="w-5 h-5 text-[#00AEEF]" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-[#1e293b] dark:text-white/90">
                                    Compartir Avalúo
                                </h2>
                                <p className="text-sm text-[#64748b] dark:text-white/50 hidden sm:block">
                                    Selecciona los usuarios que podrán acceder
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
                        {/* Aviso de permisos */}
                        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                            <div className="flex gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                        Información importante sobre permisos
                                    </p>
                                    <p className="text-sm text-amber-700 dark:text-amber-300/80">
                                        Los usuarios que selecciones tendrán acceso limitado a{' '}
                                        <span className="font-semibold">{vehicleName}</span>:
                                    </p>
                                    <ul className="space-y-1.5 text-sm text-amber-700 dark:text-amber-300/80">
                                        <li className="flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            <span>Podrán <strong>visualizar</strong> el avalúo completo</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Download className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            <span>Podrán <strong>descargar</strong> el reporte en PDF</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ShieldOff className="w-4 h-4 text-red-500 dark:text-red-400" />
                                            <span><strong>No podrán editar</strong> ni modificar ningún dato</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Selector de usuarios */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#00AEEF]" />
                                <label className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    Seleccionar usuarios <span className="text-red-500">*</span>
                                </label>
                            </div>
                            <MultiSelect
                                options={userOptions}
                                value={selectedUsers}
                                onChange={setSelectedUsers}
                                placeholder="Buscar y seleccionar usuarios..."
                                searchPlaceholder="Escribe para buscar..."
                                emptyMessage="No se encontraron usuarios disponibles"
                                showSearch={true}
                                showSelectAll={true}
                                maxHeight={200}
                            />
                            <InputError message={errors.user_ids} />
                            {selectedUsers.length > 0 && (
                                <p className="text-xs text-[#64748b] dark:text-white/50">
                                    {selectedUsers.length} usuario{selectedUsers.length !== 1 ? 's' : ''} seleccionado{selectedUsers.length !== 1 ? 's' : ''} para compartir
                                </p>
                            )}
                        </div>

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
                                        onChange={(e) => setFechaInicio(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] dark:border-[#20384b]
                                            bg-white dark:bg-[#0f1a23]
                                            text-[#1e293b] dark:text-white/90
                                            text-sm
                                            focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/50
                                            placeholder:text-[#94a3b8] dark:placeholder:text-white/40"
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
                                            focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/50
                                            placeholder:text-[#94a3b8] dark:placeholder:text-white/40"
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

                        {/* Lista de usuarios seleccionados (vista resumida en móvil) */}
                        {selectedUsers.length > 0 && (
                            <div className="p-3 rounded-lg bg-[#f8fafc] dark:bg-[#0f1a23] border border-[#e2e8f0] dark:border-[#20384b]">
                                <p className="text-xs font-medium text-[#64748b] dark:text-white/50 mb-2">
                                    Se compartirá con:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedUsers.map(user => (
                                        <div
                                            key={user.id}
                                            className="inline-flex items-center gap-2 px-2 py-1 rounded-full
                                                bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 
                                                border border-[#00AEEF]/20 dark:border-[#00AEEF]/30"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-[#00AEEF]/20 dark:bg-[#00AEEF]/30 flex items-center justify-center">
                                                <span className="text-xs font-medium text-[#00AEEF]">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-xs font-medium text-[#00AEEF] max-w-[100px] truncate">
                                                {user.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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
                            onClick={handleShare}
                            disabled={selectedUsers.length === 0 || !motivo || isLoading}
                            className={cn(
                                "w-full sm:w-auto sm:flex-1 order-1 sm:order-2 gap-2",
                                "bg-[#00AEEF] hover:bg-[#0098d6] text-white",
                                "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Compartiendo...
                                </>
                            ) : (
                                <>
                                    <Share2 className="w-4 h-4" />
                                    Compartir {selectedUsers.length > 0 && `(${selectedUsers.length})`}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShareEvaluationModal;
