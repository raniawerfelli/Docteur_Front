import { Component } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-mrdv',
  standalone: true,
  imports: [CommonModule],
  providers:[DatePipe],
  templateUrl: './mrdv.component.html',
  styleUrl: './mrdv.component.css'
})
export class MrdvComponent {
  nomPrenom!:any
  rendezvous!:any
constructor(private route:Router,private service:AuthService,private dataPipe:DatePipe){
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
    this.getAllRendezvous(data.id)
  }),
  (error: HttpErrorResponse)=>{
console.log(error.message)
  }
}
getAllRendezvous(id:any){
  this.service.getllRendezvousForPatient(id).subscribe((data)=>{
    this.rendezvous=data
  }),
  (error: HttpErrorResponse)=>{
console.log(error.message)
  }
}
formatDate(date: Date): string {
  return this.dataPipe.transform(date, 'yyyy-MM-dd') || '';
}
deconnecter(){
  localStorage.clear()
  this.route.navigate(["/home"])
}
}
