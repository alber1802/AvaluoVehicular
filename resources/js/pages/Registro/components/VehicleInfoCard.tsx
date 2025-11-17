import { Car, Fuel, Calendar, Palette } from 'lucide-react';

interface VehicleInfoCardProps {
    tipo_vehiculo: string;
    tipo_combustible: string;
    marca: string;
    modelo: string;
    ano_fabricacion: string;
    color: string;
}

export default function VehicleInfoCard({
    tipo_vehiculo,
    tipo_combustible,
    marca,
    modelo,
    ano_fabricacion,
    color
}: VehicleInfoCardProps) {
    const getTipoVehiculoLabel = (tipo: string) => {
        const labels: { [key: string]: string } = {
            'automovil': 'Automóvil',
            'camioneta': 'Camioneta',
            'camion': 'Camión',
            'motocicleta': 'Motocicleta',
            'bus': 'Bus',
            'otro': 'Otro'
        };
        return labels[tipo] || tipo;
    };

    const getTipoCombustibleLabel = (tipo: string) => {
        const labels: { [key: string]: string } = {
            'no tiene': 'No tiene',
            'gasolina': 'Gasolina',
            'diesel': 'Diésel',
            'electrico': 'Eléctrico',
            'hibrido': 'Híbrido',
            'gas': 'Gas'
        };
        return labels[tipo] || tipo;
    };

    return (
        <div className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-6 shadow-sm dark:border-[#20384b] dark:bg-[#1a2c3a]">
            <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                    <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                    Información del Vehículo
                </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Tipo de Vehículo</p>
                    <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">
                        {getTipoVehiculoLabel(tipo_vehiculo)}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Fuel className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                        <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Tipo de Combustible</p>
                    </div>
                    <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">
                        {getTipoCombustibleLabel(tipo_combustible)}
                    </p>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Marca</p>
                    <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">{marca}</p>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Modelo</p>
                    <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">
                        {modelo === 'no tiene' ? 'N/A' : modelo}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                        <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Año de Fabricación</p>
                    </div>
                    <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">{ano_fabricacion}</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Palette className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                        <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Color</p>
                    </div>
                    <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">{color}</p>
                </div>
            </div>
        </div>
    );
}
