import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Campeonato } from '../../campeonatos/models/campeonato';
import { Pista } from '../../pistas/model/pista';
import { CorridaDTO } from '../model/corrida-dto';

@Injectable({
  providedIn: 'root'
})
export class CorridaService {

  private urlBase: string = "http://localhost:8080/corrida";
  private corridaSubject = new Subject<CorridaDTO[]>();
  public selectUserEvent = new EventEmitter();
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  public listAll(): Observable<CorridaDTO[]> {
    let url = `http://localhost:8080/corrida`;
    this.http.get<CorridaDTO[]>(this.urlBase).subscribe(corridas => this.corridaSubject.next(corridas));
    return this.corridaSubject.asObservable();
  }

  public delete(corrida: CorridaDTO): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${corrida.id}`);
  }

  public clickEditar(corrida: CorridaDTO){
    this.selectUserEvent.emit(corrida);
  }

  public insert(corrida: CorridaDTO): Observable<CorridaDTO> {
    return this.http.post<CorridaDTO>(this.urlBase, JSON.stringify(corrida), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public edit(corrida: CorridaDTO): Observable<CorridaDTO> {
    return this.http.put<CorridaDTO>(`${this.urlBase}/${corrida.id}`, JSON.stringify(corrida), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public filtrarPorData(data: string): Observable<CorridaDTO[]> {
    let url = `${this.urlBase}/data/${data}`;
    this.http.get<CorridaDTO[]>(url).subscribe(corridas => this.corridaSubject.next(corridas));
    return this.corridaSubject.asObservable();
  }

  public filtrarPorPista(pista: number): Observable<CorridaDTO[]> {
    let url = `${this.urlBase}/pista/${pista}`;
    this.http.get<CorridaDTO[]>(url).subscribe(corridas => this.corridaSubject.next(corridas));
    return this.corridaSubject.asObservable();
  }

  public filtrarPorCampeonato(campeonato: number): Observable<CorridaDTO[]> {
    let url = `${this.urlBase}/campeonato/${campeonato}`;
    this.http.get<CorridaDTO[]>(url).subscribe(corridas => this.corridaSubject.next(corridas));
    return this.corridaSubject.asObservable();
  }
}
