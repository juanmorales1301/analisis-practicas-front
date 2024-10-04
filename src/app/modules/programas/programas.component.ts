import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/**
 * Interfaz para definir la estructura de un programa
 */
interface Programa {
  /**
   * Identificador del programa
   */
  id_programa: number;
  /**
   * Nombre del programa
   */
  nombre: string;
}

/**
 * Componente de Programas
 * Este componente gestiona la visualización y edición de los programas.
 */
@Component({
  selector: 'app-programas',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './programas.component.html',
  styleUrl: './programas.component.scss'
})
export class ProgramasComponent implements OnInit {
  /**
   * Lista de programas
   */
  programas: Programa[] = [];

  /**
   * Formulario de programa
   */
  programaForm: FormGroup;

  /**
   * Indica si se está editando un programa
   */
  editing = false;

  /**
   * ID del programa que se está editando
   */
  editingId: number | null = null;

  /**
   * Columnas mostradas en la tabla de programas
   */
  displayedColumns: string[] = ['id_programa', 'nombre', 'acciones'];

  /**
   * Fuente de datos para la tabla de programas
   */
  dataSource = new MatTableDataSource<Programa>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.programaForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    this.loadProgramas();
  }

  /**
   * Carga la lista de programas desde la API
   */
  async loadProgramas(): Promise<void> {
    this.programas = await this.apiService.getProgramas();
    this.dataSource.data = this.programas;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Maneja el evento de envío del formulario de programa
   */
  async onSubmit(): Promise<void> {
    if (this.programaForm.invalid) {
      return;
    }

    const programa: Programa = this.programaForm.value;

    if (this.editing) {
      await this.apiService.updatePrograma(this.editingId!, programa);
      this.editing = false;
      this.editingId = null;
    } else {
      await this.apiService.createPrograma(programa);
    }

    this.programaForm.reset();
    this.loadProgramas();
  }

  /**
   * Carga los datos de un programa en el formulario para editar
   * @param {Programa} programa - El programa a editar
   */
  onEdit(programa: Programa): void {
    this.editing = true;
    this.editingId = programa.id_programa;
    this.programaForm.patchValue(programa);
  }

  /**
   * Elimina un programa por ID
   * @param {number} id - El ID del programa a eliminar
   */
  async onDelete(id: number): Promise<void> {
    await this.apiService.deletePrograma(id);
    this.loadProgramas();
  }
}
