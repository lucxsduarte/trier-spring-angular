import { Component } from '@angular/core';
import { Piloto } from '../../model/piloto';
import { PilotoService } from '../../services/piloto.service';
import { PilotoDTO } from '../../model/piloto-dto';

@Component({
  selector: 'app-piloto-table',
  templateUrl: './piloto-table.component.html',
  styleUrls: ['./piloto-table.component.scss']
})
export class PilotoTableComponent {

  public listaExibida : PilotoDTO[] = [];

  constructor(private service: PilotoService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.listaExibida = data;
    });

  }

  clickDeletar(piloto: PilotoDTO) {
    this.service.delete(piloto).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.listaExibida = data;
      });
    });
  } 

  clickEditar(piloto: PilotoDTO) {
    this.service.clickEditar(piloto);
  }
}
