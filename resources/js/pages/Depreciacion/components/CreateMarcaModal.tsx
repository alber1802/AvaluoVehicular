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
import { Plus, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface CreateMarcaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: { marca: string; factor_k: number; valor_residual: number }) => void;
}

export function CreateMarcaModal({ isOpen, onClose, onConfirm }: CreateMarcaModalProps) {
    const [formData, setFormData] = useState({
        marca: '',
        factor_k: 0.15,
        valor_residual: 0.10,
    });
    const [errors, setErrors] = useState<{
        marca?: string;
        factor_k?: string;
        valor_residual?: string;
    }>({});

    const validateForm = () => {
        const newErrors: typeof errors = {};

        // Validar marca
        if (!formData.marca.trim()) {
            newErrors.marca = 'El nombre de la marca es requerido';
        } else if (formData.marca.trim().length < 2) {
            newErrors.marca = 'El nombre debe tener al menos 2 caracteres';
        }

        // Validar factor_k según Ley 843 Art. 60
        if (formData.factor_k < 0.10) {
            newErrors.factor_k = 'El Factor K no puede ser menor a 0.10 (Ley 843 Art. 60)';
        } else if (formData.factor_k > 0.40) {
            newErrors.factor_k = 'El Factor K no puede ser mayor a 0.40 (Ley 843 Art. 60)';
        }

        // Validar valor_residual según Ley 843 Art. 60
        if (formData.valor_residual < 0.107) {
            newErrors.valor_residual = 'El Valor Residual no puede ser menor a 0.107 (Ley 843 Art. 60)';
        } else if (formData.valor_residual > 0.20) {
            newErrors.valor_residual = 'El Valor Residual no puede exceder 0.20 (Ley 843 Art. 60)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onConfirm({
                marca: formData.marca.trim(),
                factor_k: formData.factor_k,
                valor_residual: formData.valor_residual,
            });
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({
            marca: '',
            factor_k: 0.15,
            valor_residual: 0.10,
        });
        setErrors({});
        onClose();
    };

    const handleInputChange = (field: keyof typeof formData, value: string | number) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center">
                            <Plus className="w-6 h-6 text-[#00AEEF]" />
                        </div>
                        <div>
                            <DialogTitle className="text-[#1e293b] dark:text-white/90">
                                Agregar Nueva Marca
                            </DialogTitle>
                            <p className="text-sm text-[#64748b] dark:text-white/70 mt-1">
                                Complete la información de la marca de vehículo
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Aviso Legal */}
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-orange-900 dark:text-orange-300">
                                    Restricciones según Ley 843 - Artículo 60
                                </p>
                                <ul className="text-xs text-orange-800 dark:text-orange-400 mt-1 space-y-0.5">
                                    <li>• Factor K: Entre 0.10 y 0.40</li>
                                    <li>• Valor Residual: Entre 0.107 y 0.20</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {/* Marca */}
                        <div className="space-y-2">
                            <Label htmlFor="marca" className="text-[#1e293b] dark:text-white/90">
                                Nombre de la Marca <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="marca"
                                type="text"
                                value={formData.marca}
                                onChange={(e) => handleInputChange('marca', e.target.value)}
                                placeholder="Ej: Toyota, Chevrolet, Nissan"
                                className="bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90"
                            />
                            {errors.marca && (
                                <p className="text-sm text-red-600 dark:text-red-400">{errors.marca}</p>
                            )}
                        </div>

                        {/* Factor K */}
                        <div className="space-y-2">
                            <Label htmlFor="factor_k" className="text-[#1e293b] dark:text-white/90">
                                Factor K (Tasa de Depreciación Anual) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="factor_k"
                                type="number"
                                step="0.01"
                                min="0.10"
                                max="0.40"
                                value={formData.factor_k}
                                onChange={(e) => handleInputChange('factor_k', parseFloat(e.target.value))}
                                className="bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90"
                            />
                            {errors.factor_k && (
                                <p className="text-sm text-red-600 dark:text-red-400">{errors.factor_k}</p>
                            )}
                            <p className="text-xs text-[#64748b] dark:text-white/60">
                                Valor decimal entre 0.10 y 0.40
                            </p>
                        </div>

                        {/* Valor Residual */}
                        <div className="space-y-2">
                            <Label htmlFor="valor_residual" className="text-[#1e293b] dark:text-white/90">
                                Valor Residual <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="valor_residual"
                                type="number"
                                step="0.001"
                                min="0.107"
                                max="0.20"
                                value={formData.valor_residual}
                                onChange={(e) => handleInputChange('valor_residual', parseFloat(e.target.value))}
                                className="bg-white dark:bg-[#0f1a23] border-[#e2e8f0] dark:border-[#20384b] text-[#1e293b] dark:text-white/90"
                            />
                            {errors.valor_residual && (
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {errors.valor_residual}
                                </p>
                            )}
                            <p className="text-xs text-[#64748b] dark:text-white/60">
                                Valor decimal entre 0.107 y 0.20
                            </p>
                        </div>
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
                        <Button type="submit" className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white">
                            Agregar Marca
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
