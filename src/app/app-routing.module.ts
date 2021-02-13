import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
import {CvEditModelComponent} from './components/cv-edit-model/cv-edit-model.component';
const routes: Routes = [

  { path: '', component: LoginComponent },

  { path: 'registration', component: RegistrationComponent },

  { path: 'edit_page', component: CvEditModelComponent},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
