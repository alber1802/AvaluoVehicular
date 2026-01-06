import { X, Share2, Calendar, FileText, MessageSquare, User, Car, Link2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type AvaluoCompartido } from '../types';

interface SharedDetailModalProps {
    item: AvaluoCompartido | null;
    isOpen: boolean;
    onClose: () => void;
}

export function SharedDetailModal({ item, isOpen, onClose }: SharedDetailModalProps) {
    if (!isOpen || !item) return null;

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Sin fecha';
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (estado: string) => {
        const config = {
            activo: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-400' },
            vencido: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-400' },
            renovado: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-800 dark:text-amber-400' },
        };
        const style = config[estado as keyof typeof config] || config.vencido;
        return `${style.bg} ${style.text}`;
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
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
                                    Detalle del Compartido
                                </h2>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadge(item.estado)}`}>
                                    {item.estado}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
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
                        {/* Vehículo */}
                        <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#0f1a23] border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center gap-2 mb-3">
                                <Car className="w-4 h-4 text-[#00AEEF]" />
                                <span className="text-sm font-medium text-[#1e293b] dark:text-white/90">Vehículo</span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                                    {item.avaluo?.vehiculo?.marca?.nombre} {item.avaluo?.vehiculo?.modelo}
                                </p>
                                <div className="flex flex-wrap gap-3 text-sm text-[#64748b] dark:text-white/70">
                                    <span>Placa: <strong>{item.avaluo?.vehiculo?.placa || 'N/A'}</strong></span>
                                    <span>Año: <strong>{item.avaluo?.vehiculo?.año_fabricacion || 'N/A'}</strong></span>
                                </div>
                            </div>
                        </div>

                        {/* Usuario */}
                        <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#0f1a23] border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center gap-2 mb-3">
                                <User className="w-4 h-4 text-[#00AEEF]" />
                                <span className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    {item.tipo === 'compartido_conmigo' ? 'Compartido por' : 'Compartido con'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#00AEEF] flex items-center justify-center text-white font-semibold">
                                    {(item.tipo === 'compartido_conmigo' ? item.propietario?.name : item.user?.name)?.charAt(0).toUpperCase() || '?'}
                                </div>
                                <div>
                                    <p className="font-medium text-[#1e293b] dark:text-white/90">
                                        {item.tipo === 'compartido_conmigo' ? item.propietario?.name : item.user?.name}
                                    </p>
                                    <p className="text-sm text-[#64748b] dark:text-white/70">
                                        {item.tipo === 'compartido_conmigo' ? item.propietario?.email : item.user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Fechas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#0f1a23] border border-[#e2e8f0] dark:border-[#20384b]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-green-500" />
                                    <span className="text-xs text-[#64748b] dark:text-white/70">Fecha inicio</span>
                                </div>
                                <p className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    {formatDate(item.fecha_inicio)}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#0f1a23] border border-[#e2e8f0] dark:border-[#20384b]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-red-500" />
                                    <span className="text-xs text-[#64748b] dark:text-white/70">Fecha fin</span>
                                </div>
                                <p className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    {formatDate(item.fecha_fin)}
                                </p>
                            </div>
                        </div>

                        {/* Motivo */}
                        <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#0f1a23] border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4 text-[#00AEEF]" />
                                <span className="text-sm font-medium text-[#1e293b] dark:text-white/90">Motivo</span>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#00AEEF]/10 text-[#00AEEF] capitalize">
                                {item.motivo}
                            </span>
                        </div>

                        {/* Observaciones */}
                        {item.observaciones && (
                            <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#0f1a23] border border-[#e2e8f0] dark:border-[#20384b]">
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageSquare className="w-4 h-4 text-[#00AEEF]" />
                                    <span className="text-sm font-medium text-[#1e293b] dark:text-white/90">Observaciones</span>
                                </div>
                                <p className="text-sm text-[#64748b] dark:text-white/70">
                                    {item.observaciones}
                                </p>
                            </div>
                        )}

                        {/* Token y Vistas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#0f1a23] border border-[#e2e8f0] dark:border-[#20384b]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Link2 className="w-4 h-4 text-purple-500" />
                                    <span className="text-xs text-[#64748b] dark:text-white/70">Enlace público</span>
                                </div>
                                <p className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    {item.token ? 'Disponible' : 'No disponible'}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#0f1a23] border border-[#e2e8f0] dark:border-[#20384b]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Eye className="w-4 h-4 text-indigo-500" />
                                    <span className="text-xs text-[#64748b] dark:text-white/70">Vistas</span>
                                </div>
                                <p className="text-2xl font-bold text-[#1e293b] dark:text-white/90">
                                    {item.contador_vistas || 0}
                                </p>
                            </div>
                        </div>

                        {/* Fecha compartido */}
                        <div className="text-center text-xs text-[#64748b] dark:text-white/50">
                            Compartido el {formatDate(item.fecha_compartido)}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 sm:p-6 border-t border-[#e2e8f0] dark:border-[#20384b] bg-[#f8fafc] dark:bg-[#0f1a23]">
                        <Button
                            onClick={onClose}
                            className="w-full bg-[#00AEEF] hover:bg-[#0098d6] text-white"
                        >
                            Cerrar
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
