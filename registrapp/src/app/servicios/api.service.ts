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
      //'Access-Control-Allow-Origin': '*'
    })
  }


  constructor(private http: HttpClient) { }

  apiUrl = 'https://cqj33psb-3000.brs.devtunnels.ms/api';

  loginAlumno(nombreUsuario: string, password: string): Observable<any> {
    const body = { user: nombreUsuario, password: password };
    return this.http.post(this.apiUrl + "/login-alumno", body, this.httpOptions).pipe(retry(3));
  }

  loginDocente(nombreUsuario: string, password: string): Observable<any> {
    const body = { user: nombreUsuario, password: password };
    return this.http.post(this.apiUrl + "/login-profesor", body, this.httpOptions).pipe(retry(3));
  }

  recovery(nombreUsuario: string): Observable<any> {
    return this.http.get(this.apiUrl + "/recovery" + '?nombre_usuario=' + nombreUsuario).pipe(retry(3))
  }

  registrarAsistencia(data: { alumno: string, curso: string; presente: boolean; }): Observable<any> {
    return this.http.post(this.apiUrl + "/registrar-asistencia", data, this.httpOptions).pipe(retry(3));
  }

  getCursos(profesorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos?profesorId=${profesorId}`);
  }

  detalleCurso(cursoId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/detalle-curso?cursoId=${cursoId}`);
  }

}
