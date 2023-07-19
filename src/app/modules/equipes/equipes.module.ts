import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipeComponent } from './components/equipe/equipe.component';
import { EquipeFormComponent } from './components/equipe-form/equipe-form.component';
import { EquipeTableComponent } from './components/equipe-table/equipe-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EquipeComponent,
    EquipeFormComponent,
    EquipeTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EquipeComponent
  ]
})
export class EquipesModule { }
