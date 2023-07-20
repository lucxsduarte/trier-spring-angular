import { Component } from '@angular/core';
import { Pais } from '../../models/pais';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-form',
  templateUrl: './pais-form.component.html',
  styleUrls: ['./pais-form.component.scss']
})
export class PaisFormComponent {

  public pais = {} as Pais;
  public filtroVisivel = false;
  public cadastroVisivel = true;

  constructor(private service: PaisService){}

  public toggleFiltro() {
    this.filtroVisivel = !this.filtroVisivel;
    this.cadastroVisivel = false;
  }

  public toggleCadastro() {
    this.cadastroVisivel = !this.cadastroVisivel;
    this.filtroVisivel = false;
  }

  public filtrarNome() {
    this.service.filtrarPorNome(this.pais.name);
  }

  public insert(){
    if(this.pais.id) {
      this.service.edit(this.pais).subscribe((data) => {
        console.log(data);
      })
    } else {
      this.service.insert(this.pais).subscribe((data) => {
        console.log(data);
      });
    }
    this.pais = {} as Pais;
  }

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((pais: Pais) => {
      this.pais = pais;
    });
  }
}
