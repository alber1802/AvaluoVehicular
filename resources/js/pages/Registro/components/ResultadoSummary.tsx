import { CheckCircle2, TrendingDown, DollarSign, Calculator } from 'lucide-react';

interface ResultadoSummaryProps {
    precio_referencial: number;
    valor_comercial: number;
    depreciacion_total: number;
    factor_reposicion: number;
    moneda: string;
}

export default function ResultadoSummary({
    precio_referencial,
    valor_comercial,
    depreciacion_total,
    factor_reposicion,
    moneda
}: ResultadoSummaryProps) {
    // Calcular valor final (Valor Comercial - Depreciación)
    const depreciacion_monto = valor_comercial * depreciacion_total;
    const valor_final = valor_comercial - depreciacion_monto;

    // Calcular diferencia con precio referencial
    const diferencia = valor_final - precio_referencial;
    const porcentaje_diferencia = precio_referencial > 0 ? (diferencia / precio_referencial) * 100 : 0;

    const getCurrencySymbol = (currency: string) => {
        return currency === 'Bs' ? 'Bs' : '$US';
    };

    return (
        <div className="rounded-lg border-2 border-[#00AEEF] bg-gradient-to-br from-[#ffffff] to-[#f0f9ff] p-6 shadow-lg dark:border-[#00AEEF]/50 dark:from-[#1a2c3a] dark:to-[#0f1a23]">
            <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-[#00AEEF] p-2">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[#1e293b] dark:text-white/90">
                        Resumen de Evaluación
                    </h3>
                    <p className="text-xs text-[#64748b] dark:text-white/60">
                        Cálculos finales de valoración
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Precio Referencial */}
                <div className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-4 dark:border-[#20384b] dark:bg-[#1a2c3a]">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-[#64748b] dark:text-white/60" />
                        <p className="text-xs font-medium text-[#64748b] dark:text-white/60">Precio Referencial</p>
                    </div>
                    <p className="text-2xl font-bold text-[#1e293b] dark:text-white/90">
                        {getCurrencySymbol(moneda)} {precio_referencial.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>

                {/* Valor Comercial */}
                <div className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-4 dark:border-[#20384b] dark:bg-[#1a2c3a]">
                    <div className="flex items-center gap-2 mb-2">
                        <Calculator className="h-4 w-4 text-[#64748b] dark:text-white/60" />
                        <p className="text-xs font-medium text-[#64748b] dark:text-white/60">Valor Comercial</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {getCurrencySymbol(moneda)} {valor_comercial.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>

                {/* Depreciación Total */}
                <div className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-4 dark:border-[#20384b] dark:bg-[#1a2c3a]">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="h-4 w-4 text-[#64748b] dark:text-white/60" />
                        <p className="text-xs font-medium text-[#64748b] dark:text-white/60">Depreciación Total</p>
                    </div>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">
                        {(depreciacion_total * 100).toFixed(2)}%
                    </p>
                    <p className="mt-1 text-sm text-[#64748b] dark:text-white/60">
                        - {getCurrencySymbol(moneda)} {depreciacion_monto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>

                {/* Valor Final */}
                <div className="rounded-lg border-2 border-[#00AEEF] bg-gradient-to-br from-[#00AEEF]/10 to-[#00AEEF]/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-[#00AEEF]" />
                        <p className="text-xs font-medium text-[#00AEEF]">Valor Final Estimado</p>
                    </div>
                    <p className="text-3xl font-bold text-[#00AEEF]">
                        {getCurrencySymbol(moneda)} {valor_final.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
            </div>

            {/* Comparación con Precio Referencial */}
            <div className="mt-4 rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-4 dark:border-[#20384b] dark:bg-[#1a2c3a]">
                <p className="text-xs font-medium text-[#64748b] dark:text-white/60 mb-2">Comparación con Precio Referencial</p>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-[#1e293b] dark:text-white/90">
                        Diferencia:
                        <span className={`ml-2 font-bold ${diferencia >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {diferencia >= 0 ? '+' : ''}{getCurrencySymbol(moneda)} {Math.abs(diferencia).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </p>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${diferencia >= 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                        {porcentaje_diferencia >= 0 ? '+' : ''}{porcentaje_diferencia.toFixed(2)}%
                    </span>
                </div>
            </div>

            {/* Nota sobre Factor de Reposición */}
            <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                <p className="text-xs text-blue-900 dark:text-blue-300">
                    <strong>Nota:</strong> El valor comercial considera un factor de reposición de <strong>{factor_reposicion.toFixed(2)}</strong> aplicado sobre el precio referencial.
                </p>
            </div>
        </div>
    );
}
