import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteRequest, ClienteResponse, KpiClientes } from '../models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Crear un nuevo cliente
   */
  crearCliente(cliente: ClienteRequest): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(
      `${this.apiUrl}/creacliente`, 
      cliente, 
      this.httpOptions
    );
  }

  /**
   * Obtener KPIs de clientes
   */
  obtenerKpis(): Observable<KpiClientes> {
    return this.http.get<KpiClientes>(`${this.apiUrl}/kpideclientes`);
  }

  /**
   * Obtener lista de todos los clientes
   */
  obtenerListaClientes(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(`${this.apiUrl}/listclientes`);
  }

  /**
   * Health check del servicio
   */
  healthCheck(): Observable<string> {
    return this.http.get(`${this.apiUrl}/health`, { responseType: 'text' });
  }
}
