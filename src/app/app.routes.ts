import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

/**
 * Configuración de las rutas de la aplicación
 * Define las rutas principales y las rutas secundarias de la aplicación.
 */
export const routes: Routes = [
    {
        path: "home", component: LayoutComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: '/home/principal' },
            { path: 'principal', loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent) },
            { path: 'nosotros', loadComponent: () => import('./modules/nosotros/nosotros.component').then(m => m.NosotrosComponent) },
            { path: 'estudiante', loadComponent: () => import('./modules/estudiantes/estudiantes.component').then(m => m.EstudiantesComponent) },
            { path: 'practica', loadComponent: () => import('./modules/practicas/practicas.component').then(m => m.PracticasComponent) },
            { path: 'contacto', loadComponent: () => import('./modules/contactos/contactos.component').then(m => m.ContactosComponent) },
            { path: 'empresa', loadComponent: () => import('./modules/empresa/empresa.component').then(m => m.EmpresaComponent) },
            { path: 'jefe', loadComponent: () => import('./modules/jefe/jefe.component').then(m => m.JefeComponent) }
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '*', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
