import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgIf } from "@angular/common";

/**
 * Interfaz para definir la estructura de un estudiante
 */
interface Estudiante {
  /**
   * Documento del estudiante
   */
  documento: string;
  /**
   * Nombre del estudiante
   */
  nombre: string;
  /**
   * Edad del estudiante
   */
  edad: number;
  /**
   * Dirección de residencia del estudiante
   */
  direccion_residencia: string;
  /**
   * Teléfono de residencia del estudiante
   */
  telefono_residencia: string;
  /**
   * Celular del estudiante
   */
  celular: string;
}

/**
 * Componente de Estudiantes
 * Este componente gestiona la visualización y edición de los estudiantes.
 */
@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, NgIf],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.scss'
})
export class EstudiantesComponent implements OnInit {
  /**
   * Lista de estudiantes
   */
  estudiantes: Estudiante[] = [];

  /**
   * Formulario de estudiante
   */
  estudianteForm: FormGroup;

  /**
   * Indica si se está editando un estudiante
   */
  editing = false;

  /**
   * Documento del estudiante que se está editando
   */
  editingDocumento: string | null = null;

  /**
   * Columnas mostradas en la tabla de estudiantes
   */
  displayedColumns: string[] = ['documento', 'nombre', 'edad', 'direccion_residencia', 'telefono_residencia', 'celular', 'acciones'];

  /**
   * Fuente de datos para la tabla de estudiantes
   */
  dataSource = new MatTableDataSource<Estudiante>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.estudianteForm = this.fb.group({
      documento: ['', Validators.required],
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      direccion_residencia: ['', Validators.required],
      telefono_residencia: ['', Validators.required],
      celular: ['', Validators.required]
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    this.loadEstudiantes();
  }

  /**
   * Carga la lista de estudiantes desde la API
   */
  async loadEstudiantes(): Promise<void> {
    this.estudiantes = await this.apiService.getEstudiantes();
    this.dataSource.data = this.estudiantes;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Maneja el evento de envío del formulario de estudiante
   */
  async onSubmit(): Promise<void> {
    if (this.estudianteForm.invalid) {
      return;
    }

    const estudiante: Estudiante = this.estudianteForm.value;

    if (this.editing) {
      await this.apiService.updateEstudiante(this.editingDocumento!, estudiante);
      this.editing = false;
      this.editingDocumento = null;
    } else {
      await this.apiService.createEstudiante(estudiante);
    }

    this.estudianteForm.reset();
    this.loadEstudiantes();
  }

  /**
   * Carga los datos de un estudiante en el formulario para editar
   * @param {Estudiante} estudiante - El estudiante a editar
   */
  onEdit(estudiante: Estudiante): void {
    this.editing = true;
    this.editingDocumento = estudiante.documento;
    this.estudianteForm.patchValue(estudiante);
  }

  /**
   * Elimina un estudiante por documento
   * @param {string} documento - El documento del estudiante a eliminar
   */
  async onDelete(documento: string): Promise<void> {
    await this.apiService.deleteEstudiante(documento);
    this.loadEstudiantes();
  }
}
