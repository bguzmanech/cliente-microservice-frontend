import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ClienteRequest } from '../../models/cliente.models';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {
  clienteForm: FormGroup;
  isLoading = false;
  mensaje = '';
  tipoMensaje: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(150)]],
      fechaNacimiento: ['', [Validators.required, this.fechaNoFuturaValidator]]
    });
  }

  // Validador personalizado para fecha no futura
  fechaNoFuturaValidator(control: any) {
    if (!control.value) return null;
    
    const fechaIngresada = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    return fechaIngresada >= hoy ? { fechaFutura: true } : null;
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      this.isLoading = true;
      this.mensaje = '';

      const clienteData: ClienteRequest = {
        nombre: this.clienteForm.value.nombre.trim(),
        apellido: this.clienteForm.value.apellido.trim(),
        edad: parseInt(this.clienteForm.value.edad),
        fechaNacimiento: this.clienteForm.value.fechaNacimiento
      };

      this.clienteService.crearCliente(clienteData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.tipoMensaje = 'success';
          this.mensaje = `Cliente "${response.nombre} ${response.apellido}" creado exitosamente con ID ${response.id}`;
          this.clienteForm.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.tipoMensaje = 'error';
          console.error('Error al crear cliente:', error);
          
          if (error.status === 400) {
            this.mensaje = 'Error: Datos inválidos. Por favor verifica la información ingresada.';
          } else if (error.status === 0) {
            this.mensaje = 'Error: No se puede conectar con el servidor. Asegúrate de que el backend esté funcionando.';
          } else {
            this.mensaje = `Error al crear cliente: ${error.message || 'Error desconocido'}`;
          }
        }
      });
    } else {
      this.marcarCamposComoTocados();
    }
  }

  marcarCamposComoTocados() {
    Object.keys(this.clienteForm.controls).forEach(key => {
      this.clienteForm.get(key)?.markAsTouched();
    });
  }

  // Helpers para validación en template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.clienteForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.clienteForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) return `${fieldName} es obligatorio`;
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['maxlength']) return `${fieldName} no puede tener más de ${field.errors['maxlength'].requiredLength} caracteres`;
      if (field.errors['min']) return `${fieldName} debe ser mayor o igual a ${field.errors['min'].min}`;
      if (field.errors['max']) return `${fieldName} debe ser menor o igual a ${field.errors['max'].max}`;
      if (field.errors['fechaFutura']) return 'La fecha de nacimiento no puede ser futura';
    }
    return '';
  }

  limpiarMensaje() {
    this.mensaje = '';
  }
}