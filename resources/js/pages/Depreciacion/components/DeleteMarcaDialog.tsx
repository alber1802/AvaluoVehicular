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

interface DeleteMarcaDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    marcaNombre: string | null;
}

export function DeleteMarcaDialog({
    isOpen,
    onClose,
    onConfirm,
    marcaNombre,
}: DeleteMarcaDialogProps) {
    if (!marcaNombre) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b]">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <AlertDialogTitle className="text-[#1e293b] dark:text-white/90">
                            ¿Eliminar Marca?
                        </AlertDialogTitle>
                    </div>
                    <div className="space-y-3">
                        <AlertDialogDescription className="text-[#64748b] dark:text-white/70">
                            ¿Está seguro de que desea eliminar la marca{' '}
                            <span className="font-semibold text-[#1e293b] dark:text-white/90">
                                {marcaNombre}
                            </span>
                            ?
                        </AlertDialogDescription>

                        <div className="p-3 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <p className="text-sm text-[#64748b] dark:text-white/70">
                                Esta acción eliminará permanentemente todos los datos de depreciación asociados a
                                esta marca.
                            </p>
                        </div>

                        <div className="text-sm font-semibold text-red-600 dark:text-red-400">
                            ⚠️ Esta acción no se puede deshacer
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel className="bg-white dark:bg-[#0f1a23] text-[#1e293b] dark:text-white/90 border-[#e2e8f0] dark:border-[#20384b] hover:bg-[#f8fafc] dark:hover:bg-[#0f1a23]">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Eliminar Marca
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
