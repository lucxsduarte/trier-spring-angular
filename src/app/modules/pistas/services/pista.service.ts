import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Pista } from '../model/pista';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pais } from '../../paises/models/pais';

@Injectable({
  providedIn: 'root'
})
export class PistaService {

  private urlBase: string = "http://localhost:8080/pista";
  private pistaSubject = new Subject<Pista[]>();
  public selectUserEvent = new EventEmitter();
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  public listAll(): Observable<Pista[]> {
    let url = `http://localhost:8080/pista`;
    this.http.get<Pista[]>(this.urlBase).subscribe(pistas => this.pistaSubject.next(pistas));
    return this.pistaSubject.asObservable();
  }

  public delete(pista: Pista): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${pista.id}`);
  }

  public clickEditar(pista: Pista){
    this.selectUserEvent.emit(pista);
  }

  public insert(pista: Pista): Observable<Pista> {
    return this.http.post<Pista>(this.urlBase, JSON.stringify(pista), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public edit(pista: Pista): Observable<Pista> {
    return this.http.put<Pista>(`${this.urlBase}/${pista.id}`, JSON.stringify(pista), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public filtrarPorTamanho(tamanho: number): Observable<Pista[]> {
    let url = `${this.urlBase}/tamanho/${tamanho}`;
    this.http.get<Pista[]>(url).subscribe(pistas => this.pistaSubject.next(pistas));
    return this.pistaSubject.asObservable();
  }

  public filtrarPorPais(pais: Pais): Observable<Pista[]> {
    let url = `${this.urlBase}/pais/${pais.id}`;
    this.http.get<Pista[]>(url).subscribe(pistas => this.pistaSubject.next(pistas));
    return this.pistaSubject.asObservable();
  }

  public filtrarPorTamanhoEntre(tamanhoInicial: number, tamanhoFinal: number): Observable<Pista[]> {
    let url = `${this.urlBase}/tamanho/entre/${tamanhoInicial}/${tamanhoFinal}`;
    this.http.get<Pista[]>(url).subscribe(pistas => this.pistaSubject.next(pistas));
    return this.pistaSubject.asObservable();
  }
}
