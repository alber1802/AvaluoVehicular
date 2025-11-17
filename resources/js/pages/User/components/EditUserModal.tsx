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
import { Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { type User } from '../types';

interface EditUserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        userId: number,
        userData: {
            name: string;
            email: string;
            phone: string;
            role: string;
        },
    ) => void;
}

const roles = [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Evaluador', label: 'Evaluador' },
    { value: 'Usuario', label: 'Simple Usuario' },
];

export function EditUserModal({
    user,
    isOpen,
    onClose,
    onConfirm,
}: EditUserModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'Usuario',
    });
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
    }>({});

    // Cargar datos del usuario cuando se abre el modal
    useEffect(() => {
        if (user && isOpen) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                role: user.role,
            });
            setErrors({});
        }
    }, [user, isOpen]);

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm() && user) {
            onConfirm(user.id, {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
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
            role: 'Usuario',
        });
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

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center">
                            <Edit className="w-6 h-6 text-[#00AEEF]" />
                        </div>
                        <div>
                            <DialogTitle className="text-[#1e293b] dark:text-white/90">
                                Editar Usuario
                            </DialogTitle>
                            <p className="text-sm text-[#64748b] dark:text-white/70 mt-1">
                                Actualiza la información del usuario
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Avatar y nombre actual */}
                    <div className="flex items-center gap-4 p-4 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg">
                        <div className="w-16 h-16 rounded-full bg-[#00AEEF] flex items-center justify-center text-white text-xl font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-semibold text-[#1e293b] dark:text-white/90">
                                {user.name}
                            </p>
                            <p className="text-sm text-[#64748b] dark:text-white/70">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nombre */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="edit-name"
                                className="text-[#1e293b] dark:text-white/90"
                            >
                                Nombre Completo <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="edit-name"
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
                                htmlFor="edit-email"
                                className="text-[#1e293b] dark:text-white/90"
                            >
                                Correo Electrónico <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="edit-email"
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
                                htmlFor="edit-phone"
                                className="text-[#1e293b] dark:text-white/90"
                            >
                                Teléfono
                            </Label>
                            <Input
                                id="edit-phone"
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
                                htmlFor="edit-role"
                                className="text-[#1e293b] dark:text-white/90"
                            >
                                Rol <span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="edit-role"
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

                    <div className="bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-lg p-3">
                        <p className="text-xs text-[#64748b] dark:text-white/70">
                            <span className="text-red-500">*</span> Campos obligatorios. Los
                            cambios se aplicarán inmediatamente.
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
                            Guardar Cambios
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
