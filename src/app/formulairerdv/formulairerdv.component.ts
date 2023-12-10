import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Medecin } from '../model/medecin';
import { Patient } from '../model/patient';
import { Rendezvous } from '../model/rendezvous';

@Component({
  selector: 'app-formulairerdv',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './formulairerdv.component.html',
  styleUrl: './formulairerdv.component.css'
})
export class FormulairerdvComponent {
  form!:FormGroup
  medecins!:any
  nomprenom!:any
  medecin!:Medecin
  patient!:Patient
  email!:any
  hours:any
constructor(private route:Router,private service:AuthService,private fb:FormBuilder){
  this.form=this.fb.group({
    patient:[''],
    id_rendezvous:[''],
    validation:[''],
    email:[''],
    tel: ['', [Validators.pattern(/^[0-9]{8}$/),Validators.required]],
    medecin:['',Validators.required],
    dateRendezVous:['',[Validators.required, this.dateSupOuEgaleCourante]],
    heure:['',Validators.required]
  })
  var id = localStorage.getItem('user_id');
    if (id !== null) {
      console.log("email"+id)
      this.email=id;
      this.getPatient(id);
    } else {
     
     console.log('La valeur est null.');
    }
this.getAllMedecin()
}


onDoctorSelection() {
  const selectedDoctorEmail = this.form.value.medecin;
  const selectedDate = this.form.value.dateRendezVous;

  if (selectedDoctorEmail && selectedDate) {
    this.service.getMedecin(selectedDoctorEmail).subscribe((data) => {
      this.medecin = data;
      this.filterAvailableHours(selectedDate);
    });
  }
}

filterAvailableHours(selectedDate: string) {
  const selectedDateTime = new Date(selectedDate);
  const allHours = this.generateHoursArray(8, 17); // Generate all available hours

  if (this.medecin && this.medecin.lesDatedetravail && this.medecin.lesDatedetravail.length > 0) {
    const workingHours = this.medecin.lesDatedetravail;
    let isDoctorAvailable = false;

    for (const workingDate of workingHours) {
      const jourDebut = new Date(workingDate.jour_debut);
      const jourFin = new Date(workingDate.jour_fin);

      if (selectedDateTime >= jourDebut && selectedDateTime <= jourFin) {
        isDoctorAvailable = true;

        const startHour = parseInt(workingDate.heure_debut.split(':')[0], 10);
        const endHour = parseInt(workingDate.heure_fin.split(':')[0], 10);

        const hoursToDelete: string[] = [];
        for (let i = startHour; i <= endHour; i++) {
          const hour = `${i.toString().padStart(2, '0')}:00`;
          hoursToDelete.push(hour);
        }

        // Remove hours that exist in the lesdatedetravail from all available hours
        this.hours = allHours.filter(hour => !hoursToDelete.includes(hour));
        break; // Exit loop as the doctor's availability for this date is found
      }
    }

    if (!isDoctorAvailable) {
      // If the doctor is unavailable on the selected date, display all available hours
      this.hours = allHours;
    }
  } else {
    // If the doctor's work schedule is not available, display all available hours
    this.hours = allHours;
  }
}



initializeHours() {
  // Initialize hours to a default range, for example, from 8 AM to 5 PM
  this.hours = this.generateHoursArray(8, 17);
}

generateHoursArray(start: number, end: number): string[] {
  const hoursArray: string[] = [];
  for (let i = start; i <= end; i++) {
    const hour = `${i.toString().padStart(2, '0')}:00`;
    hoursArray.push(hour);
  }
  return hoursArray;
}
dateSupOuEgaleCourante(control:any) {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  console.log(currentDate)

  return selectedDate >= currentDate ? null : { datePasValide: true };
}

getAllMedecin(){
  this.service.getAllMedecin().subscribe((data)=>{
    console.log(data)
    this.medecins=data
  }),
  (e:HttpErrorResponse)=>{
    console.log(e.message)
  }
}
getPatient(email:any){
  this.service.getPatient(email).subscribe((data)=>{
    this.nomprenom=data.nom+" "+data.prenom
    this.patient=data
  }),
  (error: HttpErrorResponse)=>{
console.log(error.message)
  }
}
creer(){
 if(this.form.valid){
  this.service.getMedecin(this.form.value.medecin).subscribe((data) => {
    this.medecin = data;
    console.log("medecin", this.medecin);

    const rdv = {
      'dateRendezVous': this.form.value.dateRendezVous,
      'heure': this.form.value.heure+':00',
      'validation': 'en attente',
      'patient': this.patient,
      'medecin': this.medecin
    };
    console.log(rdv.dateRendezVous);
    this.addRendezvous(rdv)
    this.route.navigate(["/patient"])
  }, (e: HttpErrorResponse) => {
    console.log(e);
  });
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

addRendezvous(rdv:any){
  this.service.addRendezvous(rdv).subscribe((data)=>{
    console.log(data)
  },
  (e:HttpErrorResponse)=>{
    console.log(e.message)
  })
}
getMedecin(email:any){
  this.service.getMedecin(email).subscribe((data)=>{
    this.medecin=data
   // console.log("medecin",this.medecin)
  },
  (e:HttpErrorResponse)=>{
    console.log(e)
  })
}
}
