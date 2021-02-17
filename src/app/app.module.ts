import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CvEditModelComponent } from './components/cv-edit-model/cv-edit-model.component';
import { CvViewModelComponent } from './components/cv-view-model/cv-view-model.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { JobComponent } from './components/job/job.component';
import { EducationComponent } from './components/education/education.component';
import { LinkComponent } from './components/link/link.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    CvEditModelComponent,
    CvViewModelComponent,
    ErrorPageComponent,
    LoginComponent,
    JobComponent,
    EducationComponent,
    LinkComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
