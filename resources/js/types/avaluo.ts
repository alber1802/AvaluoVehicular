

export interface Vehiculo {
    id: number;
    entidad: string;
    fecha_evaluacion: string;
    ubicacion_actual: string;
    tipo_vehiculo: string;
    tipo_combustible: string;
    id_marca: number;
    modelo: string;
    año_fabricacion: number;
    placa?: string;
    serie_motor?: string;
    chasis?: string;
    color: string;
    procedencia: string;
    kilometraje: string;
    precio_referencial: string;
}

export interface CondicionGeneral {
    id: number;
    id_vehiculo: number;
    estado_operativo: string;
    estado_general: string;
    observaciones?: string;
}

export interface Inspeccion {
    id: number;
    id_vehiculo: number;
    nombre: string;
    caracteristica: string;
    tiene: number;
    valoracion: number;
}

export interface VehiculoImagen {
    id: number;
    id_vehiculo: number;
    lado: string;
    url: string;
    descripcion?: string;
    fecha?: string;
}
export interface Marca {
    id: number;
    nombre: string;
    tasa_k: number;
    valor_residual: number;
    fecha: string;
}

export interface Archivo {
    id: number;
    id_vehiculo: number;
    nombre: string;
    url: string;
    fecha: string;
}