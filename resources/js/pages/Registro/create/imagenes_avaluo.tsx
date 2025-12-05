import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import SubirImagenesVehiculo from '../components/SubirImagenesVehiculo';
import { route } from 'ziggy-js';
import { Camera, Info } from 'lucide-react';
import Toast from '@/components/Toast';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Imágenes del Vehículo',
        href: '#',
    },
];

export default function ImagenesAvaluo({ id }: { id: number }) {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const handleSubmit = (imagenes: any) => {


        // Simulación del envío al backend
        const formData = new FormData();

        imagenes.forEach((imagen: any, index: number) => {
            formData.append(`imagenes[${index}][file]`, imagen.file);
            formData.append(`imagenes[${index}][ubicacion]`, imagen.ubicacion);
            formData.append(`imagenes[${index}][descripcion]`, imagen.descripcion);
        });

        console.log(formData);
        // Aquí iría la petición al backend
        router.post(route('imagenes.vehiculo.store', id), formData, {
            forceFormData: true,

            onSuccess: () => {
                setToastMessage(`✅ ${imagenes.length} imágenes subidas correctamente`);
                setToastType('success');
                setShowToast(true);
                // setTimeout(() => {
                //     router.visit(route('resultados.avaluo'));
                // }, 2000);
            },
            onError: () => {
                setToastMessage('❌ Error al subir las imágenes. Inténtelo nuevamente');
                setToastType('error');
                setShowToast(true);
            },
        });

        //alert(`Se enviarían ${imagenes.length} imágenes al servidor`);
    };

    const handleCancel = () => {
        router.visit(route('resultados.avaluo'));
        //window.history.back();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Imágenes del Vehículo - Avalúo" />

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}

            <div className="h-full w-full px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-[#00AEEF]/10 p-2">
                            <Camera className="h-6 w-6 text-[#00AEEF]" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#1e293b] dark:text-white/90">
                                Imágenes del Vehículo
                            </h1>
                            <p className="mt-1 text-sm text-[#64748b] dark:text-white/70">
                                Documenta visualmente el estado del vehículo
                            </p>
                        </div>
                    </div>

                    {/* Aviso de que es opcional */}
                    <div className="mt-4 flex gap-3 rounded-lg border border-[#3b82f6]/30 bg-[#eff6ff] p-4 dark:border-[#3b82f6]/30 dark:bg-[#1e3a8a]/20">
                        <Info className="h-5 w-5 shrink-0 text-[#3b82f6]" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-[#1e293b] dark:text-white/90">
                                📸 Esta sección es importante para el reporte de pdf , si no se agregan imágenes
                                se generara un reporte. hasta que las agregues
                            </p>
                            <p className="text-xs text-[#64748b] dark:text-white/70">
                                Puedes agregar fotografías del vehículo para complementar la evaluación.
                                Se recomienda incluir imágenes de todos los ángulos y cualquier daño visible.
                            </p>
                        </div>
                    </div>

                    {/* Instrucciones */}
                    <div className="mt-4 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-[#20384b] dark:bg-[#0f1a23]">
                        <p className="text-sm font-medium text-[#1e293b] dark:text-white/90 mb-2">
                            Recomendaciones:
                        </p>
                        <ul className="space-y-1 text-xs text-[#64748b] dark:text-white/70">
                            <li>• Toma fotografías con buena iluminación y enfoque claro</li>
                            <li>• Incluye vistas frontales, traseras, laterales e interiores</li>
                            <li>• Documenta el tablero, motor, número de chasis y placa</li>
                            <li>• Captura detalles de cualquier daño, rayón o desgaste visible</li>
                            <li>• Cada imagen debe clasificarse según la vista o parte del vehículo</li>
                        </ul>
                    </div>
                </div>

                <SubirImagenesVehiculo onSubmit={handleSubmit} onCancel={handleCancel} />
            </div>
        </AppLayout>
    );
}
