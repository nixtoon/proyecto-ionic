import { alumnos } from "./alumno";
export class curso {
    id: number | undefined;
    nombre: string | undefined;
    codigo: string | undefined;
    seccion: string | undefined;
    alumnos?: alumnos[] | undefined; 
}