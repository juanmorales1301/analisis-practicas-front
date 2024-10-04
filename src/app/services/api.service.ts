import { Injectable } from '@angular/core';
import { environment } from '../environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

/**
 * Servicio API
 * Este servicio proporciona métodos para interactuar con la API backend.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Programas

  /**
   * Obtiene todos los programas
   * @returns {Promise<any>} Una promesa con la lista de programas
   */
  async getProgramas(): Promise<any> {
    const url = `${this.apiUrl}/programa`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Obtiene un programa por ID
   * @param {number} id - El ID del programa
   * @returns {Promise<any>} Una promesa con los detalles del programa
   */
  async getPrograma(id: number): Promise<any> {
    const url = `${this.apiUrl}/programa/${id}`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Crea un nuevo programa
   * @param {any} programa - Los datos del programa
   * @returns {Promise<any>} Una promesa con los datos del programa creado
   */
  async createPrograma(programa: any): Promise<any> {
    const url = `${this.apiUrl}/programa`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.post(url, programa, { headers }));
  }

  /**
   * Actualiza un programa por ID
   * @param {number} id - El ID del programa
   * @param {any} programa - Los datos actualizados del programa
   * @returns {Promise<any>} Una promesa con los datos del programa actualizado
   */
  async updatePrograma(id: number, programa: any): Promise<any> {
    const url = `${this.apiUrl}/programa/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.put(url, programa, { headers }));
  }

  /**
   * Elimina un programa por ID
   * @param {number} id - El ID del programa
   * @returns {Promise<any>} Una promesa que se resuelve cuando el programa es eliminado
   */
  async deletePrograma(id: number): Promise<any> {
    const url = `${this.apiUrl}/programa/${id}`;
    return firstValueFrom(this.http.delete(url));
  }

  // Contactos

  /**
   * Obtiene todos los contactos
   * @returns {Promise<any>} Una promesa con la lista de contactos
   */
  async getContactos(): Promise<any> {
    const url = `${this.apiUrl}/contacto`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Obtiene un contacto por ID
   * @param {number} id - El ID del contacto
   * @returns {Promise<any>} Una promesa con los detalles del contacto
   */
  async getContacto(id: number): Promise<any> {
    const url = `${this.apiUrl}/contacto/${id}`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Crea un nuevo contacto
   * @param {any} contacto - Los datos del contacto
   * @returns {Promise<any>} Una promesa con los datos del contacto creado
   */
  async createContacto(contacto: any): Promise<any> {
    const url = `${this.apiUrl}/contacto`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.post(url, contacto, { headers }));
  }

  /**
   * Actualiza un contacto por ID
   * @param {number} id - El ID del contacto
   * @param {any} contacto - Los datos actualizados del contacto
   * @returns {Promise<any>} Una promesa con los datos del contacto actualizado
   */
  async updateContacto(id: number, contacto: any): Promise<any> {
    const url = `${this.apiUrl}/contacto/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.put(url, contacto, { headers }));
  }

  /**
   * Elimina un contacto por ID
   * @param {number} id - El ID del contacto
   * @returns {Promise<any>} Una promesa que se resuelve cuando el contacto es eliminado
   */
  async deleteContacto(id: number): Promise<any> {
    const url = `${this.apiUrl}/contacto/${id}`;
    return firstValueFrom(this.http.delete(url));
  }

  // Empresas

  /**
   * Obtiene todas las empresas
   * @returns {Promise<any>} Una promesa con la lista de empresas
   */
  async getEmpresas(): Promise<any> {
    const url = `${this.apiUrl}/empresa`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Obtiene una empresa por ID
   * @param {number} id - El ID de la empresa
   * @returns {Promise<any>} Una promesa con los detalles de la empresa
   */
  async getEmpresa(id: number): Promise<any> {
    const url = `${this.apiUrl}/empresa/${id}`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Crea una nueva empresa
   * @param {any} empresa - Los datos de la empresa
   * @returns {Promise<any>} Una promesa con los datos de la empresa creada
   */
  async createEmpresa(empresa: any): Promise<any> {
    const url = `${this.apiUrl}/empresa`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.post(url, empresa, { headers }));
  }

  /**
   * Actualiza una empresa por ID
   * @param {number} id - El ID de la empresa
   * @param {any} empresa - Los datos actualizados de la empresa
   * @returns {Promise<any>} Una promesa con los datos de la empresa actualizada
   */
  async updateEmpresa(id: number, empresa: any): Promise<any> {
    const url = `${this.apiUrl}/empresa/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.put(url, empresa, { headers }));
  }

  /**
   * Elimina una empresa por ID
   * @param {number} id - El ID de la empresa
   * @returns {Promise<any>} Una promesa que se resuelve cuando la empresa es eliminada
   */
  async deleteEmpresa(id: number): Promise<any> {
    const url = `${this.apiUrl}/empresa/${id}`;
    return firstValueFrom(this.http.delete(url));
  }

  // Jefes

  /**
   * Obtiene todos los jefes
   * @returns {Promise<any>} Una promesa con la lista de jefes
   */
  async getJefes(): Promise<any> {
    const url = `${this.apiUrl}/jefe`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Obtiene un jefe por ID
   * @param {number} id - El ID del jefe
   * @returns {Promise<any>} Una promesa con los detalles del jefe
   */
  async getJefe(id: number): Promise<any> {
    const url = `${this.apiUrl}/jefe/${id}`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Crea un nuevo jefe
   * @param {any} jefe - Los datos del jefe
   * @returns {Promise<any>} Una promesa con los datos del jefe creado
   */
  async createJefe(jefe: any): Promise<any> {
    const url = `${this.apiUrl}/jefe`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.post(url, jefe, { headers }));
  }

  /**
   * Actualiza un jefe por ID
   * @param {number} id - El ID del jefe
   * @param {any} jefe - Los datos actualizados del jefe
   * @returns {Promise<any>} Una promesa con los datos del jefe actualizado
   */
  async updateJefe(id: number, jefe: any): Promise<any> {
    const url = `${this.apiUrl}/jefe/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.put(url, jefe, { headers }));
  }

  /**
   * Elimina un jefe por ID
   * @param {number} id - El ID del jefe
   * @returns {Promise<any>} Una promesa que se resuelve cuando el jefe es eliminado
   */
  async deleteJefe(id: number): Promise<any> {
    const url = `${this.apiUrl}/jefe/${id}`;
    return firstValueFrom(this.http.delete(url));
  }

  // Estudiantes

  /**
   * Obtiene todos los estudiantes
   * @returns {Promise<any>} Una promesa con la lista de estudiantes
   */
  async getEstudiantes(): Promise<any> {
    const url = `${this.apiUrl}/estudiante`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Obtiene un estudiante por documento
   * @param {string} documento - El documento del estudiante
   * @returns {Promise<any>} Una promesa con los detalles del estudiante
   */
  async getEstudiante(documento: string): Promise<any> {
    const url = `${this.apiUrl}/estudiante/${documento}`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Crea un nuevo estudiante
   * @param {any} estudiante - Los datos del estudiante
   * @returns {Promise<any>} Una promesa con los datos del estudiante creado
   */
  async createEstudiante(estudiante: any): Promise<any> {
    const url = `${this.apiUrl}/estudiante`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.post(url, estudiante, { headers }));
  }

  /**
   * Actualiza un estudiante por documento
   * @param {string} documento - El documento del estudiante
   * @param {any} estudiante - Los datos actualizados del estudiante
   * @returns {Promise<any>} Una promesa con los datos del estudiante actualizado
   */
  async updateEstudiante(documento: string, estudiante: any): Promise<any> {
    const url = `${this.apiUrl}/estudiante/${documento}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.put(url, estudiante, { headers }));
  }

  /**
   * Elimina un estudiante por documento
   * @param {string} documento - El documento del estudiante
   * @returns {Promise<any>} Una promesa que se resuelve cuando el estudiante es eliminado
   */
  async deleteEstudiante(documento: string): Promise<any> {
    const url = `${this.apiUrl}/estudiante/${documento}`;
    return firstValueFrom(this.http.delete(url));
  }

  // Prácticas

  /**
   * Obtiene todas las prácticas
   * @returns {Promise<any>} Una promesa con la lista de prácticas
   */
  async getPracticas(): Promise<any> {
    const url = `${this.apiUrl}/practica`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Obtiene una práctica por ID
   * @param {number} id - El ID de la práctica
   * @returns {Promise<any>} Una promesa con los detalles de la práctica
   */
  async getPractica(id: number): Promise<any> {
    const url = `${this.apiUrl}/practica/${id}`;
    return firstValueFrom(this.http.get(url));
  }

  /**
   * Crea una nueva práctica
   * @param {any} practica - Los datos de la práctica
   * @returns {Promise<any>} Una promesa con los datos de la práctica creada
   */
  async createPractica(practica: any): Promise<any> {
    const url = `${this.apiUrl}/practica`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.post(url, practica, { headers }));
  }

  /**
   * Actualiza una práctica por ID
   * @param {number} id - El ID de la práctica
   * @param {any} practica - Los datos actualizados de la práctica
   * @returns {Promise<any>} Una promesa con los datos de la práctica actualizada
   */
  async updatePractica(id: number, practica: any): Promise<any> {
    const url = `${this.apiUrl}/practica/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.put(url, practica, { headers }));
  }

  /**
   * Elimina una práctica por ID
   * @param {number} id - El ID de la práctica
   * @returns {Promise<any>} Una promesa que se resuelve cuando la práctica es eliminada
   */
  async deletePractica(id: number): Promise<any> {
    const url = `${this.apiUrl}/practica/${id}`;
    return firstValueFrom(this.http.delete(url));
  }

}
