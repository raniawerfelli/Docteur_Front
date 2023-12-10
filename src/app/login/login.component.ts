import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!:FormGroup
  id!:number
  ngOnInit(): void {}
  constructor(private formbuilder: FormBuilder,
    private router: Router,
    private auth:AuthService){
      this.form=this.formbuilder.group({
        email:["",[Validators.email,Validators.required]],
        mdp:['',[Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/)]] 
      })
  }
  login() {
    if (this.form.valid) {
      this.getUtilisateur(this.form.value.email, this.form.value.mdp);
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        if (control && !control.valid) {
          const fieldName = field === 'email' ? 'Email' : 'Mot de passe';
          alert(`Le champ ${fieldName} n'est pas valide.`);
        }
      });
    }
  }
  getUtilisateur(email:string,mdp:string){
    this.auth.getUser(email,mdp).subscribe((data)=>{
      console.log(data.email)
      localStorage.setItem('role',data.role)
      localStorage.setItem('user_id',data.email)
      if(data.role==='patient'){
        this.router.navigate(['/patient'])
      }else{
        if(data.role==='medecin'){
          this.router.navigate(['/medecin'])
      }
      }
    },
    (e: HttpErrorResponse)=>{
      if(e.status===404){
        alert("email incorrect")
      }else{
        if(e.status===401){
          alert("mot de passe incorrect")
        }
      }
console.log(e.message)
    })
  }

}
