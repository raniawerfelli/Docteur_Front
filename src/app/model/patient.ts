import { DatePipe } from "@angular/common";

export interface Patient {
    id:number,
    nom:string,
    prenom:string,
    email:string,
    mdp:string,
    tel:number,
    role:string,
    date_de_naissance:DatePipe,
    genre:string
}
