import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';

const routes: Routes = [
  { path: '', redirectTo: '/crear-cliente', pathMatch: 'full' },
  { path: 'crear-cliente', component: CrearClienteComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'lista-clientes', component: ListaClientesComponent },
  { path: '**', redirectTo: '/crear-cliente' } // Wildcard route para páginas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }