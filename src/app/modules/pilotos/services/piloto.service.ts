import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Pais } from '../../paises/models/pais';
import { Equipe } from '../../equipes/models/equipe';
import { Piloto } from '../model/piloto';

@Injectable({
  providedIn: 'root'
})
export class PilotoService {

  private urlBase: string = "http://localhost:8080/piloto";
  private pilotoSubject = new Subject<Piloto[]>();
  public selectUserEvent = new EventEmitter();
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  public listAll(): Observable<Piloto[]> {
    let url = `http://localhost:8080/piloto`;
    this.http.get<Piloto[]>(this.urlBase).subscribe(pilotos => this.pilotoSubject.next(pilotos));
    return this.pilotoSubject.asObservable();
  }

  public delete(piloto: Piloto): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${piloto.id}`);
  }

  public clickEditar(piloto: Piloto){
    this.selectUserEvent.emit(piloto);
  }

  public insert(piloto: Piloto): Observable<Piloto> {
    return this.http.post<Piloto>(this.urlBase, JSON.stringify(piloto), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public edit(piloto: Piloto): Observable<Piloto> {
    return this.http.put<Piloto>(`${this.urlBase}/${piloto.id}`, JSON.stringify(piloto), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public filtrarPorNome(nome: string): Observable<Piloto[]> {
    let url = `${this.urlBase}/name/${nome}`;
    this.http.get<Piloto[]>(url).subscribe(pilotos => this.pilotoSubject.next(pilotos));
    return this.pilotoSubject.asObservable();
  }

  public filtrarPorPais(pais: Pais): Observable<Piloto[]> {
    let url = `${this.urlBase}/pais/${pais.id}`;
    this.http.get<Piloto[]>(url).subscribe(pilotos => this.pilotoSubject.next(pilotos));
    return this.pilotoSubject.asObservable();
  }

  public filtrarPorEquipe(equipe: Equipe): Observable<Piloto[]> {
    let url = `${this.urlBase}/equipe/${equipe.id}`;
    this.http.get<Piloto[]>(url).subscribe(pilotos => this.pilotoSubject.next(pilotos));
    return this.pilotoSubject.asObservable();
  }

}
