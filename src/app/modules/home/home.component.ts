import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Componente de Inicio
 * Este componente representa la página de inicio de la aplicación.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
