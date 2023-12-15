import { Component } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-liste-patient',
  standalone: true,
  imports: [CommonModule],
  providers:[DatePipe],
  templateUrl: './liste-patient.component.html',
  styleUrl: './liste-patient.component.css'
})
export class ListePatientComponent {
  email!:any
  nomPrenom!:any
  patients!:any
  patientsExamine!:any
  constructor(private route:Router,private datepipe:DatePipe,private service:AuthService){

  }
 ngOnInit(): void {
    this.email = localStorage.getItem('user_id');
    const role=localStorage.getItem('role')
    if(role!="medecin"){
      this.route.navigate(["/login"])
    }
    if (this.email !== null) {
      this.getMedecin(this.email);
    } else {
      console.log('La valeur est null.');
    }
  }

  getMedecin(email: any) {
    this.service.getMedecin(email).subscribe(
      (data) => {
        this.nomPrenom = data.nom + ' ' + data.prenom;
        this.getAllPatientForMedecin(data.id)
        this.getAllPatientExamine(data.id)
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  formatDate(date: Date): string {
    return this.datepipe.transform(date, 'yyyy-MM-dd') || '';
  }
  getAllPatientForMedecin(id:any){
    this.service.getAllPatientForMedecin(id).subscribe(
      (data) => {
        console.log(data)
        this.patients=data
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  getAllPatientExamine(id:any){
    this.service.getAllPatientExamine(id).subscribe(
      (data) => {
        console.log("data",data)
        this.patientsExamine=data
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  deconnecter(){
    localStorage.clear()
    this.route.navigate(["/home"])
  }

}
