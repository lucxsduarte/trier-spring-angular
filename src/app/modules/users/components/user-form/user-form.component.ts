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
  public filtroVisivel = false;
  public cadastroVisivel = true;
  public nomeFiltro: string | undefined;

  constructor(private service: UserServiceService){}

  public toggleFiltro() {
    this.filtroVisivel = !this.filtroVisivel;
    this.cadastroVisivel = false;
  }

  public toggleCadastro() {
    this.cadastroVisivel = !this.cadastroVisivel;
    this.filtroVisivel = false;
  }

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
