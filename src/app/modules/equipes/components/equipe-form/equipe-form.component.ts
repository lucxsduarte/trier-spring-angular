import { Component } from '@angular/core';
import { Equipe } from '../../models/equipe';
import { EquipeService } from '../../services/equipe.service';

@Component({
  selector: 'app-equipe-form',
  templateUrl: './equipe-form.component.html',
  styleUrls: ['./equipe-form.component.scss']
})
export class EquipeFormComponent {

  public equipe = {} as Equipe;
  public filtroVisivel = false;
  public cadastroVisivel = true;

  constructor(private service: EquipeService){}

  public toggleFiltro() {
    this.filtroVisivel = !this.filtroVisivel;
    this.cadastroVisivel = false;
  }

  public toggleCadastro() {
    this.cadastroVisivel = !this.cadastroVisivel;
    this.filtroVisivel = false;
  }

  public filtrarNome() {
    this.service.filtrarPorNome(this.equipe.name);
  }

  public insert(){
    if(this.equipe.id) {
      this.service.edit(this.equipe).subscribe((data) => {
        console.log(data);
      })
    } else {
      this.service.insert(this.equipe).subscribe((data) => {
        console.log(data);
      });
    }
    this.equipe = {} as Equipe;
  }

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((equipe: Equipe) => {
      this.equipe = equipe;
    });
  }
}
