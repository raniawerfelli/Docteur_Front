import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  specialites!:any
  medecins!:any
constructor(private service:AuthService){
this.getSpecialites()
this.getMedecin()
}
getSpecialites(){
  this.service.getSpecialtie().subscribe((data)=>{
    this.specialites=data
  },
  (error:HttpErrorResponse)=>{
    console.log("error")
  })
}
getMedecin(){
  this.service.getAllMedecin().subscribe((data)=>{
this.medecins=data
console.log(data)
  },
  (error:HttpErrorResponse)=>{
    console.log("error")
  })
}
getLastPartOfPath(path: string | null): string {
  if (path) {
    const parts = path.split('\\'); // Remplacez '\\' par '/' selon votre cas
    return parts[parts.length - 1];
  }
  return ''; // Ou une autre valeur par défaut si nécessaire
}
scrollToSection(sectionId: string): void {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

}
