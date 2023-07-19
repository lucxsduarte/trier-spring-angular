import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { UserComponent } from './modules/users/components/user/user.component';
import { PaisComponent } from './modules/paises/components/pais/pais.component';
import { EquipeComponent } from './modules/equipes/components/equipe/equipe.component';
import { CampeonatoComponent } from './modules/campeonatos/components/campeonato/campeonato.component';
import { PistaComponent } from './modules/pistas/components/pista/pista.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'usuarios', component: UserComponent},
  {path: 'pais', component: PaisComponent},
  {path: 'equipe', component: EquipeComponent},
  {path: 'campeonato', component: CampeonatoComponent},
  {path: 'pista', component: PistaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
