export interface ClienteRequest {
    nombre: string;
    apellido: string;
    edad: number;
    fechaNacimiento: string;
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