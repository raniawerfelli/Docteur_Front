import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Specialite } from '../model/specialite';

@Component({
  selector: 'app-liste-docteurs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-docteurs.component.html',
  styleUrl: './liste-docteurs.component.css'
})
export class ListeDocteursComponent {
  medecin!:any
  nomPrenom!:any
  specialites:Specialite[]=[]
constructor(private route:Router,private service:AuthService){
  this.getAllMedecin()
  var id = localStorage.getItem('user_id');
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
}),
(error: HttpErrorResponse)=>{
console.log(error.message)
}
}
getAllMedecin(){
  this.service.getAllMedecin().subscribe((data)=>{
      console.log(data);
      this.medecin = data;
    
      for (let medecin of this.medecin) {
        if (medecin.specialites && medecin.specialites.length > 0) {
          console.log("Spécialités :");
          for (let specialite of medecin.specialites) {
            this.specialites.push(specialite)
          }
        } else {
          console.log("Aucune spécialité pour ce médecin");
        }
      }
    });
  (e:HttpErrorResponse)=>{
    console.log(e.message)
  }
}
deconnecter(){
  localStorage.clear()
  this.route.navigate(["/home"])
}
}
