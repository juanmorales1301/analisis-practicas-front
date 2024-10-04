import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgIf } from "@angular/common";

/**
 * Interfaz para definir la estructura de una práctica
 */
interface Practica {
  /**
   * Identificador de la práctica
   */
  id: number;
  /**
   * Clasificaciones de la práctica
   */
  clasificaciones: string;
  /**
   * Número de folio de la práctica
   */
  no_folio: string;
  /**
   * Fecha de entrega en la facultad
   */
  fecha_entrega_facultad: string;
  /**
   * Número de práctica inscrita
   */
  numero_practica_inscribe: string;
  /**
   * Fecha de inscripción de la materia
   */
  fecha_inscripcion_materia: string;
  /**
   * NRC de la práctica
   */
  nrc: string;
  /**
   * Programa asociado a la práctica
   */
  programa: string;
  /**
   * Documento del estudiante asociado a la práctica
   */
  documento_estudiante: string;
  /**
   * Identificador de la empresa asociada a la práctica
   */
  id_empresa: number;
  /**
   * Identificador del contacto asociado a la práctica
   */
  id_contacto: number;
  /**
   * Identificador del jefe asociado a la práctica
   */
  id_jefe: number;
}

/**
 * Componente de Prácticas
 * Este componente gestiona la visualización y edición de las prácticas.
 */
@Component({
  selector: 'app-practicas',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, NgIf],
  templateUrl: './practicas.component.html',
  styleUrl: './practicas.component.scss'
})
export class PracticasComponent implements OnInit {
  /**
   * Lista de prácticas
   */
  practicas: Practica[] = [];

  /**
   * Formulario de práctica
   */
  practicaForm: FormGroup;

  /**
   * Indica si se está editando una práctica
   */
  editing = false;

  /**
   * ID de la práctica que se está editando
   */
  editingId: number | null = null;

  /**
   * Columnas mostradas en la tabla de prácticas
   */
  displayedColumns: string[] = ['id', 'clasificaciones', 'no_folio', 'fecha_entrega_facultad', 'numero_practica_inscribe', 'fecha_inscripcion_materia', 'nrc', 'programa', 'documento_estudiante', 'id_empresa', 'id_contacto', 'id_jefe', 'acciones'];

  /**
   * Fuente de datos para la tabla de prácticas
   */
  dataSource = new MatTableDataSource<Practica>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.practicaForm = this.fb.group({
      clasificaciones: ['', Validators.required],
      no_folio: [''],
      fecha_entrega_facultad: [''],
      numero_practica_inscribe: [''],
      fecha_inscripcion_materia: [''],
      nrc: [''],
      programa: [''],
      documento_estudiante: [''],
      id_empresa: [null],
      id_contacto: [null],
      id_jefe: [null]
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    this.loadPracticas();
  }

  /**
   * Carga la lista de prácticas desde la API
   */
  async loadPracticas(): Promise<void> {
    this.practicas = await this.apiService.getPracticas();
    this.dataSource.data = this.practicas;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Maneja el evento de envío del formulario de práctica
   */
  async onSubmit(): Promise<void> {
    if (this.practicaForm.invalid) {
      return;
    }

    const practica: Practica = this.practicaForm.value;

    if (this.editing) {
      await this.apiService.updatePractica(this.editingId!, practica);
      this.editing = false;
      this.editingId = null;
    } else {
      await this.apiService.createPractica(practica);
    }

    this.practicaForm.reset();
    this.loadPracticas();
  }

  /**
   * Carga los datos de una práctica en el formulario para editar
   * @param {Practica} practica - La práctica a editar
   */
  onEdit(practica: Practica): void {
    this.editing = true;
    this.editingId = practica.id;
    this.practicaForm.patchValue(practica);
  }

  /**
   * Elimina una práctica por ID
   * @param {number} id - El ID de la práctica a eliminar
   */
  async onDelete(id: number): Promise<void> {
    await this.apiService.deletePractica(id);
    this.loadPracticas();
  }
}
