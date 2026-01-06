// Tipos para el módulo de Compartidos

export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
    is_active?: boolean;
}

export interface Vehiculo {
    id: number;
    modelo: string;
    placa: string;
    año_fabricacion: number;
    marca: {
        id: number;
        nombre: string;
    };
    evaluador?: User;
}

export interface Avaluo {
    id: number;
    final_estimacion: string;
    vehiculo: Vehiculo;
}

export interface AvaluoCompartido {
    id: number;
    avaluo_id: number;
    user_id: number;
    token: string | null;
    fecha_inicio: string | null;
    fecha_fin: string | null;
    estado: 'activo' | 'vencido' | 'renovado';
    fecha_compartido: string;
    motivo: string;
    contador_vistas: number;
    observaciones: string | null;
    tipo?: 'compartido_por_mi' | 'compartido_conmigo';
    propietario?: User;
    avaluo: Avaluo;
    user: User;
}

export interface SharedStats {
    total: number;
    activos: number;
    vencidos: number;
    renovados: number;
    conToken: number;
    misCompartidos: number;
    compartidosConmigo: number;
}

export type StatusFilter = 'all' | 'activo' | 'vencido' | 'renovado';
export type TypeFilter = 'all' | 'compartido_por_mi' | 'compartido_conmigo';
