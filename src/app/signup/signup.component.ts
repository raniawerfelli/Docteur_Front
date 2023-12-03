import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupUsers:any[]=[];
signupObj:any={
  username:'',
  fullname:'',
  email:'',
  password:''
};
ngOnInit(): void {
  const localData= localStorage.getItem('signUpUsers');
  if(localData != null){
    this.signupUsers=JSON.parse(localData);
  }
}
constructor(){}

onSignUp(){
  this.signupUsers.push(this.signupObj);
  localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
this.signupObj={
  username:'',
  fullname:'',
  email:'',
  password:''
};
}
}
