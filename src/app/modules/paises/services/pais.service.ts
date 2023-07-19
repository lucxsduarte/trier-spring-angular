import { EventEmitter, Injectable } from '@angular/core';
import { Pais } from '../models/pais';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private urlBase: string = "http://localhost:8080/pais";
  private userSubject = new Subject<Pais[]>();
  public selectUserEvent = new EventEmitter();
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  public listAll(): Observable<Pais[]> {
    let url = `http://localhost:8080/pais`;
    this.http.get<Pais[]>(this.urlBase).subscribe(paises => this.userSubject.next(paises));
    return this.userSubject.asObservable();
  }

  public filtrarPorNome(nome: string): Observable<Pais[]> {
    let url = `${this.urlBase}/name/${nome}`;
    this.http.get<Pais[]>(url).subscribe(paises => this.userSubject.next(paises));
    return this.userSubject.asObservable();
  }

  public clickEditar(pais: Pais){
    this.selectUserEvent.emit(pais);
  }

  public insert(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.urlBase, JSON.stringify(pais), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }

  public delete(pais: Pais): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${pais.id}`);
  }

  public edit(pais: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.urlBase}/${pais.id}`, JSON.stringify(pais), this.httpOptions).pipe(
      tap(() => {
        this.listAll();
      })
    ); 
  }
}
