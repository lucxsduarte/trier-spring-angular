import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Pais } from '../../paises/models/pais';
import { Equipe } from '../../equipes/models/equipe';
import { PilotoDTO } from '../model/piloto-dto';

@Injectable({
  providedIn: 'root'
})
export class PilotoService {

  private urlBase: string = "http://localhost:8080/piloto";
  private pilotoSubject = new Subject<PilotoDTO[]>();
  public selectUserEvent = new EventEmitter();
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  public listAll(): Observable<PilotoDTO[]> {
    let url = `http://localhost:8080/piloto`;
    this.http.get<PilotoDTO[]>(this.urlBase).subscribe(pilotos => this.pilotoSubject.next(pilotos));
    return this.pilotoSubject.asObservable();
  }

  public delete(piloto: PilotoDTO): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${piloto.id}`);
  }

  public clickEditar(piloto: PilotoDTO){
    this.selectUserEvent.emit(piloto);
  }

  public insert(piloto: PilotoDTO): Observable<PilotoDTO> {
    return this.http.post<PilotoDTO>(this.urlBase, JSON.stringify(piloto), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public edit(piloto: PilotoDTO): Observable<PilotoDTO> {
    return this.http.put<PilotoDTO>(`${this.urlBase}/${piloto.id}`, JSON.stringify(piloto), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public filtrarPorNome(nome: string): Observable<PilotoDTO[]> {
    let url = `${this.urlBase}/nome/${nome}`;
    this.http.get<PilotoDTO[]>(url).subscribe(pilotos => this.pilotoSubject.next(pilotos));
    return this.pilotoSubject.asObservable();
  }

  public filtrarPorPais(pais: number): Observable<PilotoDTO[]> {
    let url = `${this.urlBase}/pais/${pais}`;
    this.http.get<PilotoDTO[]>(url).subscribe(pilotos => this.pilotoSubject.next(pilotos));
    return this.pilotoSubject.asObservable();
  }

  public filtrarPorEquipe(equipe: number): Observable<PilotoDTO[]> {
    let url = `${this.urlBase}/equipe/${equipe}`;
    this.http.get<PilotoDTO[]>(url).subscribe(pilotos => this.pilotoSubject.next(pilotos));
    return this.pilotoSubject.asObservable();
  }

}
