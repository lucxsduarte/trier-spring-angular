import { Component } from '@angular/core';
import { CorridaService } from '../../services/corrida.service';
import { PistaService } from 'src/app/modules/pistas/services/pista.service';
import { CampeonatoService } from 'src/app/modules/campeonatos/services/campeonato.service';
import { Campeonato } from 'src/app/modules/campeonatos/models/campeonato';
import { Pista } from 'src/app/modules/pistas/model/pista';
import { CorridaDTO } from '../../model/corrida-dto';

@Component({
  selector: 'app-corrida-form',
  templateUrl: './corrida-form.component.html',
  styleUrls: ['./corrida-form.component.scss']
})
export class CorridaFormComponent {

  public corrida = {} as CorridaDTO;
  public pistas: Pista[] = [];
  public campeonatos: Campeonato[] = [];
  public filtroVisivel = false;
  public cadastroVisivel = true;
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
    this.service.filtrarPorPista(this.corrida.id_pista);
  }

  public filtrarData() {
    const [ano, mes, dia] = this.corrida.data.split('-');
    const dataFormatada =  `${dia}-${mes}-${ano}`;
    this.service.filtrarPorData(dataFormatada);
  }

  public filtrarCampeonato() {
    this.service.filtrarPorCampeonato(this.corrida.id_campeonato);
  }

  public insert(){

    const [ano, mes, dia] = this.corrida.data.split('-');
    const dataFormatada =  `${dia}-${mes}-${ano}`;
    this.corrida.data = dataFormatada;

    if(!this.corrida.id_pista){
      alert("Selecione uma pista antes de salvar");
      return
    }

    const pistaSelecionado = this.pistas.find(pistaEscolhida => pistaEscolhida.id === this.corrida.id_pista);
    if(pistaSelecionado) {
      this.corrida.id_pista = pistaSelecionado.id;
    }else {
      alert("Pista selecionada inválida");
      return;
    }

    if(!this.corrida.id_campeonato){
      alert("Selecione um campeonato antes de salvar");
      return
    }

    const campSelecionado = this.campeonatos.find(campeonatoEscolhido => campeonatoEscolhido.id === this.corrida.id_campeonato);
    if(campSelecionado) {
      this.corrida.id_campeonato = campSelecionado.id;
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
    this.corrida = {} as CorridaDTO;
  }

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((corrida: CorridaDTO) => {
      this.corrida = corrida;
    });

    this.pistaService.listAll().subscribe((pistas: Pista[]) => {
      this.pistas = pistas;
    });

    this.campService.listAll().subscribe((camp: Campeonato[]) => {
      this.campeonatos = camp;
    });

  }
}
