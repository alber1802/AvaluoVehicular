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

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    avaluoInfo: {
        entidad: string;
        marca: string;
        modelo: string;
    } | null;
}

export function DeleteConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    avaluoInfo,
}: DeleteConfirmDialogProps) {
    if (!avaluoInfo) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="bg-white dark:bg-[#1a2c3a] border-[#e2e8f0] dark:border-[#20384b]">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <AlertDialogTitle className="text-[#1e293b] dark:text-white/90">
                            ¿Eliminar Avalúo Permanentemente?
                        </AlertDialogTitle>
                    </div>
                    <div className="space-y-3">
                        <AlertDialogDescription className="text-[#64748b] dark:text-white/70">
                            Esta acción eliminará <span className="font-semibold text-[#1e293b] dark:text-white/90">permanentemente</span> todos los registros asociados al avalúo:
                        </AlertDialogDescription>

                        <div className="p-3 bg-[#f8fafc] dark:bg-[#0f1a23] rounded-lg border border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                <span className="text-[#64748b] dark:text-white/60">Entidad:</span> {avaluoInfo.entidad}
                            </div>
                            <div className="text-sm font-medium text-[#1e293b] dark:text-white/90 mt-1">
                                <span className="text-[#64748b] dark:text-white/60">Vehículo:</span> {avaluoInfo.marca} {avaluoInfo.modelo}
                            </div>
                        </div>

                        <div className="text-sm font-semibold text-red-600 dark:text-red-400">
                            ⚠️ Esta acción no se puede deshacer. Todos los datos, imágenes y evaluaciones serán eliminados definitivamente.
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
                        Eliminar Permanentemente
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
