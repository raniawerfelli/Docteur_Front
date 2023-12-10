import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SignupMedecinComponent } from './signup-medecin/signup-medecin.component';
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { PatientComponent } from './patient/patient.component';
import { MedecinComponent } from './medecin/medecin.component';
import { ListePatientComponent } from './liste-patient/liste-patient.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { ListeDocteursComponent } from './liste-docteurs/liste-docteurs.component';
import { MrdvComponent } from './mrdv/mrdv.component';
import { FormulairerdvComponent } from './formulairerdv/formulairerdv.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { ListeAttenteComponent } from './liste-attente/liste-attente.component';
import { LesAcceptesRendezvousComponent } from './les-acceptes-rendezvous/les-acceptes-rendezvous.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'home',component:HomeComponent},
    {path:'signup',component:SignupComponent},
    {path:'signup-medecin',component:SignupMedecinComponent},
    {path:'signup-patient',component:SignupPatientComponent},
    {path:'patient',component:PatientComponent},
    {path:'medecin',component:MedecinComponent},
    {path:'liste',component:ListePatientComponent},
    {path:'rendezvous',component:RendezVousComponent},
    {path:'patient',component:PatientComponent},
     {path:'listdoc',component:ListeDocteursComponent},
     {path:'mrdv',component:MrdvComponent},
     {path:'formulaire',component:FormulairerdvComponent},
     {path:'calendar',component:CalendarComponent},
     {path:'login',component:LoginComponent},
     {path:'listeattente',component:ListeAttenteComponent},
     {path:'lesAcceptes',component:LesAcceptesRendezvousComponent},
];
