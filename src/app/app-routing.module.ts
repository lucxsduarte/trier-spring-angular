import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { UserComponent } from './modules/users/components/user/user.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'usuarios', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
