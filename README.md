# 🎨 Cliente Microservice - Frontend

## 📋 Descripción

Aplicación web desarrollada con Angular que proporciona una interfaz intuitiva para gestionar clientes. Permite crear nuevos clientes, visualizar estadísticas demográficas y consultar la lista completa de clientes con predicciones actuariales.

## 🛠️ Tecnologías

- **Angular 16**
- **TypeScript 5**
- **Angular Material** (UI Components)
- **Bootstrap 5** (Estilos adicionales)
- **Chart.js** (Visualización de datos)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── crear-cliente/
│   │   │   ├── crear-cliente.component.ts
│   │   │   ├── crear-cliente.component.html
│   │   │   ├── crear-cliente.component.scss
│   │   │   └── crear-cliente.component.spec.ts
│   │   ├── estadisticas/
│   │   │   ├── estadisticas.component.ts
│   │   │   ├── estadisticas-list.component.html
│   │   │   ├── estadisticas-list.component.scss
│   │   │   └── estadisticas-list.component.spec.ts
│   │   ├── lista-clientes/
│   │   │   ├── lista-clientes.component.ts
│   │   │   ├── lista-clientes.component.html
│   │   │   ├── lista-clientes.component.scss
│   │   │   └── lista-clientes.component.spec.ts
│   └── models/
│   │       ├── cliente.models.ts
│   ├── services/
│   │   ├── cliente.service.ts
│   │   ├── cliente.service.spec.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── styles.scss
└── index.html
└── amplifly.yml
```

## 🎯 Características

### 1. Formulario de Creación de Cliente
- Validaciones en tiempo real
- Mensajes de error descriptivos
- Cálculo automático de edad basado en fecha de nacimiento
- Confirmación visual al crear cliente exitosamente

### 2. Dashboard de KPIs
- Visualización del promedio de edad
- Desviación estándar con explicación
- Gráficos interactivos (opcional)
- Actualización automática

### 3. Lista de Clientes
- Tabla responsiva con todos los clientes
- Fecha probable de muerte calculada
- Búsqueda y filtrado
- Paginación para grandes volúmenes
- Ordenamiento por columnas

## ⚙️ Configuración

### Prerrequisitos
- Node.js 14+ y npm 6+
- Angular CLI: `npm install -g @angular/cli`

### Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/bguzmanech/cliente-microservice-frontend.git
cd cliente-microservice-frontend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar el backend URL:**

En `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  apiEndpoints: {
    crearCliente: '/creacliente',
    kpiClientes: '/kpideclientes',
    listarClientes: '/listclientes'
  }
};
```

4. **Ejecutar en desarrollo:**
```bash
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

## 📱 Diseño Responsivo

La aplicación está optimizada para:
- 📱 **Mobile**: 
- 💻 **Tablet**: 
- 🖥️ **Desktop**:
### ⚠️ Problema Conocido: Mixed Content

Durante las pruebas de integración con el frontend desplegado, se identificó un problema de **Mixed Content**:

- **Frontend (AWS Amplify):** Servido por HTTPS ✅
- **Backend (Elastic Beanstalk):** Servido por HTTP ❌
- **Resultado:** Los navegadores bloquean las peticiones HTTP desde un sitio HTTPS

### 🔧 Solución en Proceso

1. **Load Balancer:** Parcialmente configurado
2. **Certificado SSL:** Intentando obtener certificado ACM
   - AWS no emite certificados para dominios `*.elasticbeanstalk.com`
   - Dominio personalizado requerido (Route 53)
   
## 🔗 Backend

Este frontend consume la API REST disponible en:
[cliente-microservice-backend](https://github.com/bguzmanech/cliente-microservice-backend)

## 🙏 Agradecimientos

Gracias **PinApp** por la oportunidad de este challenge técnico, fue un desafío apasionante donde aprendí mucho.
