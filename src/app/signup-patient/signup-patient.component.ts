import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-patient',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './signup-patient.component.html',
  styleUrl: './signup-patient.component.css'
})
export class SignupPatientComponent {
form!: FormGroup 
constructor(private fb: FormBuilder,private service:AuthService,private route:Router){
  this.form = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', Validators.required],
    genre: ['', Validators.required],
    mdp:['',Validators.required],
    date_de_naissance:['',Validators.required]
  });
  const user: string | null = localStorage.getItem('user');
    if (user !== null) {
      const medecin = JSON.parse(user);
      this.form.value.nom=medecin.nom
      this.form.value.prenom=medecin.prenom
    } else {
     
     console.log('La valeur est null.');
    }
}
onSubmit(){
  if(this.form.valid){
    this.form.value.role="patient"
    this.ajouterPatient()
console.log(this.form.value)
}else{
  alert("les donnes sont fausses")
}
}
ajouterPatient(){
  this.service.addPatient(this.form.value).subscribe((data)=>{

  }),
  (e:HttpErrorResponse)=>{
    console.log(e.message)
  }
}
}
