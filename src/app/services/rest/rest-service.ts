import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, observable, Observable } from 'rxjs';
import { Users } from '../../model/users-model';
import { UnknownResource } from '../../model/unknownResource-model';
import { PaginatedResponse } from '../../model/paginatedResponse';
import { response } from 'express';



@Injectable({
  providedIn: 'root',
})
export class RestService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl: string = 'https://reqres.in/api';

  /**
   * Método genérico que obtiene cualquier recurso paginado.
   * @param endpoint - nombre del endpoint en la API ('users', 'unknown', etc.)
   * @param page - página a obtener (por defecto 1)
   * @param extraParams - parámetros opcionales (filtros, per_page, etc.)
   * @returns Observable de PaginatedResponse<T>
   */

  getPaginated<T>(endpoint: string, page: number = 1, extraParams?: Record<string, string | number>): Observable<PaginatedResponse<T>> {
    //Creamos Httparams con la págna por defecto
    let params = new HttpParams().set('page', page);

    //Si hay parámetros extra, los agregamos a los params
    if (extraParams) {
      for (const key in extraParams) {
        params = params.set(key, extraParams[key].toString());
      }
    }
    // Realizamos la petición HTTP y retornamos el Observable
    return this.http.get<PaginatedResponse<T>>(`${this.apiUrl}/${endpoint}`, { params });
  }


  // Adaptamos el servicio a la paginación, para no tener que escribir la paginación de forma manual, lo mismo con resources
  getUsers(page: number = 1) {
    return this.getPaginated<Users>('users', page);
  }

  getUserById(id: number): Observable<Users> {
    return this.http.get<{ data: Users }>(`${this.apiUrl}/users/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  getResources(page: number = 1) {
    return this.getPaginated<UnknownResource>('resources', page);
  }


  getResourceById(id: number): Observable<UnknownResource> {
    return this.http.get<{ data: UnknownResource }>(`${this.apiUrl}/resource/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  // Actualizar algún campo
  updateUser(id: number, user: Partial<Users>): Observable<Users> {
    return this.http.patch<{ data: Users }>(`${this.apiUrl}/users/${id}`, user)
      .pipe(
        map(response => response.data)
      );
  }
  
  // Actualizar todos los campos
  changeUser(id: number, user: Partial<Users>): Observable<Users> {
    return this.http.put<{ data: Users }>(`${this.apiUrl}/users/${id}`, user)
      .pipe(
        map(response => response.data)
      );
  }

  // Crear user
  createUser(userData: Partial<Users>): Observable<Users>{
    return this.http.post<{data: Users}>(`${this.apiUrl}/users`, userData)
    .pipe(
      map(response => response.data)
    );
  }
}

/* FORMAS DE NO SELECCIONAR TODOS LOS CAMPOS DE UN MODELO
      - Partial => más rápida y flexible
      - Omit => más estricta
            Ej:
              type CreateUser = Omit<Users, 'id'>;
              
              createUser(data: CreateUser): Observable<Users>{
                return this.http.post<Users>(`${this.apiUrl}/users`, data);
              } */