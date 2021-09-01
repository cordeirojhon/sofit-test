import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) }, { path: 'management', loadChildren: () => import('./modules/management/management.module').then(m => m.ManagementModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
