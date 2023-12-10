import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Medecin } from '../model/medecin';
import { Specialite } from '../model/specialite';
import { AuthService } from '../service/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-signup-medecin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './signup-medecin.component.html',
  styleUrl: './signup-medecin.component.css'
})
export class SignupMedecinComponent {
  user_medecin:any={
    nom:'',
    prenom:'',
    role:'',
    mdp:'',
    email:'',
    tel:'',
    longitude:'',
    latitude:'',
    prixvisite:'',
    lesDatedetravail:[],
    specialites:[]
  };
  user!: SocialUser;
  loggedIn!: boolean;
  specialites: any
  form!: FormGroup;
  f!:FormGroup
  checkboxesState: { [key: string]: boolean } = {};
  
  constructor(private fb: FormBuilder,private service:AuthService,private route:Router){
    const role=localStorage.getItem('role')
    if(role!="medecin"){
      this.route.navigate(["/login"])
    }
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.pattern(/^[0-9]{8}$/),Validators.required]],
      latitude: ['', Validators.required],
      mdp:['',[Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/)]],
      longitude: ['', Validators.required],
      prixvisite: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern('.+(\.jpg|\.png)$')]],
      specialites: [this.specialites, Validators.required]
    });
    this.f=new FormGroup({
      id:new FormControl(),
      label:new FormControl(),
      description:new FormControl()
      
    })
  
    const user: string | null = localStorage.getItem('user');
    if (user !== null) {
      const medecin = JSON.parse(user);
      this.user_medecin.nom=medecin.nom
      this.user_medecin.prenom=medecin.prenom
      this.user_medecin.role=medecin.role
      console.log(this.user_medecin)
    } else {
     
     console.log('La valeur est null.');
    }
  this.getSpecialite()
  }
    onSubmit() {
      if (this.form.valid) {
        this.form.value.specialites = [];
        this.specialites.forEach((specialite: any) => {
          if (this.checkboxesState[specialite.label]) {
            this.form.value.specialites.push(specialite.id);
          }
        });
        this.form.value.role="medecin"
        console.log(this.form.value)
    this.ajouterMedecin();
    this.route.navigate(["/login"]);
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
   public getSpecialite(): Specialite[] {
    this.service.getSpecialtie().subscribe((data) => {
      this.specialites = data;
      console.log(data)
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log("erreur")
      }
    );
    return this.specialites
  }

  ajouterSpecialite(){
this.service.addSpecialite(this.f.value).subscribe((data)=>{
  window.location.reload()
},
(error: HttpErrorResponse) => {
  alert(error.message);
  console.log(error.message)
})
  }
  ajouterMedecin(){
    this.service.addMedecin(this.form.value).subscribe((data)=>{
console.log(data)
    },
(error: HttpErrorResponse) => {
  if(error.status===409){
    alert("le medecin exist deja")
  }
})
  }
  onChangeSpecialite(label: string) {
    this.checkboxesState[label] = !this.checkboxesState[label];
  }
}

  