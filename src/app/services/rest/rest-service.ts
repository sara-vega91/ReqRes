import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Users } from '../../model/users-model';
import { UnknownResource } from '../../model/unknownResource-model';



@Injectable({
  providedIn: 'root',
})
export class RestService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl: string = 'https://reqres.in/api';


  getUsers(): Observable<Users[]> {
    return this.http.get<{ data: Users[] }>(`${this.apiUrl}/users`)
      .pipe(
        map(response => response.data)
      );
  }

  getUserById(id: number): Observable<Users> {
    return this.http.get<{ data: Users }>(`${this.apiUrl}/users/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  getResources(): Observable<UnknownResource[]> {
    return this.http.get<{ data: UnknownResource[] }>(`${this.apiUrl}/resource`)
      .pipe(
        map(response => response.data)
      );
  }

  getResourceById(id: number): Observable<UnknownResource> {
    return this.http.get<{ data: UnknownResource }>(`${this.apiUrl}/resource/${id}`)
      .pipe(
        map(response => response.data)
      );
  }
}
