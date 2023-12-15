import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Rendezvous } from '../model/rendezvous';
import { CommonModule, DatePipe } from '@angular/common'; // Import DatePipe instead of DataPipe
import { Router } from '@angular/router';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css'],
  standalone:true,
  imports:[CommonModule],
  providers: [DatePipe] // Add DatePipe to the providers array
})
export class RendezVousComponent implements OnInit {
  rendez_vous: Rendezvous[] = [];
  nomPrenom: any;
  email: any;

  constructor(private service: AuthService, private datePipe: DatePipe,private route:Router) {} // Use DatePipe here

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
        this.getListRendezvous(data.id);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  getListRendezvous(id: any) {
    this.service.getRendezvousWithValidationAttenteForMedecin(id).subscribe(
      (data: Rendezvous[]) => {
        console.log("Liste des rendez-vous:", data);
        this.rendez_vous = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
  accepterRendezVous(r:Rendezvous){
    this.service.accepterRendezvous(r).subscribe((data)=>{
      console.log(data);
      this.getMedecin(this.email)
    },
    (e:HttpErrorResponse)=>{
      if(e.status===200){
        this.getMedecin(this.email)
      }
    })

  }
  deconnecter(){
    localStorage.clear()
    this.route.navigate(["/home"])
  }
  refuserRendezVous(r:any){
    this.service.annulerRendezvous(r).subscribe((data)=>{
      console.log(data);
      this.getMedecin(this.email)
    },
    (e:HttpErrorResponse)=>{
      if(e.status===200){
        this.getMedecin(this.email)
      }
    })

  }
}
