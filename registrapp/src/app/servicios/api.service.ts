import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }


  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3000/api';

  buscarUsuario(nombreUsuario: string, password: string): Observable<any> {
    return this.http.get(this.apiUrl + "/buscarUsuario" + '?nombre_usuario=' + nombreUsuario + '&password=' + password).pipe(retry(3))
  }

  buscarDocente(nombreUsuario: string, password: string): Observable<any> {
    return this.http.get(this.apiUrl + "/buscarDocente" + '?nombre_docente=' + nombreUsuario + '&password_docente=' + password).pipe(retry(3))
  }

  recovery(nombreUsuario: string): Observable<any> {
    return this.http.get(this.apiUrl + "/recovery" + '?nombre_usuario=' + nombreUsuario).pipe(retry(3))
  }

  registrarAsistencia(data: { curso: string; presente: boolean; }): Observable<any> {
    return this.http.post(this.apiUrl + "/registrar-asistencia", data, this.httpOptions).pipe(retry(3));
  }

  getCursos(docenteId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/buscar-cursos?docenteId=${docenteId}`);
  }

}
