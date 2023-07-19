import { Component } from '@angular/core';
import { Campeonato } from '../../models/campeonato';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-campeonato-form',
  templateUrl: './campeonato-form.component.html',
  styleUrls: ['./campeonato-form.component.scss']
})
export class CampeonatoFormComponent {

  public campeonato = {} as Campeonato;

  constructor(private service: CampeonatoService){}

  public filtrarPorDesc() {
    this.service.filtrarPorDesc(this.campeonato.description);
  }

  public insert(){
    if(this.campeonato.id) {
      this.service.edit(this.campeonato).subscribe((data) => {
        console.log(data);
      })
    } else {
      this.service.insert(this.campeonato).subscribe((data) => {
        console.log(data);
      });
    }
    this.campeonato = {} as Campeonato;
  }

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((campeonato: Campeonato) => {
      this.campeonato = campeonato;
    });
  }
}
