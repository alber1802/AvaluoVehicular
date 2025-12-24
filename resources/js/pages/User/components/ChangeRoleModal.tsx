import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, Check } from 'lucide-react';
import { useState } from 'react';
import { type User } from '../types';

interface ChangeRoleModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (userId: number, newRole: string) => void;
}

const roles = [
    {
        value: 'admin',
        label: 'Administrador',
        description: 'Acceso completo al sistema',
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
        value: 'evaluador',
        label: 'Evaluador',
        description: 'Puede realizar avalúos de vehículos',
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
];

export function ChangeRoleModal({
    user,
    isOpen,
    onClose,
    onConfirm,
}: ChangeRoleModalProps) {
    const [selectedRole, setSelectedRole] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user && selectedRole) {
            onConfirm(user.id, selectedRole);
            handleClose();
        }
    };

    const handleClose = () => {
        setSelectedRole('');
        onClose();
    };

    const handleOpen = () => {
        if (user) {
            setSelectedRole(user.role);
        }
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className="max-w-md bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b]"
                onOpenAutoFocus={handleOpen}
            >
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-[#00AEEF]" />
                        </div>
                        <div>
                            <DialogTitle className="text-[#1e293b] dark:text-white/90">
                                Cambiar Rol de Usuario
                            </DialogTitle>
                            <p className="text-sm text-[#64748b] dark:text-white/70 mt-1">
                                {user.name}
                            </p>
                        </div>
                    </div>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Muestra el formulario para cambiar el rol de un usuario
                </DialogDescription>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label className="text-[#1e293b] dark:text-white/90">
                            Selecciona el nuevo rol
                        </Label>
                        <div className="space-y-2">
                            {roles.map((role) => (
                                <button
                                    key={role.value}
                                    type="button"
                                    onClick={() => setSelectedRole(role.value)}
                                    className={`w-full flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${selectedRole === role.value
                                        ? 'border-[#00AEEF] bg-[#00AEEF]/5'
                                        : 'border-[#e2e8f0] dark:border-[#20384b] hover:border-[#00AEEF]/50'
                                        }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full ${role.bgColor} flex items-center justify-center flex-shrink-0`}
                                    >
                                        {selectedRole === role.value ? (
                                            <Check className="w-5 h-5 text-[#00AEEF]" />
                                        ) : (
                                            <Shield className={`w-5 h-5 ${role.color}`} />
                                        )}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="font-semibold text-[#1e293b] dark:text-white/90">
                                            {role.label}
                                        </p>
                                        <p className="text-sm text-[#64748b] dark:text-white/70 mt-0.5">
                                            {role.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-lg p-3">
                        <p className="text-xs text-[#64748b] dark:text-white/70">
                            El cambio de rol afectará los permisos y accesos del usuario
                            en el sistema.
                        </p>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="bg-white dark:bg-[#0f1a23] text-[#1e293b] dark:text-white/90 border-[#e2e8f0] dark:border-[#20384b]"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={!selectedRole || selectedRole === user.role}
                            className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white disabled:opacity-50"
                        >
                            Cambiar Rol
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
