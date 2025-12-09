import { Calendar, ClipboardList, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';



export function StatsCards({ vehiculosHoy, pendientes, valoracionPromedio, comparacionAyer, avaluos }: any) {

    const calculoHoyAyer = (comparacionAyer / vehiculosHoy) * 100 || 0;

    const stats = [
        {
            title: 'Vehículos Evaluados Hoy',
            value: vehiculosHoy,
            icon: Calendar,
            trend: '+' + calculoHoyAyer + '% desde ayer',
            trendUp: true,
            iconColor: 'text-blue-500',
            iconBg: 'bg-blue-500/10',
        },
        {
            title: 'Informes Pendientes',
            value: pendientes,
            icon: ClipboardList,
            trend: 'Atención requerida',
            trendUp: false,
            iconColor: 'text-orange-500',
            iconBg: 'bg-orange-500/10',
            alert: true,
        },
        {
            title: 'Valoración Promedio',
            value: '$' + valoracionPromedio.toFixed(2),
            icon: DollarSign,
            trend: 'Basado en las últimas ' + avaluos + ' evaluaciones',
            iconColor: 'text-cyan-500',
            iconBg: 'bg-cyan-500/10',
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
                <Card key={index} className="border-[#e2e8f0] bg-white transition-all hover:border-[#00AEEF] hover:shadow-lg dark:border-[#20384b] dark:bg-[#1a2c3a] dark:hover:border-[#00AEEF]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-[#64748b] dark:text-white/70" style={{ fontSize: 'large' }}>
                            {stat.title}
                        </CardTitle>
                        <div className={cn('rounded-lg p-2', stat.iconBg)}>
                            <stat.icon className={cn('h-5 w-5', stat.iconColor)} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#1e293b] dark:text-white/90 sm:text-4xl" >{stat.value}</div>
                        <div className="mt-2 flex items-center gap-1 text-xs">
                            {stat.alert ? (
                                <>
                                    <AlertTriangle className="h-3 w-3 text-orange-500 dark:text-orange-400" />
                                    <span className="text-orange-500 dark:text-orange-400" style={{ fontSize: '15 px' }}>{stat.trend}</span>
                                </>
                            ) : stat.trendUp ? (
                                <>
                                    <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                                    <span className="text-green-600 dark:text-green-400" style={{ fontSize: '15 px' }}>{stat.trend}</span>
                                </>
                            ) : (
                                <span className="text-[#64748b] dark:text-white/70" style={{ fontSize: '28 px' }}>{stat.trend}</span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
