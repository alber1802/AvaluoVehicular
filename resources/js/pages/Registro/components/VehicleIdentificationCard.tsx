import { CreditCard, Hash, Settings, Tag } from 'lucide-react';

interface VehicleIdentificationCardProps {
    placa?: string;
    chasis?: string;
    serie_motor?: string;
    marcaMotor?: string;
}

export default function VehicleIdentificationCard({
    placa,
    chasis,
    serie_motor,
    marcaMotor
}: VehicleIdentificationCardProps) {
    const hasData = placa !== 'no tiene' || chasis !== 'no tiene' || serie_motor !== 'no tiene' || marcaMotor !== 'no tiene';

    if (!hasData) {
        return null;
    }

    return (
        <div className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-6 shadow-sm dark:border-[#20384b] dark:bg-[#1a2c3a]">
            <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                    <Hash className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b] dark:text-white/90">
                    Identificación del Vehículo
                </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {placa && placa !== 'no tiene' && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                            <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Placa</p>
                        </div>
                        <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">{placa}</p>
                    </div>
                )}

                {chasis && chasis !== 'no tiene' && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Hash className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                            <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Chasis</p>
                        </div>
                        <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">{chasis}</p>
                    </div>
                )}

                {serie_motor && serie_motor !== 'no tiene' && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                            <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Serie del Motor</p>
                        </div>
                        <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">{serie_motor}</p>
                    </div>
                )}

                {marcaMotor && marcaMotor !== 'no tiene' && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Tag className="h-5 w-5 text-[#64748b] dark:text-white/60" />
                            <p className="text-sm font-medium text-[#64748b] dark:text-white/60">Marca del Motor</p>
                        </div>
                        <p className="text-base font-semibold text-[#1e293b] dark:text-white/90">{marcaMotor}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
