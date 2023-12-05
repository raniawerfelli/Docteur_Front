import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Patient } from '../model/patient';

@Component({
  selector: 'app-signup-patient',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './signup-patient.component.html',
  styleUrl: './signup-patient.component.css'
})
export class SignupPatientComponent {
form!: FormGroup 
user_patient:any={
  nom:'',
  prenom:''
}
constructor(private fb: FormBuilder,private service:AuthService,private route:Router){
  this.form = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required,Validators.pattern(/^[0-9]{8}$/)]],
    genre: ['', Validators.required],
    mdp:['',[Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/)]],
    date_de_naissance:['',Validators.required]
  });
  const user: string | null = localStorage.getItem('user');
  console.log(user)

  if (user !== null) {
      const patient = JSON.parse(user);
      this.user_patient.nom=patient.nom
      this.user_patient.prenom=patient.prenom
    
    } else {
     
     console.log('La valeur est null.');
    }
}
onSubmit(){
  if(this.form.valid){
    this.form.value.role="patient"
    this.ajouterPatient()
    this.route.navigate(["/login"])
console.log(this.form.value)
}else{
  Object.keys(this.form.controls).forEach(field => {
    const control = this.form.get(field);
    if (control && !control.valid) {
      const fieldName = field
      alert(`Le champ ${fieldName} n'est pas valide.`);
    }
  });
}
}
ajouterPatient(){
  this.service.addPatient(this.form.value).subscribe((data)=>{
    console.log(data)
  },
  (error:HttpErrorResponse)=>{
    if(error.status===409){
      alert("patient exist deja")
    }
  }
)}
}
