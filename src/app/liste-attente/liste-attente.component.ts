import { Component } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { Rendezvous } from '../model/rendezvous';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-liste-attente',
  standalone: true,
  imports: [CommonModule],
  providers:[DatePipe],
  templateUrl: './liste-attente.component.html',
  styleUrl: './liste-attente.component.css'
})
export class ListeAttenteComponent {
  rendez_vous: Rendezvous[] = [];
  nomPrenom: any;
  email: any;
  constructor(private service: AuthService, private datePipe: DatePipe,private router:Router) {} // Use DatePipe here

  ngOnInit(): void {
    this.email = localStorage.getItem('user_id');
    const role=localStorage.getItem('role');
    if(role!="medecin"){
      this.router.navigate(["/login"])
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
        this.getAcceptedRendezvous(data.id);
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
  getAcceptedRendezvous(id:any){
    this.service.getByDateAndValidation(id).subscribe((data)=>{
      console.log(data)
      this.rendez_vous = data;
    },
    (e:HttpErrorResponse)=>{
      console.log(e.message)
    })
  }
  deconncter(){
localStorage.clear();
this.router.navigate(["/home"])
  }
}
