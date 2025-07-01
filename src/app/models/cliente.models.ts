// src/app/models/cliente.models.ts

export interface ClienteRequest {
    nombre: string;
    apellido: string;
    edad: number;
    fechaNacimiento: string; // Formato: "YYYY-MM-DD"
  }
  
  export interface ClienteResponse {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
    fechaNacimiento: string;
    fechaProbableMuerte: string;
  }
  
  export interface KpiClientes {
    promedioEdad: number;
    desviacionEstandar: number;
  }