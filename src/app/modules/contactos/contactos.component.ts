import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { NgIf } from "@angular/common";

/**
 * Interfaz para definir la estructura de un contacto
 */
interface Contacto {
  /**
   * Identificador del contacto
   */
  id: number;
  /**
   * Nombre del contacto
   */
  nombre_contacto: string;
  /**
   * Cargo del contacto
   */
  cargo_contacto: string;
  /**
   * Teléfono del contacto
   */
  telefono_contacto: string;
  /**
   * Celular del contacto
   */
  celular_contacto: string;
  /**
   * Email del contacto
   */
  email_contacto: string;
  /**
   * Dirección del contacto
   */
  direccion_contacto: string;
}

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
  /**
   * Lista de contactos
   */
  contactos: Contacto[] = [];

  /**
   * Formulario de contacto
   */
  contactoForm: FormGroup;

  /**
   * Indica si se está editando un contacto
   */
  editing = false;

  /**
   * ID del contacto que se está editando
   */
  editingId: number | null = null;

  /**
   * Columnas mostradas en la tabla de contactos
   */
  displayedColumns: string[] = ['id', 'nombre_contacto', 'cargo_contacto', 'telefono_contacto', 'celular_contacto', 'email_contacto', 'direccion_contacto', 'acciones'];

  /**
   * Fuente de datos para la tabla de contactos
   */
  dataSource = new MatTableDataSource<Contacto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.contactoForm = this.fb.group({
      nombre_contacto: ['', Validators.required],
      cargo_contacto: ['', Validators.required],
      telefono_contacto: ['', Validators.required],
      celular_contacto: ['', Validators.required],
      email_contacto: ['', [Validators.required, Validators.email]],
      direccion_contacto: ['', Validators.required]
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    this.loadContactos();
  }

  /**
   * Carga la lista de contactos desde la API
   */
  async loadContactos(): Promise<void> {
    this.contactos = await this.api.getContactos();
    this.dataSource.data = this.contactos;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Maneja el evento de envío del formulario de contacto
   */
  async onSubmit(): Promise<void> {
    if (this.contactoForm.invalid) {
      return;
    }

    const contacto: Contacto = this.contactoForm.value;

    if (this.editing) {
      await this.api.updateContacto(this.editingId!, contacto);
      this.editing = false;
      this.editingId = null;
    } else {
      await this.api.createContacto(contacto);
    }

    this.contactoForm.reset();
    this.loadContactos();
  }

  /**
   * Carga los datos de un contacto en el formulario para editar
   * @param {Contacto} contacto - El contacto a editar
   */
  onEdit(contacto: Contacto): void {
    this.editing = true;
    this.editingId = contacto.id;
    this.contactoForm.patchValue(contacto);
  }

  /**
   * Elimina un contacto por ID
   * @param {number} id - El ID del contacto a eliminar
   */
  async onDelete(id: number): Promise<void> {
    await this.api.deleteContacto(id);
    this.loadContactos();
  }
}
