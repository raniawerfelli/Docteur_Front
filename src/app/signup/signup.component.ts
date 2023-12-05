import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
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
ngOnInit(): void {
}
constructor(private router:Router){
}

signup(f:NgForm){
  this.user.nom=f.value.nom
  this.user.prenom=f.value.prenom
  this.user.role=f.value.role
  console.log(this.user)
  localStorage.setItem('user',JSON.stringify(this.user))
  if(f.value.role==='medecin'){
   
    this.router.navigate(["/signup-medecin"])
  }else{
    if(f.value.role==='patient'){
      this.router.navigate(["/signup-patient"])
    }else{
      alert("s'il vous plait choisir un role")
    }
  }
}
}
