import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginObj: any={
    username:'',
    password:''
  };
  signupUsers: any;
  ngOnInit(): void {
    const localData= localStorage.getItem('signUpUsers');
  if(localData != null){
    this.signupUsers=JSON.parse(localData);
  }
  }
  constructor(){}
 
onLogin(){
  const isUserExist=this.signupUsers.find((m: {
    [x: string]: any; username: any; 
})=> m.username==this.loginObj.username&& m['password'] ==this.loginObj);
if(isUserExist!=undefined){
  alert('user login succ');

}else{
  alert('wrong');
}
}
}
