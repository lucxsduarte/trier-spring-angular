import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-services/user-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit{

  public user = {} as User;

  constructor(private service: UserServiceService){}

  public filtrarNome() {
    this.service.filtrarPorNome(this.user.name);
  }

  public insertUser(){
    if(this.user.id) {
      this.service.editUser(this.user).subscribe((data) => {
        console.log(data);
      })
    } else {
      this.service.insertUser(this.user).subscribe((data) => {
        console.log(data);
      });
    }
    this.user = {} as User;
  }

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((user: User) => {
      this.user = user;
    });
  }
}
