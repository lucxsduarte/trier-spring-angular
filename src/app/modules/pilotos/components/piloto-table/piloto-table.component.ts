import { Component } from '@angular/core';
import { Piloto } from '../../model/piloto';
import { PilotoService } from '../../services/piloto.service';

@Component({
  selector: 'app-piloto-table',
  templateUrl: './piloto-table.component.html',
  styleUrls: ['./piloto-table.component.scss']
})
export class PilotoTableComponent {

  public listaExibida : Piloto[] = [];

  constructor(private service: PilotoService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.listaExibida = data;
    });

  }

  clickDeletar(piloto: Piloto) {
    this.service.delete(piloto).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.listaExibida = data;
      });
    });
  } 

  clickEditar(piloto: Piloto) {
    this.service.clickEditar(piloto);
  }
}
