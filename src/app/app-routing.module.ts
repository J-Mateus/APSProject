import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DenunciarComponent } from './pages/denunciar/denunciar.component';
import { HomeComponent } from './pages/home/home.component';

import { LoginComponent } from './pages/login/login.component';
import { SobreComponent } from './pages/sobre/sobre.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sobre',
    component: SobreComponent
  },
  {
    path: 'denunciar',
    component: DenunciarComponent
  } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}