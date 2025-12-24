import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const roles = [
    { value: 'admin', label: 'Administrador' },
    { value: 'evaluador', label: 'Evaluador' },
];

export function CreateUserModal({
    isOpen,
    onClose,
}: CreateUserModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'Evaluador',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('usuarios.store'), {
            onSuccess: () => {
                handleClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        setShowPassword(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center">
                            <UserPlus className="w-6 h-6 text-[#00AEEF]" />
                        </div>
                        <div>
                            <DialogTitle className="text-[#1e293b] dark:text-white/90">
                                Crear Nuevo Usuario
                            </DialogTitle>
                            <p className="text-sm text-[#64748b] dark:text-white/70 mt-1">
                                Completa la información del nuevo usuario
                            </p>
                        </div>
                    </div>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Muestra el formulario para crear un nuevo usuario
                </DialogDescription>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nombre */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="text-[#1e293b] dark:text-white/90"
                            >
                                Nombre Completo <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ej: Juan Pérez"
                                className="bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-[#1e293b] dark:text-white/90"
                            >
                                Correo Electrónico <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="ejemplo@correo.com"
                                className="bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Teléfono */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="phone"
                                className="text-[#1e293b] dark:text-white/90"
                            >
                                Teléfono
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+57 300 123 4567"
                                className="bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90"
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Rol */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="role"
                                className="text-[#1e293b] dark:text-white/90"
                            >
                                Rol <span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full h-10 px-3 rounded-md border border-[#e2e8f0] dark:border-[#20384b] bg-white dark:bg-[#0f1a23] text-[#1e293b] dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                            >
                                {roles.map((role) => (
                                    <option key={role.value} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-[#1e293b] dark:text-white/90"
                            >
                                Contraseña <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Mínimo 8 caracteres"
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


                    </div>

                    <div className="bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-lg p-3">
                        <p className="text-xs text-[#64748b] dark:text-white/70">
                            <span className="text-red-500">*</span>
                            Campos obligatorios. El usuario recibirá un correo de
                            bienvenida con sus credenciales.
                        </p>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={processing}
                            className="bg-white dark:bg-[#0f1a23] text-[#1e293b] dark:text-white/90 border-[#e2e8f0] dark:border-[#20384b]"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white"
                        >
                            {processing ? 'Creando...' : 'Crear Usuario'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
