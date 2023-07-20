import { Component } from '@angular/core';
import { PilotoService } from '../../services/piloto.service';
import { Pais } from 'src/app/modules/paises/models/pais';
import { Equipe } from 'src/app/modules/equipes/models/equipe';
import { PaisService } from 'src/app/modules/paises/services/pais.service';
import { EquipeService } from 'src/app/modules/equipes/services/equipe.service';
import { PilotoDTO } from '../../model/piloto-dto';

@Component({
  selector: 'app-piloto-form',
  templateUrl: './piloto-form.component.html',
  styleUrls: ['./piloto-form.component.scss']
})
export class PilotoFormComponent {

  public piloto = {} as PilotoDTO;
  public paises: Pais[] = [];
  public equipes: Equipe[] = [];
  public filtroVisivel = false;
  public cadastroVisivel = true;
  public paisFiltro: number | undefined;
  public equipeFiltro: number | undefined;

  constructor(private service: PilotoService, private paisService: PaisService, private equipeService: EquipeService){}

  public toggleFiltro() {
    this.filtroVisivel = !this.filtroVisivel;
    this.cadastroVisivel = false;
  }

  public toggleCadastro() {
    this.cadastroVisivel = !this.cadastroVisivel;
    this.filtroVisivel = false;
  }

  public filtrarPais(){
    this.service.filtrarPorPais(this.piloto.id_pais);
  }

  public filtrarNome() {
    this.service.filtrarPorNome(this.piloto.name);
  }

  public filtrarEquipe() {
    this.service.filtrarPorEquipe(this.piloto.id_equipe);
  }

  public insert(){

    if(!this.piloto.id_equipe){
      alert("Selecione uma equipe antes de salvar");
      return
    }

    const equipeSelecionada = this.equipes.find(equipeEscolhida => equipeEscolhida.id === this.piloto.id_equipe);
    if(equipeSelecionada) {
      this.piloto.id_equipe = equipeSelecionada.id;
    }else {
      alert("Equipe selecionada inválida");
      return;
    }

    if(!this.piloto.id_pais){
      alert("Selecione um país antes de salvar");
      return
    }

    const paisSelecionado = this.paises.find(paisEscolhido => paisEscolhido.id === this.piloto.id_pais);
    if(paisSelecionado) {
      this.piloto.id_pais = paisSelecionado.id;
    }else {
      alert("País selecionado inválido");
      return;
    }


    if(this.piloto.id) {
      this.service.edit(this.piloto).subscribe((data) => {
        console.log(data);
      })
    } else {
      this.service.insert(this.piloto).subscribe((data) => {
        console.log(data);
      });
    }
    this.piloto = {} as PilotoDTO;
  }

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((piloto: PilotoDTO) => {
      this.piloto = piloto;
    });

    this.paisService.listAll().subscribe((paises: Pais[]) => {
      this.paises = paises;
    });

    this.equipeService.listAll().subscribe((equipes: Equipe[]) => {
      this.equipes = equipes;
    });
  }
}
