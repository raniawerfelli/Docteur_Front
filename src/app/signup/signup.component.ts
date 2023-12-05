import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  user:any={
    nom:'',
    prenom:'',
    role:'',
  };
  form!:FormGroup
ngOnInit(): void {
}
constructor(private router:Router,private fb:FormBuilder){
  this.form=this.fb.group({
    nom:['',[Validators.required]],
    prenom:['',Validators.required],
    role:['',Validators.required]
  })
}

signup(){
  if(this.form.valid){
  this.user.nom=this.form.value.nom
  this.user.prenom=this.form.value.prenom
  this.user.role=this.form.value.role
  //console.log(this.user)
  localStorage.setItem('user',JSON.stringify(this.user))
  if(this.form.value.role==='medecin'){
   
    this.router.navigate(["/signup-medecin"])
  }else{
    if(this.form.value.role==='patient'){
      this.router.navigate(["/signup-patient"])
    }
  }
}else {
  if (this.form.controls['nom'].invalid) {
    alert('Le champ nom est invalide');
  } else if (this.form.controls['prenom'].invalid) {
    alert('Le champ role est invalide');
  } else if (this.form.controls['role'].invalid) {
    alert('Le champ role est invalide');
  } 
}
}
}
