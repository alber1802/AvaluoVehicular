export interface MarcaDepreciacion {
    id: string;
    marca: string;
    factor_k: number;
    valor_residual: number;
}

export interface DepreciacionAnual {
    ano_actual: number;
    antiguedad: number;
    ano_modelo: number;
    factor_k: number;
    valor_residual: number;
    factor_a: number;
}

export interface ConfiguracionDepreciacion {
    marcas: MarcaDepreciacion[];
    ano_actual: number;
    ano_modelo: number;
    marca_seleccionada: string | null;
}
