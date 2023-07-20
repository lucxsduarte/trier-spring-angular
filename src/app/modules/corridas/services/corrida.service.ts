import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Corrida } from '../model/corrida';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Campeonato } from '../../campeonatos/models/campeonato';
import { Pista } from '../../pistas/model/pista';

@Injectable({
  providedIn: 'root'
})
export class CorridaService {

  private urlBase: string = "http://localhost:8080/corrida";
  private corridaSubject = new Subject<Corrida[]>();
  public selectUserEvent = new EventEmitter();
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  public listAll(): Observable<Corrida[]> {
    let url = `http://localhost:8080/corrida`;
    this.http.get<Corrida[]>(this.urlBase).subscribe(corridas => this.corridaSubject.next(corridas));
    return this.corridaSubject.asObservable();
  }

  public delete(corrida: Corrida): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${corrida.id}`);
  }

  public clickEditar(corrida: Corrida){
    this.selectUserEvent.emit(corrida);
  }

  public insert(corrida: Corrida): Observable<Corrida> {
    return this.http.post<Corrida>(this.urlBase, JSON.stringify(corrida), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public edit(corrida: Corrida): Observable<Corrida> {
    return this.http.put<Corrida>(`${this.urlBase}/${corrida.id}`, JSON.stringify(corrida), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public filtrarPorData(data: string): Observable<Corrida[]> {
    let url = `${this.urlBase}/data/${data}`;
    this.http.get<Corrida[]>(url).subscribe(corridas => this.corridaSubject.next(corridas));
    return this.corridaSubject.asObservable();
  }

  public filtrarPorPista(pista: Pista): Observable<Corrida[]> {
    let url = `${this.urlBase}/pista/${pista.id}`;
    this.http.get<Corrida[]>(url).subscribe(corridas => this.corridaSubject.next(corridas));
    return this.corridaSubject.asObservable();
  }

  public filtrarPorCampeonato(campeonato: Campeonato): Observable<Corrida[]> {
    let url = `${this.urlBase}/campeonato/${campeonato.id}`;
    this.http.get<Corrida[]>(url).subscribe(corridas => this.corridaSubject.next(corridas));
    return this.corridaSubject.asObservable();
  }
}
