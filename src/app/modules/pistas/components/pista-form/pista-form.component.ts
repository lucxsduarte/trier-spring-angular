import { Component } from '@angular/core';
import { Pista } from '../../model/pista';
import { PistaService } from '../../services/pista.service';
import { Pais } from 'src/app/modules/paises/models/pais';
import { PaisService } from 'src/app/modules/paises/services/pais.service';

@Component({
  selector: 'app-pista-form',
  templateUrl: './pista-form.component.html',
  styleUrls: ['./pista-form.component.scss']
})
export class PistaFormComponent {

  public pista = {} as Pista;
  public paises: Pais[] = [];
  public filtroVisivel = false;
  public cadastroVisivel = false;
  public tamanhoFiltro: number | undefined;
  public paisFiltro: number | undefined;
  public tamanhoInicial: number | undefined;
  public tamanhoFinal: number | undefined;

  constructor(private service: PistaService, private paisService: PaisService){}

  public toggleFiltro() {
    this.filtroVisivel = !this.filtroVisivel;
    this.cadastroVisivel = false;
  }

  public toggleCadastro() {
    this.cadastroVisivel = !this.cadastroVisivel;
    this.filtroVisivel = false;
  }

  public filtrarPais(){
    this.service.filtrarPorPais(this.pista.pais);
  }

  public filtrarTamanho() {
    this.service.filtrarPorTamanho(this.pista.tamanho);
  }

  public filtrarPorTamanhoEntre() {
    if (!this.tamanhoInicial || !this.tamanhoFinal) {
      alert('Digite ambos os tamanhos antes de buscar.');
      return;
    }

    this.service.filtrarPorTamanhoEntre(this.tamanhoInicial, this.tamanhoFinal);
  }

  public insert(){

    if(!this.pista.pais){
      alert("Selecione um país antes de salvar");
      return
    }

    const paisSelecionado = this.paises.find(paisEscolhido => paisEscolhido === this.pista.pais);
    if(paisSelecionado) {
      this.pista.pais = paisSelecionado;
    }else {
      alert("País selecionado inválido");
      return;
    }


    if(this.pista.id) {
      this.service.edit(this.pista).subscribe((data) => {
        console.log(data);
      })
    } else {
      this.service.insert(this.pista).subscribe((data) => {
        console.log(data);
      });
    }
    this.pista = {} as Pista;
  }

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((pista: Pista) => {
      this.pista = pista;
    });

    this.paisService.listAll().subscribe((paises: Pais[]) => {
      this.paises = paises;
    })
  }
}
