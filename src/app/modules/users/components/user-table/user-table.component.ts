import { Component } from '@angular/core';
import { UserServiceService } from '../../services/user-services/user-service.service';
import { OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit{

  constructor(private service: UserServiceService){}
  public name: string = "";
  public email: string = "";
  public password: string = "";
  public roles: string = "";
  public listaExibida : User[] = [];
  public listaCompleta: User[] = [];
  public listaFiltrada: User[] = [];
  
  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.listaExibida = data;
    });

  }

  clickEditar(user: any): void{
    this.service.clickEditar(user);
  }
}
