import { Component } from '@angular/core';
import { EquipeService } from '../../services/equipe.service';
import { Equipe } from '../../models/equipe';

@Component({
  selector: 'app-equipe-table',
  templateUrl: './equipe-table.component.html',
  styleUrls: ['./equipe-table.component.scss']
})
export class EquipeTableComponent {

  constructor(private service: EquipeService){}

  public listaExibida : Equipe[] = [];

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.listaExibida = data;
    });

  }

  clickEditar(equipe: Equipe) {
    this.service.clickEditar(equipe);
  }

  clickDeletar(equipe: Equipe) {
    this.service.delete(equipe).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.listaExibida = data;
      });
    });
  } 
}
