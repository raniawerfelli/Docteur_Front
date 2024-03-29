import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarCommonModule } from 'angular-calendar/modules/calendar.module';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { error } from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
nomPrenom!:any
etat!:any
  constructor(private route:Router,private service:AuthService){
    var id = localStorage.getItem('user_id');
    const role=localStorage.getItem('role')
    if(role!="patient"){
      this.route.navigate(["/login"])
    }
    if (id !== null) {
      console.log("email"+id)
      this.getPatient(id);
    } else {
     
     console.log('La valeur est null.');
    }
}
getPatient(email:any){
  this.service.getPatient(email).subscribe((data)=>{
    this.nomPrenom=data.nom+" "+data.prenom
    this.getRendezVous(data.id)
  }),
  (error: HttpErrorResponse)=>{
console.log(error.message)
  }
}
getRendezVous(id:any){
  this.service.getllRendezvousForPatient(id).subscribe((data)=>{
    console.log("data",data[data.length-1].validation)
    console.log(data.length)
    this.etat=data[data.length-1].validation
  }),
  (error: HttpErrorResponse)=>{
console.log(error.message)
  }

}
deconnecter(){
  localStorage.clear()
  this.route.navigate(["/home"])
}
}
