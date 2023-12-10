import { Time } from "@angular/common";
import { Patient } from "./patient";
import { Medecin } from "./medecin";

export interface Rendezvous {
        id_rendezvous: number;
        patient:Patient;
        dateRendezVous: Date;
        heure: any;
        validation: string;
        medecin: Medecin;
        observation:string,
        ordonnance:string
    }
