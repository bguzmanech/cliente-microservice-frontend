import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CrearClienteComponent,
    EstadisticasComponent,
    ListaClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
