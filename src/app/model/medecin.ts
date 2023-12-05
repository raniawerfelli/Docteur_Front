import { Datedetravail } from "./datedetravail";
import { Specialite } from "./specialite";

export interface Medecin {
    id:number,
    nom:string,
    prenom:string,
    email:string,
    reole:string,
    mdp:string,
    tel:string,
    longitude:number,
    latitude:number,
    prixvisite:number,
    lesDatedetravail:Datedetravail[]
    specialites:Specialite[],
}
