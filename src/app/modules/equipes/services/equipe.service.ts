import { EventEmitter, Injectable } from '@angular/core';
import { Equipe } from '../models/equipe';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private urlBase: string = "http://localhost:8080/equipe";
  private userSubject = new Subject<Equipe[]>();
  public selectUserEvent = new EventEmitter();
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  public listAll(): Observable<Equipe[]> {
    let url = `http://localhost:8080/equipe`;
    this.http.get<Equipe[]>(this.urlBase).subscribe(equipe => this.userSubject.next(equipe));
    return this.userSubject.asObservable();
  }

  public filtrarPorNome(nome: string): Observable<Equipe[]> {
    let url = `${this.urlBase}/name/${nome}`;
    this.http.get<Equipe[]>(url).subscribe(equipe => this.userSubject.next(equipe));
    return this.userSubject.asObservable();
  }

  public clickEditar(equipe: Equipe){
    this.selectUserEvent.emit(equipe);
  }

  public insert(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.urlBase, JSON.stringify(equipe), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public delete(equipe: Equipe): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${equipe.id}`);
  }

  public edit(equipe: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(`${this.urlBase}/${equipe.id}`, JSON.stringify(equipe), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }
}
