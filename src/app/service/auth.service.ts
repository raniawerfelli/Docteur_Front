import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medecin } from '../model/medecin';
import { Observable } from 'rxjs';
import { Patient } from '../model/patient';
import { Specialite } from '../model/specialite';
import { Rendezvous } from '../model/rendezvous';
import { Datedetravail } from '../model/datedetravail';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {
url_medecin="http://localhost:8080/medecin"
url_patient="http://localhost:8080/patient"
url_user="http://localhost:8080/utilisateur"
url_specialite="http://localhost:8080/specialite"
url_rendezvous="http://localhost:8080/rendezvous"
url_datedetravail="http://localhost:8080/datedetravail"
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
  public getRendezvous(): Observable<Rendezvous> {
    return this.http.get<Rendezvous>(`${this.url_rendezvous}/getAll`);
  }
  public addRendezvous(p: Rendezvous): Observable<Rendezvous> {
    return this.http.post<Rendezvous>(`${this.url_rendezvous}/add`, p);
  }
  public accepterRendezvous(p: Rendezvous): Observable<Rendezvous> {
    return this.http.put<Rendezvous>(`${this.url_rendezvous}/accepte`, p);
  }
  public annulerRendezvous(p: Rendezvous): Observable<Rendezvous> {
    return this.http.put<Rendezvous>(`${this.url_rendezvous}/refuse`, p);
  }  
  public getAllMedecin(): Observable<Medecin> {
    return this.http.get<Medecin>(`${this.url_medecin}/getAll`);
  }
  public addEvent(e:Datedetravail): Observable<Datedetravail> {
    return this.http.post<Datedetravail>(`${this.url_datedetravail}/add`, e);
  }
  public getAllEvent(): Observable<any> {
    return this.http.get<any>(`${this.url_datedetravail}/getAll`);
  }
  public getEventBymedecin(id:any): Observable<any> {
    return this.http.get<any>(`${this.url_datedetravail}/getTravail/${id}`);
  }
  public deleteEvent(jourdebut:any,jourfin:any,heuredebut:any,heurefin:any,id:any): Observable<any> {
    return this.http.get<any>(`${this.url_datedetravail}/delete/${jourdebut}/${jourfin}/${heuredebut}/${heurefin}/${id}`);
  }
  public getRendezvousBymedecin(id:any): Observable<Rendezvous[]> {
    return this.http.get<Rendezvous[]>(`${this.url_rendezvous}/getAllRendezvous/${id}`);
  }
  public getByDateAndValidation(id:any):Observable<Rendezvous[]>{
    return this.http.get<Rendezvous[]>(`${this.url_rendezvous}/currentDateAndValidation/${id}`);
  }
  public getAllPatientExamine(id_medecin:any): Observable<Rendezvous[]> {
    return this.http.get<Rendezvous[]>(`${this.url_rendezvous}/getAllPatientExamine/${id_medecin}`);
  }
  public creerObservation(id:any,observation:string): Observable<any> {
    return this.http.put<any>(`${this.url_rendezvous}/observation/${id}`,observation);
  } 
  public getNbrePatient(id_medecin:any): Observable<any> {
    return this.http.get<any>(`${this.url_rendezvous}/nbrePatient/${id_medecin}`);
  }
  public getRendezvousWithValidationAttenteForMedecin(id_medecin:any): Observable<any> {
    return this.http.get<any>(`${this.url_rendezvous}/demande/${id_medecin}`);
  }
  public getRendezvousWithValidationAccepteForMedecin(id_medecin:any): Observable<any> {
    return this.http.get<any>(`${this.url_rendezvous}/lesAcceptes/${id_medecin}`);
  }
  public getAllPatientForMedecin(id_medecin:any): Observable<any> {
    return this.http.get<any>(`${this.url_rendezvous}/allPatientForMedecin/${id_medecin}`);
  }
  public getllRendezvousForPatient(id_patient:any):Observable<any>{
    return this.http.get<any>(`${this.url_rendezvous}/allRendezVousByPatient/${id_patient}`);
  }

}