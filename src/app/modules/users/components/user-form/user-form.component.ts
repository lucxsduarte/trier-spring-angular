import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-services/user-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit{

  public name: string = "";
  public email: string = "";
  public password: string = "";
  public roles: string = "";
  public filtraNome: User[] = [];

  constructor(private service: UserServiceService){}

  public filtrarNome() {
    this.service.filtrarPorNome(this.name);
  }

  ngOnInit(): void {
    
    this.service.emitName.subscribe((nome: string) =>{
      this.name = nome;
    });

    this.service.emitEmail.subscribe((email: string) =>{
      this.email = email;
    });

    this.service.emitPassword.subscribe((password: string) =>{
      this.password = password;
    });

    this.service.emitRoles.subscribe((roles: string) =>{
      this.roles = roles;
    });
  
  }
}
