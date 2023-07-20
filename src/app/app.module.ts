import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { HomeModule } from './modules/home/home.module';
import { UsersModule } from './modules/users/users.module';
import { MenuModule } from './modules/menu/menu.module';
import { FormsModule } from '@angular/forms';
import { PaisesModule } from './modules/paises/paises.module';
import { EquipesModule } from './modules/equipes/equipes.module';
import { CampeonatosModule } from './modules/campeonatos/campeonatos.module';
import { PistasModule } from './modules/pistas/pistas.module';
import { PilotosModule } from './modules/pilotos/pilotos.module';
import { CorridasModule } from './modules/corridas/corridas.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    UsersModule,
    MenuModule,
    PaisesModule,
    EquipesModule,
    CampeonatosModule,
    PistasModule,
    PilotosModule,
    CorridasModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
