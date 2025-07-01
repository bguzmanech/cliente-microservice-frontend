import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClienteRequest, ClienteResponse, KpiClientes } from '../models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  crearCliente(cliente: ClienteRequest): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(
      `${this.apiUrl}/creacliente`, 
      cliente, 
      this.httpOptions
    );
  }

  obtenerKpis(): Observable<KpiClientes> {
    return this.http.get<KpiClientes>(`${this.apiUrl}/kpideclientes`);
  }

  obtenerListaClientes(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(`${this.apiUrl}/listclientes`);
  }

  healthCheck(): Observable<string> {
    return this.http.get(`${this.apiUrl}/health`, { responseType: 'text' });
  }
}
