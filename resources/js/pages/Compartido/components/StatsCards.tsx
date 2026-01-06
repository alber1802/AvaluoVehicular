import { Share2, CheckCircle, XCircle, RefreshCw, Link2, ArrowUpDown, ArrowDownUp } from 'lucide-react';
import { type SharedStats } from '../types';

interface StatsCardsProps {
    stats: SharedStats;
    isAdmin: boolean;
}

export function StatsCards({ stats, isAdmin }: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Total 
            <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Share2 className="w-4 h-4 text-[#00AEEF]" />
                    <p className="text-[#64748b] dark:text-white/70 text-xs sm:text-sm">
                        Total
                    </p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-white/90">
                    {stats.total}
                </p>
            </div>*/}

            {/* Activos */}
            <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <p className="text-[#64748b] dark:text-white/70 text-xs sm:text-sm">
                        Activos
                    </p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.activos}
                </p>
            </div>

            {/* Vencidos */}
            <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <p className="text-[#64748b] dark:text-white/70 text-xs sm:text-sm">
                        Vencidos
                    </p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
                    {stats.vencidos}
                </p>
            </div>

            {/* Renovados */}
            <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="w-4 h-4 text-amber-500" />
                    <p className="text-[#64748b] dark:text-white/70 text-xs sm:text-sm">
                        Renovados
                    </p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {stats.renovados}
                </p>
            </div>

            {/* Con Token (Acceso Público) */}
            <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Link2 className="w-4 h-4 text-purple-500" />
                    <p className="text-[#64748b] dark:text-white/70 text-xs sm:text-sm">
                        Con Enlace
                    </p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {stats.conToken}
                </p>
            </div>

            {/* Solo para evaluador: Mis compartidos / Compartidos conmigo */}

            <div className="bg-white dark:bg-[#1a2c3a] rounded-lg border border-[#e2e8f0] dark:border-[#20384b] p-4">
                <div className="flex items-center gap-2 mb-2">
                    <ArrowUpDown className="w-4 h-4 text-indigo-500" />
                    <p className="text-[#64748b] dark:text-white/70 text-xs sm:text-sm truncate">
                        {isAdmin ? 'Mis compartidos' : 'Compartidos por mí/Conmigo'}
                    </p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {isAdmin ? stats.misCompartidos : `${stats.misCompartidos} / ${stats.compartidosConmigo}`}
                </p>
            </div>

        </div>
    );
}
