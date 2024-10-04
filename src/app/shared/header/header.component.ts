import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * Componente de encabezado
 * Este componente representa el encabezado de la aplicación.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
