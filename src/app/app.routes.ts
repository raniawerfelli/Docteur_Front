import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupMedecinComponent } from './signup-medecin/signup-medecin.component';
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { PatientComponent } from './patient/patient.component';
import { MedecinComponent } from './medecin/medecin.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'signup-medecin',component:SignupMedecinComponent},
    {path:'signup-patient',component:SignupPatientComponent},
    {path:'patient',component:PatientComponent},
    {path:'medecin',component:MedecinComponent}
];
