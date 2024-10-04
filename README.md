# Practicas Estudiantes

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.3.8.

## Índice

1. [Servidor de Desarrollo](#servidor-de-desarrollo)
2. [Generación de Código](#generación-de-código)
3. [Construcción](#construcción)
4. [Ejecución de Pruebas Unitarias](#ejecución-de-pruebas-unitarias)
5. [Ejecución de Pruebas End-to-End](#ejecución-de-pruebas-end-to-end)
6. [Documentación](#documentación)
7. [Ayuda Adicional](#ayuda-adicional)

## Servidor de Desarrollo

Ejecuta `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias cualquiera de los archivos fuente.

## Generación de Código

Ejecuta `ng generate component component-name` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construcción

Ejecuta `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Ejecución de Pruebas Unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Ejecución de Pruebas End-to-End

Ejecuta `ng e2e` para ejecutar las pruebas end-to-end a través de la plataforma de tu elección. Para usar este comando, primero necesitas añadir un paquete que implemente capacidades de pruebas end-to-end.

## Documentación

Este proyecto utiliza [Compodoc](https://compodoc.app/) para generar la documentación.

### Generar Documentación

Para generar la documentación, ejecuta:

```bash
npm run compodoc
```

Esto abrirá un servidor en `http://localhost:8080` con la documentación generada de tu aplicación Angular.

### Estructura del Proyecto

- **Configuración de la Aplicación:**
  - `app.config.ts`
  - `app.routes.ts`
  - `app.config.server.ts`
  - `app.component.ts`

- **Componentes:**
  - `ContactosComponent`
  - `EmpresaComponent`
  - `EstudiantesComponent`
  - `HomeComponent`
  - `JefeComponent`
  - `NosotrosComponent`
  - `PracticasComponent`
  - `ProgramasComponent`

- **Servicios:**
  - `ApiService`

- **Shared:**
  - `FooterComponent`
  - `HeaderComponent`
  - `LayoutComponent`

- **Servidor:**
  - `server.ts`
  - `src/main.server.ts`
  - `src/app/environments.ts`

  

### Ejemplo de Documentación en un Componente

```typescript
/**
 * Componente de Contactos
 * Este componente gestiona la visualización y edición de los contactos.
 */
@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, NgIf],
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.scss'
})
export class ContactosComponent implements OnInit {
  // ... código del componente
}
```

## Ayuda Adicional

Para obtener más ayuda sobre Angular CLI, usa `ng help` o visita la [Angular CLI Overview and Command Reference](https://angular.io/cli) página.
