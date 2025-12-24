import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Mail, Phone, Calendar, Shield, CheckCircle, XCircle } from 'lucide-react';
import { type User } from '../types';

interface UserDetailModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

export function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b]">
                <DialogHeader>
                    <DialogTitle className="text-[#1e293b] dark:text-white/90">
                        Detalles del Usuario
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    muestra los detalles del usuario
                </DialogDescription>
                <div className="space-y-6">
                    {/* Header con foto de perfil */}
                    <div className="flex items-center gap-4 p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg">
                        <div className="w-20 h-20 rounded-full bg-[#00AEEF] flex items-center justify-center text-white text-2xl font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#1e293b] dark:text-white/90">
                                {user.name}
                            </h3>
                            <p className="text-[#64748b] dark:text-white/70">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Información detallada */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg">
                            <Mail className="w-5 h-5 text-[#00AEEF] mt-0.5" />
                            <div>
                                <p className="text-xs text-[#64748b] dark:text-white/70 mb-1">
                                    Correo Electrónico
                                </p>
                                <p className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg">
                            <Phone className="w-5 h-5 text-[#00AEEF] mt-0.5" />
                            <div>
                                <p className="text-xs text-[#64748b] dark:text-white/70 mb-1">
                                    Teléfono
                                </p>
                                <p className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    {user.phone || 'No registrado'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg">
                            <Shield className="w-5 h-5 text-[#00AEEF] mt-0.5" />
                            <div>
                                <p className="text-xs text-[#64748b] dark:text-white/70 mb-1">
                                    Rol
                                </p>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00AEEF]/10 text-[#00AEEF]">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg">
                            <Calendar className="w-5 h-5 text-[#00AEEF] mt-0.5" />
                            <div>
                                <p className="text-xs text-[#64748b] dark:text-white/70 mb-1">
                                    Fecha de Registro
                                </p>
                                <p className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    {new Date(user.created_at).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg col-span-full">
                            {user.is_active ? (
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            ) : (
                                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                            )}
                            <div>
                                <p className="text-xs text-[#64748b] dark:text-white/70 mb-1">
                                    Estado
                                </p>
                                <p className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                    {user.is_active
                                        ? 'Usuario Activo'
                                        : 'Usuario Suspendido'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
