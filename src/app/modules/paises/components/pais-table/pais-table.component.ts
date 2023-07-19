import { Component, OnInit } from '@angular/core';
import { Pais } from '../../models/pais';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-table',
  templateUrl: './pais-table.component.html',
  styleUrls: ['./pais-table.component.scss']
})
export class PaisTableComponent implements OnInit{

  constructor(private service: PaisService){}

  public listaExibida : Pais[] = [];

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.listaExibida = data;
    });

  }

  clickEditar(pais: Pais) {
    this.service.clickEditar(pais);
  }

  clickDeletar(pais: Pais) {
    this.service.delete(pais).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.listaExibida = data;
      });
    });
  } 
}
