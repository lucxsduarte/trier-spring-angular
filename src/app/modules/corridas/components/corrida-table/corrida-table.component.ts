import { Component } from '@angular/core';
import { Corrida } from '../../model/corrida';
import { CorridaService } from '../../services/corrida.service';

@Component({
  selector: 'app-corrida-table',
  templateUrl: './corrida-table.component.html',
  styleUrls: ['./corrida-table.component.scss']
})
export class CorridaTableComponent {

  public listaExibida : Corrida[] = [];

  constructor(private service: CorridaService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.listaExibida = data;
    });

  }

  clickDeletar(corrida: Corrida) {
    this.service.delete(corrida).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.listaExibida = data;
      });
    });
  } 

  clickEditar(corrida: Corrida) {
    this.service.clickEditar(corrida);
  }
}
