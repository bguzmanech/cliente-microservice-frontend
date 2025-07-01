import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ClienteResponse } from '../../models/cliente.models';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  clientes: ClienteResponse[] = [];
  clientesFiltrados: ClienteResponse[] = [];
  isLoading = true;
  error = '';
  filtroTexto = '';
  ordenActual: 'nombre' | 'apellido' | 'edad' | 'fechaNacimiento' | 'fechaProbableMuerte' = 'nombre';
  direccionOrden: 'asc' | 'desc' = 'asc';

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.isLoading = true;
    this.error = '';

    this.clienteService.obtenerListaClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.clientesFiltrados = [...data];
        this.aplicarOrden();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al cargar clientes:', error);
        
        if (error.status === 0) {
          this.error = 'No se puede conectar con el servidor. Asegúrate de que el backend esté funcionando en el puerto 8080.';
        } else {
          this.error = `Error al cargar clientes: ${error.message || 'Error desconocido'}`;
        }
      }
    });
  }

  filtrarClientes(): void {
    if (!this.filtroTexto.trim()) {
      this.clientesFiltrados = [...this.clientes];
    } else {
      const filtro = this.filtroTexto.toLowerCase().trim();
      this.clientesFiltrados = this.clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(filtro) ||
        cliente.apellido.toLowerCase().includes(filtro) ||
        cliente.edad.toString().includes(filtro)
      );
    }
    this.aplicarOrden();
  }

  ordenarPor(campo: 'nombre' | 'apellido' | 'edad' | 'fechaNacimiento' | 'fechaProbableMuerte'): void {
    if (this.ordenActual === campo) {
      this.direccionOrden = this.direccionOrden === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordenActual = campo;
      this.direccionOrden = 'asc';
    }
    this.aplicarOrden();
  }

  aplicarOrden(): void {
    this.clientesFiltrados.sort((a, b) => {
      let valorA: any;
      let valorB: any;

      switch (this.ordenActual) {
        case 'nombre':
          valorA = a.nombre.toLowerCase();
          valorB = b.nombre.toLowerCase();
          break;
        case 'apellido':
          valorA = a.apellido.toLowerCase();
          valorB = b.apellido.toLowerCase();
          break;
        case 'edad':
          valorA = a.edad;
          valorB = b.edad;
          break;
        case 'fechaNacimiento':
          valorA = new Date(a.fechaNacimiento);
          valorB = new Date(b.fechaNacimiento);
          break;
        case 'fechaProbableMuerte':
          valorA = new Date(a.fechaProbableMuerte);
          valorB = new Date(b.fechaProbableMuerte);
          break;
        default:
          return 0;
      }

      let resultado = 0;
      if (valorA < valorB) resultado = -1;
      else if (valorA > valorB) resultado = 1;

      return this.direccionOrden === 'desc' ? -resultado : resultado;
    });
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  calcularAnosRestantes(fechaProbableMuerte: string): number {
    const hoy = new Date();
    const fechaMuerte = new Date(fechaProbableMuerte);
    const diferencia = fechaMuerte.getTime() - hoy.getTime();
    return Math.max(0, Math.ceil(diferencia / (1000 * 60 * 60 * 24 * 365.25)));
  }

  getColorAnosRestantes(anos: number): string {
    if (anos > 50) return 'text-success';
    if (anos > 30) return 'text-warning';
    if (anos > 10) return 'text-orange';
    return 'text-danger';
  }

  getIconoOrden(campo: string): string {
    if (this.ordenActual !== campo) return 'fas fa-sort text-muted';
    return this.direccionOrden === 'asc' ? 'fas fa-sort-up text-primary' : 'fas fa-sort-down text-primary';
  }

  get totalClientes(): number {
    return this.clientes.length;
  }

  get clientesMostrados(): number {
    return this.clientesFiltrados.length;
  }

  limpiarFiltro(): void {
    this.filtroTexto = '';
    this.filtrarClientes();
  }

  exportarCSV(): void {
    if (this.clientesFiltrados.length === 0) return;

    const headers = ['ID', 'Nombre', 'Apellido', 'Edad', 'Fecha Nacimiento', 'Fecha Probable Muerte', 'Años Restantes'];
    const csvData = this.clientesFiltrados.map(cliente => [
      cliente.id,
      cliente.nombre,
      cliente.apellido,
      cliente.edad,
      this.formatearFecha(cliente.fechaNacimiento),
      this.formatearFecha(cliente.fechaProbableMuerte),
      this.calcularAnosRestantes(cliente.fechaProbableMuerte)
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `clientes_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }
}