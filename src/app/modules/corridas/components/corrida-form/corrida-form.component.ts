import { Component } from '@angular/core';
import { CorridaService } from '../../services/corrida.service';
import { PistaService } from 'src/app/modules/pistas/services/pista.service';
import { CampeonatoService } from 'src/app/modules/campeonatos/services/campeonato.service';
import { Corrida } from '../../model/corrida';
import { Campeonato } from 'src/app/modules/campeonatos/models/campeonato';
import { Pista } from 'src/app/modules/pistas/model/pista';

@Component({
  selector: 'app-corrida-form',
  templateUrl: './corrida-form.component.html',
  styleUrls: ['./corrida-form.component.scss']
})
export class CorridaFormComponent {

  public corrida = {} as Corrida;
  public pistas: Pista[] = [];
  public campeonatos: Campeonato[] = [];
  public filtroVisivel = false;
  public cadastroVisivel = true;
  public dataFiltro: string | undefined;
  public pistaFiltro: number | undefined;
  public campeonatoFiltro: number | undefined;

  constructor(private service: CorridaService, private pistaService: PistaService, private campService: CampeonatoService ){}

  public toggleFiltro() {
    this.filtroVisivel = !this.filtroVisivel;
    this.cadastroVisivel = false;
  }

  public toggleCadastro() {
    this.cadastroVisivel = !this.cadastroVisivel;
    this.filtroVisivel = false;
  }

  public filtrarPista(){
    this.service.filtrarPorPista(this.corrida.pista);
  }

  public filtrarData() {
    this.service.filtrarPorData(this.corrida.data);
  }

  public filtrarCampeonato() {
    this.service.filtrarPorCampeonato(this.corrida.campeonato);
  }

  public insert(){

    if(!this.corrida.pista){
      alert("Selecione uma pista antes de salvar");
      return
    }

    const pistaSelecionado = this.pistas.find(pistaEscolhida => pistaEscolhida === this.corrida.pista);
    if(pistaSelecionado) {
      this.corrida.pista = pistaSelecionado;
    }else {
      alert("Pista selecionada inválida");
      return;
    }

    if(!this.corrida.campeonato){
      alert("Selecione um campeonato antes de salvar");
      return
    }

    const campSelecionado = this.campeonatos.find(campeonatoEscolhido => campeonatoEscolhido === this.corrida.campeonato);
    if(campSelecionado) {
      this.corrida.campeonato = campSelecionado;
    }else {
      alert("Campeonato selecionado inválido");
      return;
    }


    if(this.corrida.id) {
      this.service.edit(this.corrida).subscribe((data) => {
        console.log(data);
      })
    } else {
      this.service.insert(this.corrida).subscribe((data) => {
        console.log(data);
      });
    }
    this.corrida = {} as Corrida;
  }

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((corrida: Corrida) => {
      this.corrida = corrida;
    });

    this.pistaService.listAll().subscribe((pistas: Pista[]) => {
      this.pistas = pistas;
    })
  }
}
