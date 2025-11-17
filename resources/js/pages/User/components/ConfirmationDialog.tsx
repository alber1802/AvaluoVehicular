import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning';
}

export function ConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    variant = 'danger',
}: ConfirmationDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b]">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                variant === 'danger'
                                    ? 'bg-red-100 dark:bg-red-900/30'
                                    : 'bg-orange-100 dark:bg-orange-900/30'
                            }`}
                        >
                            <AlertTriangle
                                className={`w-6 h-6 ${
                                    variant === 'danger'
                                        ? 'text-red-600 dark:text-red-400'
                                        : 'text-orange-600 dark:text-orange-400'
                                }`}
                            />
                        </div>
                        <AlertDialogTitle className="text-[#1e293b] dark:text-white/90">
                            {title}
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-[#64748b] dark:text-white/70 mt-2">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white dark:bg-[#0f1a23] text-[#1e293b] dark:text-white/90 border-[#e2e8f0] dark:border-[#20384b]">
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className={`${
                            variant === 'danger'
                                ? 'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700'
                                : 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700'
                        } text-white`}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
