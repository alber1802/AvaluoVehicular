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
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (userData: {
        name: string;
        email: string;
        phone: string;
        password: string;
        role: string;
    }) => void;
}

const roles = [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Evaluador', label: 'Evaluador' },
    { value: 'Usuario', label: 'Simple Usuario' },
];

export function CreateUserModal({
    isOpen,
    onClose,
    onConfirm,
}: CreateUserModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'Usuario',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
        password?: string;
        confirmPassword?: string;
    }>({});

    const validateForm = () => {
        const newErrors: typeof errors = {};

        // Validar nombre
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'El nombre debe tener al menos 3 caracteres';
        }

        // Validar email
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        // Validar teléfono (opcional pero si se ingresa debe ser válido)
        if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Teléfono inválido';
        }

        // Validar contraseña
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        // Validar confirmación de contraseña
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirma la contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onConfirm({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                password: formData.password,
                role: formData.role,
            });
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            role: 'Usuario',
        });
        setShowPassword(false);
        setShowConfirmPassword(false);
        setErrors({});
        onClose();
    };

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
        // Limpiar error del campo al escribir
        if (errors[field as keyof typeof errors]) {
            setErrors({ ...errors, [field]: undefined });
        }
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
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
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
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
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
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
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
                                value={formData.role}
                                onChange={(e) => handleInputChange('role', e.target.value)}
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
                                    value={formData.password}
                                    onChange={(e) =>
                                        handleInputChange('password', e.target.value)
                                    }
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

                        <div className="space-y-2">
                            <Label
                                htmlFor="confirmPassword"
                                className="text-[#1e293b] dark:text-white/90"
                            >
                                Confirmar Contraseña <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'confirmPassword',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Repite la contraseña"
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
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-lg p-3">
                        <p className="text-xs text-[#64748b] dark:text-white/70">
                            <span className="text-red-500">*</span> Campos obligatorios. El
                            usuario recibirá un correo de bienvenida con sus credenciales.
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
                            Crear Usuario
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
