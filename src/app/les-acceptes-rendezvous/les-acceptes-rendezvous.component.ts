import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Rendezvous } from '../model/rendezvous';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-les-acceptes-rendezvous',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './les-acceptes-rendezvous.component.html',
  styleUrl: './les-acceptes-rendezvous.component.css'
})
export class LesAcceptesRendezvousComponent {
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
        this.getLesAcceptes(data.id)
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
getLesAcceptes(id:any){
  this.service.getRendezvousWithValidationAccepteForMedecin(id).subscribe(
    (data) => {
      console.log(data)
      this.rendez_vous=data
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  );
}
formatDate(date: Date): string {
  return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
}
}
