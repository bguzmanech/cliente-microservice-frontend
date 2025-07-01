import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { KpiClientes } from '../../models/cliente.models';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  kpis: KpiClientes | null = null;
  isLoading = true;
  error = '';
  lastUpdated = new Date();

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.isLoading = true;
    this.error = '';

    this.clienteService.obtenerKpis().subscribe({
      next: (data) => {
        this.kpis = data;
        this.isLoading = false;
        this.lastUpdated = new Date();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al cargar estadísticas:', error);
        
        if (error.status === 0) {
          this.error = 'No se puede conectar con el servidor. Asegúrate de que el backend esté funcionando en el puerto 8080.';
        } else {
          this.error = `Error al cargar estadísticas: ${error.message || 'Error desconocido'}`;
        }
      }
    });
  }

  actualizarEstadisticas(): void {
    this.cargarEstadisticas();
  }

  // Helpers para el template
  get promedioFormateado(): string {
    return this.kpis?.promedioEdad?.toFixed(2) || '0.00';
  }

  get desviacionFormateada(): string {
    return this.kpis?.desviacionEstandar?.toFixed(2) || '0.00';
  }

  get fechaFormateada(): string {
    return this.lastUpdated.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Interpretación de las estadísticas
  get interpretacionPromedio(): string {
    if (!this.kpis) return '';
    
    const promedio = this.kpis.promedioEdad;
    if (promedio === 0) return 'No hay datos suficientes';
    if (promedio < 25) return 'Clientes predominantemente jóvenes';
    if (promedio < 45) return 'Clientes de edad media';
    if (promedio < 65) return 'Clientes de edad madura';
    return 'Clientes de edad avanzada';
  }

  get interpretacionDesviacion(): string {
    if (!this.kpis) return '';
    
    const desviacion = this.kpis.desviacionEstandar;
    if (desviacion === 0) return 'Todas las edades son iguales o hay un solo cliente';
    if (desviacion < 5) return 'Edades muy homogéneas';
    if (desviacion < 10) return 'Edades moderadamente dispersas';
    if (desviacion < 15) return 'Edades bastante dispersas';
    return 'Edades muy heterogéneas';
  }

  get colorPromedio(): string {
    if (!this.kpis) return 'text-secondary';
    const promedio = this.kpis.promedioEdad;
    if (promedio < 30) return 'text-success';
    if (promedio < 50) return 'text-warning';
    return 'text-info';
  }

  get colorDesviacion(): string {
    if (!this.kpis) return 'text-secondary';
    const desviacion = this.kpis.desviacionEstandar;
    if (desviacion < 10) return 'text-success';
    if (desviacion < 20) return 'text-warning';
    return 'text-danger';
  }
}