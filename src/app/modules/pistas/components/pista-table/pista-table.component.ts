import { Component, OnInit } from '@angular/core';
import { Pista } from '../../model/pista';
import { PistaService } from '../../services/pista.service';

@Component({
  selector: 'app-pista-table',
  templateUrl: './pista-table.component.html',
  styleUrls: ['./pista-table.component.scss']
})
export class PistaTableComponent implements OnInit{

  public listaExibida : Pista[] = [];

  constructor(private service: PistaService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.listaExibida = data;
    });

  }

  clickDeletar(pista: Pista) {
    this.service.delete(pista).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.listaExibida = data;
      });
    });
  } 

  clickEditar(pista: Pista) {
    this.service.clickEditar(pista);
  }
}
