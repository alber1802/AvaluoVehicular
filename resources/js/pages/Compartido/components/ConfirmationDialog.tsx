import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    variant?: 'danger' | 'warning';
    confirmText?: string;
    cancelText?: string;
}

export function ConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    variant = 'danger',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
}: ConfirmationDialogProps) {
    if (!isOpen) return null;

    const variantStyles = {
        danger: {
            icon: 'bg-red-100 dark:bg-red-900/30',
            iconColor: 'text-red-600 dark:text-red-400',
            button: 'bg-red-600 hover:bg-red-700 text-white',
        },
        warning: {
            icon: 'bg-amber-100 dark:bg-amber-900/30',
            iconColor: 'text-amber-600 dark:text-amber-400',
            button: 'bg-amber-600 hover:bg-amber-700 text-white',
        },
    };

    const styles = variantStyles[variant];

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className={cn(
                        "relative w-full max-w-md",
                        "bg-white dark:bg-[#1a2c3a]",
                        "border border-[#e2e8f0] dark:border-[#20384b]",
                        "rounded-xl shadow-2xl",
                        "animate-in fade-in-0 zoom-in-95 duration-300"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Content */}
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0", styles.icon)}>
                                <AlertTriangle className={cn("w-6 h-6", styles.iconColor)} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-[#1e293b] dark:text-white/90 mb-2">
                                    {title}
                                </h3>
                                <p className="text-sm text-[#64748b] dark:text-white/70">
                                    {description}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full flex items-center justify-center 
                                    text-[#64748b] dark:text-white/50
                                    hover:bg-[#f8fafc] dark:hover:bg-[#20384b]
                                    transition-colors flex-shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 p-4 border-t border-[#e2e8f0] dark:border-[#20384b] bg-[#f8fafc] dark:bg-[#0f1a23] rounded-b-xl">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1
                                border-[#e2e8f0] dark:border-[#20384b]
                                text-[#64748b] dark:text-white/70
                                hover:bg-white dark:hover:bg-[#20384b]"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={cn("flex-1", styles.button)}
                        >
                            {confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
