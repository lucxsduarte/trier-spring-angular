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

  public listaExibida : User[] = [];
  
  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.listaExibida = data;
    });

  }

  clickEditar(user: User, index: number) {
    this.service.clickEditar(user);
    this.service.editingUser = user;
  }

  clickDeletar(user: User) {
    this.service.deleteUser(user).subscribe(() => {
      this.service.getUsers().subscribe((data) => {
        this.listaExibida = data;
      });
    });
  } 
}
