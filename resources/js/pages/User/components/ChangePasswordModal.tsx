import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { type User } from '../types';

interface ChangePasswordModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (userId: number, newPassword: string) => void;
}

export function ChangePasswordModal({
    user,
    isOpen,
    onClose,
    onConfirm,
}: ChangePasswordModalProps) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { password?: string; confirm?: string } = {};

        // Validaciones
        if (!newPassword) {
            newErrors.password = 'La contraseña es requerida';
        } else if (newPassword.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        if (!confirmPassword) {
            newErrors.confirm = 'Confirma la contraseña';
        } else if (newPassword !== confirmPassword) {
            newErrors.confirm = 'Las contraseñas no coinciden';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (user) {
            onConfirm(user.id, newPassword);
            handleClose();
        }
    };

    const handleClose = () => {
        setNewPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowConfirmPassword(false);
        setErrors({});
        onClose();
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center">
                            <Key className="w-6 h-6 text-[#00AEEF]" />
                        </div>
                        <div>
                            <DialogTitle className="text-[#1e293b] dark:text-white/90">
                                Cambiar Contraseña
                            </DialogTitle>
                            <p className="text-sm text-[#64748b] dark:text-white/70 mt-1">
                                {user.name}
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="newPassword"
                            className="text-[#1e293b] dark:text-white/90"
                        >
                            Nueva Contraseña
                        </Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setErrors({ ...errors, password: undefined });
                                }}
                                placeholder="Ingresa la nueva contraseña"
                                className="bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] dark:text-white/70 hover:text-[#00AEEF]"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="confirmPassword"
                            className="text-[#1e293b] dark:text-white/90"
                        >
                            Confirmar Contraseña
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setErrors({ ...errors, confirm: undefined });
                                }}
                                placeholder="Confirma la nueva contraseña"
                                className="bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] dark:text-white/70 hover:text-[#00AEEF]"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.confirm && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                                {errors.confirm}
                            </p>
                        )}
                    </div>

                    <div className="bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-lg p-3">
                        <p className="text-xs text-[#64748b] dark:text-white/70">
                            La contraseña debe tener al menos 8 caracteres y se recomienda
                            incluir letras, números y símbolos.
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
                            className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white"
                        >
                            Cambiar Contraseña
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
