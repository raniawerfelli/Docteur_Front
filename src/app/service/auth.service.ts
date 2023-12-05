import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medecin } from '../model/medecin';
import { Observable } from 'rxjs';
import { Patient } from '../model/patient';
import { Specialite } from '../model/specialite';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {
url_medecin="http://localhost:8080/medecin"
url_patient="http://localhost:8080/patient"
url_user="http://localhost:8080/utilisateur"
url_specialite="http://localhost:8080/specialite"
  constructor(private http: HttpClient) { }

  public getMedecin(email: string): Observable<Medecin> {
    return this.http.get<Medecin>(`${this.url_medecin}/getMedecin/${email}`);
  }
  public addMedecin(m: Medecin): Observable<Medecin> {
    return this.http.post<Medecin>(`${this.url_medecin}/add`, m);
  }
  public getPatient(email: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.url_patient}/getPatient/${email}`);
  }
  public addPatient(p: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.url_patient}/add`, p);
  }
  public getSpecialtie():Observable<Specialite[]> {
    return this.http.get<Specialite[]>(`${this.url_specialite}/getAll`);
  }
  public addSpecialite(sp: Specialite): Observable<Specialite> {
    return this.http.post<Specialite>(`${this.url_specialite}/add`, sp);
  }
  public getUser(email: string,mdp:string): Observable<any> {
    return this.http.get<any>(`${this.url_user}/login/${email}/${mdp}`);
  }
  
}
