import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  public listaCompleta: User[] = [];
  public listaFiltrada: User[] = [];
  public nomeFiltrado: string = "";

  public name: string = "";
  public email: string = "";
  public password: string = "";
  public roles: string = "";
  public emitName = new EventEmitter();
  public emitEmail = new EventEmitter();
  public emitPassword = new EventEmitter();
  public emitRoles = new EventEmitter();

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    let url = `http://localhost:8080/usuarios`;
    return this.http.get<User[]>(url);
  }

  public getName(): Observable<User[]> {
    let url = `http://localhost:8080/usuarios/name/${this.name}`;
    return this.http.get<User[]>(url);
  }

  public filtrarPorNome(nome: string) {
    this.nomeFiltrado = nome;
    if (this.nomeFiltrado) {
      this.getName().subscribe((users: User[]) => {
        this.listaFiltrada = users;
      });
    } else {
      this.listaFiltrada = this.listaCompleta;
    }
  }

  public clickEditar(user: any){
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.roles = user.roles;
    this.emitName.emit(this.name);
    this.emitEmail.emit(this.email);
    this.emitPassword.emit(this.password);
    this.emitRoles.emit(this.roles);
  }


}
