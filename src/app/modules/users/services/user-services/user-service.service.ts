import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/modules/home/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private urlBase: string = "http://localhost:8080/usuarios";
  private userSubject = new Subject<User[]>();
  public selectUserEvent = new EventEmitter();
  public token: string = "Bearer ";
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'text' as 'json',
  }

  constructor(private http: HttpClient, private loginService: LoginService) {}

  public getToken(){
    this.loginService.getToken("teste1@gmail.com", "123").subscribe((token: string) => {
    this.token += token;
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa" + token);
    })
  }


  // public getUsers(): Observable<User[]> {


  //   let httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token })
  //   };

  //   let url = `http://localhost:8080/usuarios`;

  //   this.http.get<User[]>(this.urlBase, httpOptions).subscribe(users => this.userSubject.next(users));
  //   return this.userSubject.asObservable();
  // }

  public getUsers(): Observable<User[]> {
    let url = `http://localhost:8080/usuarios`;
    this.http.get<User[]>(this.urlBase).subscribe(users => this.userSubject.next(users));
    return this.userSubject.asObservable();
  }

  public filtrarPorNome(nome: string): Observable<User[]> {
    let url = `${this.urlBase}/name/${nome}`;
    this.http.get<User[]>(url).subscribe(users => this.userSubject.next(users));
    return this.userSubject.asObservable();
  }

  public clickEditar(user: User){
    this.selectUserEvent.emit(user);
  }

  public insertUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlBase, JSON.stringify(user), this.httpOptions).pipe(
      tap(() => {
        this.getUsers();
      })
    ); 
  }

  public deleteUser(user: User): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`);
  }

  public editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.urlBase}/${user.id}`, JSON.stringify(user), this.httpOptions).pipe(
      tap(() => {
        this.getUsers();
      })
    ); 
  }

}
