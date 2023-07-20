import { Component } from '@angular/core';
import { CorridaService } from '../../services/corrida.service';
import { CorridaDTO } from '../../model/corrida-dto';

@Component({
  selector: 'app-corrida-table',
  templateUrl: './corrida-table.component.html',
  styleUrls: ['./corrida-table.component.scss']
})
export class CorridaTableComponent {

  public listaExibida : CorridaDTO[] = [];

  constructor(private service: CorridaService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.listaExibida = data;
    });

  }

  clickDeletar(corrida: CorridaDTO) {
    this.service.delete(corrida).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.listaExibida = data;
      });
    });
  } 

  clickEditar(corrida: CorridaDTO) {
    this.service.clickEditar(corrida);
  }
}
