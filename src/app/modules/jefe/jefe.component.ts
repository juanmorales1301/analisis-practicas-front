import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgIf } from "@angular/common";

/**
 * Interfaz para definir la estructura de un jefe
 */
interface Jefe {
  /**
   * Identificador del jefe
   */
  id: number;
  /**
   * Nombre del jefe
   */
  nombre_jefe: string;
  /**
   * Teléfono del jefe
   */
  telefono_jefe: string;
  /**
   * Correo del jefe
   */
  correo_jefe: string;
  /**
   * Cargo del jefe
   */
  cargo_jefe: string;
}

/**
 * Componente de Jefes
 * Este componente gestiona la visualización y edición de los jefes.
 */
@Component({
  selector: 'app-jefe',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, NgIf],
  templateUrl: './jefe.component.html',
  styleUrls: ['./jefe.component.scss']
})
export class JefeComponent implements OnInit {
  /**
   * Lista de jefes
   */
  jefes: Jefe[] = [];

  /**
   * Formulario de jefe
   */
  jefeForm: FormGroup;

  /**
   * Indica si se está editando un jefe
   */
  editing = false;

  /**
   * ID del jefe que se está editando
   */
  editingId: number | null = null;

  /**
   * Columnas mostradas en la tabla de jefes
   */
  displayedColumns: string[] = ['id', 'nombre_jefe', 'telefono_jefe', 'correo_jefe', 'cargo_jefe', 'acciones'];

  /**
   * Fuente de datos para la tabla de jefes
   */
  dataSource = new MatTableDataSource<Jefe>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.jefeForm = this.fb.group({
      nombre_jefe: ['', Validators.required],
      telefono_jefe: ['', Validators.required],
      correo_jefe: ['', [Validators.required, Validators.email]],
      cargo_jefe: ['', Validators.required]
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    this.loadJefes();
  }

  /**
   * Carga la lista de jefes desde la API
   */
  async loadJefes(): Promise<void> {
    this.jefes = await this.apiService.getJefes();
    this.dataSource.data = this.jefes;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Maneja el evento de envío del formulario de jefe
   */
  async onSubmit(): Promise<void> {
    if (this.jefeForm.invalid) {
      return;
    }

    const jefe: Jefe = this.jefeForm.value;

    if (this.editing) {
      await this.apiService.updateJefe(this.editingId!, jefe);
      this.editing = false;
      this.editingId = null;
    } else {
      await this.apiService.createJefe(jefe);
    }

    this.jefeForm.reset();
    this.loadJefes();
  }

  /**
   * Carga los datos de un jefe en el formulario para editar
   * @param {Jefe} jefe - El jefe a editar
   */
  onEdit(jefe: Jefe): void {
    this.editing = true;
    this.editingId = jefe.id;
    this.jefeForm.patchValue(jefe);
  }

  /**
   * Elimina un jefe por ID
   * @param {number} id - El ID del jefe a eliminar
   */
  async onDelete(id: number): Promise<void> {
    await this.apiService.deleteJefe(id);
    this.loadJefes();
  }
}
