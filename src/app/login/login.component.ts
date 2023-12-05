import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Patient } from '../model/patient';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!:FormGroup
  id!:number
  ngOnInit(): void {}
  constructor(private formbuilder: FormBuilder,
    private router: Router,
    private auth:AuthService){
      this.form=this.formbuilder.group({
        email:["",[Validators.email,Validators.required]],
        mdp:['',Validators.required]
      })
  }
  login() {
    if(this.form.valid){
    this.getUtilisateur(this.form.value.email,this.form.value.mdp);
    }else{
      alert("Veuillez remplir tous les champs")
    }
  }
  getUtilisateur(email:string,mdp:string){
    this.auth.getUser(email,mdp).subscribe((data)=>{
      console.log(data)
      if(data.role==='patient'){
        localStorage.setItem('user_id',data.id)
        this.router.navigate(['/patient'])
      }else{
        if(data.role==='medecin'){
          localStorage.setItem('user_id',data.id)
          this.router.navigate(['/medecin'])
      }
      }
    },
    (e: HttpErrorResponse)=>{
      if(e.status===404){
        alert("verifier vos mot de passe ou email")
      }
console.log(e.message)
    })
  }
 
}
