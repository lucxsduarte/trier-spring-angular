import { EventEmitter, Injectable } from '@angular/core';
import { Campeonato } from '../models/campeonato';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  private urlBase: string = "http://localhost:8080/camp";
  private userSubject = new Subject<Campeonato[]>();
  public selectUserEvent = new EventEmitter();
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  public listAll(): Observable<Campeonato[]> {
    let url = `http://localhost:8080/camp`;
    this.http.get<Campeonato[]>(this.urlBase).subscribe(camp => this.userSubject.next(camp));
    return this.userSubject.asObservable();
  }

  public filtrarPorDesc(nome: string): Observable<Campeonato[]> {
    let url = `${this.urlBase}/desc/${nome}`;
    this.http.get<Campeonato[]>(url).subscribe(camp => this.userSubject.next(camp));
    return this.userSubject.asObservable();
  }

  public clickEditar(camp: Campeonato){
    this.selectUserEvent.emit(camp);
  }

  public insert(camp: Campeonato): Observable<Campeonato> {
    return this.http.post<Campeonato>(this.urlBase, JSON.stringify(camp), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public delete(camp: Campeonato): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${camp.id}`);
  }

  public edit(camp: Campeonato): Observable<Campeonato> {
    return this.http.put<Campeonato>(`${this.urlBase}/${camp.id}`, JSON.stringify(camp), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }
}
