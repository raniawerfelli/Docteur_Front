import { Component } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { Route, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-medecin',
  standalone: true,
  imports: [CommonModule,MatDatepickerModule,MatFormFieldModule,ReactiveFormsModule,FormsModule, MatNativeDateModule],
  templateUrl: './medecin.component.html',
  providers:[DatePipe],
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent {
  nomPrenom!:any
  nbrePatient!:any
  observation: string = ''
  rendez_vous!:any
  nbreDemande!:any
  constructor(private route:Router,private service:AuthService,private datePipe: DatePipe){
    var id = localStorage.getItem('user_id');
    const role=localStorage.getItem('role')
    if(role!="medecin"){
      this.route.navigate(["/login"])
    }
    if (id !== null) {
      console.log("email"+id)
      this.getMedecin(id);
    } else {
     
     console.log('La valeur est null.');
    }
    
}
formatDate(date: Date): string {
  return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
}
getMedecin(email:any){
  this.service.getMedecin(email).subscribe((data)=>{
    this.nomPrenom=data.nom+" "+data.prenom
    this.getAcceptedRendezvous(data.id)
    this.getAllPatient(data.id)
    this.getNbrePatient(data.id)
    this.getDemande(data.id)
  }),
  (error: HttpErrorResponse)=>{
console.log(error.message)
  }
}
saveNote(id:any) {
  if (!this.observation.trim()) {
    console.log('Observation is empty');
    return;
  }
  console.log("yess")
  this.service.creerObservation(id, this.observation).subscribe(
    (data) => {
      console.log('Observation saved successfully:', data);
    },
    (error: HttpErrorResponse) => {
      console.error('Error while saving observation:', error.message);
    }
  );
}
deconnecter(){
  localStorage.clear()
  this.route.navigate(["/login"])
}
getAcceptedRendezvous(id:any){
  this.service.getByDateAndValidation(id).subscribe((data)=>{
    console.log(data)
    this.rendez_vous = data;
  },
  (e:HttpErrorResponse)=>{
    console.log(e.message)
  })
}
getAllPatient(id:number){
  this.service.getAllPatientExamine(id).subscribe((data)=>{
    console.log(data)

  },
  (e:HttpErrorResponse)=>{
    console.log(e.message)
  })
}
getNbrePatient(id:any){
  this.service.getNbrePatient(id).subscribe((data)=>{
    console.log(data)
this.nbrePatient=data

  },
  (e:HttpErrorResponse)=>{
    console.log(e.message)
  })
}
getDemande(id:any){
  this.service.getRendezvousWithValidationAttenteForMedecin(id).subscribe((data)=>{
    console.log(data)
this.nbreDemande=data.length

  },
  (e:HttpErrorResponse)=>{
    console.log(e.message)
  })
}
  }


