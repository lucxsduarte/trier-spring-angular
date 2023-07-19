import { Component } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service';
import { Campeonato } from '../../models/campeonato';

@Component({
  selector: 'app-campeonato-table',
  templateUrl: './campeonato-table.component.html',
  styleUrls: ['./campeonato-table.component.scss']
})
export class CampeonatoTableComponent {

  constructor(private service: CampeonatoService){}

  public listaExibida : Campeonato[] = [];

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.listaExibida = data;
    });

  }

  clickEditar(campeonato: Campeonato) {
    this.service.clickEditar(campeonato);
  }

  clickDeletar(campeonato: Campeonato) {
    this.service.delete(campeonato).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.listaExibida = data;
      });
    });
  } 
}
