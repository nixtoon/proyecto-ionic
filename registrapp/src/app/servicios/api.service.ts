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

  login(user: string, password: string): Observable<any> {
    const body = { user: user, password: password };
    return this.http.post(this.apiUrl + "/login", body, this.httpOptions).pipe(retry(3));
  }

  recovery(nombreUsuario: string): Observable<any> {
    return this.http.get(this.apiUrl + "/recovery" + '?nombre_usuario=' + nombreUsuario).pipe(retry(3))
  }

  registrarAsistencia(data: { idAlumno: string, nombreAlumno: string, idCurso: string, nombreCurso: string, codigoCurso: string, seccionCurso: string, presente: boolean }): Observable<any> {
    return this.http.post(this.apiUrl + "/registrar-asistencia", data, this.httpOptions).pipe(retry(3));
  }

  getCursos(profesorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos?id=${profesorId}`);
  }

  detalleCurso(cursoId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/detalle-curso?cursoId=${cursoId}`);
  }

}
