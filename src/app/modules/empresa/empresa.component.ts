import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgIf } from "@angular/common";

/**
 * Interfaz para definir la estructura de una empresa
 */
interface Empresa {
  /**
   * Identificador de la empresa
   */
  id: number;
  /**
   * Fecha de inicio de la práctica en la empresa
   */
  fecha_inicio: string;
  /**
   * Fecha de terminación de la práctica en la empresa
   */
  fecha_terminacion: string;
  /**
   * Total de días de práctica en la empresa
   */
  total_dias_practica: number;
  /**
   * NIT de la empresa
   */
  nit: string;
  /**
   * Nombre de la empresa
   */
  nombre_empresa: string;
}

/**
 * Componente de Empresa
 * Este componente gestiona la visualización y edición de las empresas.
 */
@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, NgIf],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent implements OnInit {
  /**
   * Lista de empresas
   */
  empresas: Empresa[] = [];

  /**
   * Formulario de empresa
   */
  empresaForm: FormGroup;

  /**
   * Indica si se está editando una empresa
   */
  editing = false;

  /**
   * ID de la empresa que se está editando
   */
  editingId: number | null = null;

  /**
   * Columnas mostradas en la tabla de empresas
   */
  displayedColumns: string[] = ['id', 'fecha_inicio', 'fecha_terminacion', 'total_dias_practica', 'nit', 'nombre_empresa', 'acciones'];

  /**
   * Fuente de datos para la tabla de empresas
   */
  dataSource = new MatTableDataSource<Empresa>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.empresaForm = this.fb.group({
      fecha_inicio: ['', Validators.required],
      fecha_terminacion: ['', Validators.required],
      total_dias_practica: ['', Validators.required],
      nit: ['', Validators.required],
      nombre_empresa: ['', Validators.required]
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    this.loadEmpresas();
  }

  /**
   * Carga la lista de empresas desde la API
   */
  async loadEmpresas(): Promise<void> {
    this.empresas = await this.apiService.getEmpresas();
    this.dataSource.data = this.empresas;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Maneja el evento de envío del formulario de empresa
   */
  async onSubmit(): Promise<void> {
    if (this.empresaForm.invalid) {
      return;
    }

    const empresa: Empresa = this.empresaForm.value;

    if (this.editing) {
      await this.apiService.updateEmpresa(this.editingId!, empresa);
      this.editing = false;
      this.editingId = null;
    } else {
      await this.apiService.createEmpresa(empresa);
    }

    this.empresaForm.reset();
    this.loadEmpresas();
  }

  /**
   * Carga los datos de una empresa en el formulario para editar
   * @param {Empresa} empresa - La empresa a editar
   */
  onEdit(empresa: Empresa): void {
    this.editing = true;
    this.editingId = empresa.id;
    this.empresaForm.patchValue(empresa);
  }

  /**
   * Elimina una empresa por ID
   * @param {number} id - El ID de la empresa a eliminar
   */
  async onDelete(id: number): Promise<void> {
    await this.apiService.deleteEmpresa(id);
    this.loadEmpresas();
  }
}
