import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public token: string = "Bearer ";

  constructor(private http: HttpClient) {}

  public getToken(email: string, password: string):Observable<string> { //adicionar um retorno :Observable<void>

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json',
    }

    let url = "http://localhost:8080/auth/token";

    let userLogin = {
      email: email,
      password: password
    }

    return this.http.post<string>(url, userLogin, httpOptions);
  }
}
