import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Calendar, CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Datedetravail } from '../model/datedetravail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit {
  calendarEl: HTMLElement | null = null;
  calendar: Calendar | null = null;
  nomPrenom: any;
  medecin: any;
  email: any;
  rendezvous!:any
  events: Datedetravail[] = [];

  constructor(private elementRef: ElementRef, private service: AuthService,private route:Router) {
    this.email = localStorage.getItem('user_id');
    const role=localStorage.getItem('role');
    if(role!="medecin"){
      this.route.navigate(["/login"])
    }
    if (this.email !== null) {
      this.getMedecin(this.email);
    } else {
      console.log('La valeur est null.');
    }
  }

  getMedecin(email: any) {
    this.service.getMedecin(email).subscribe(
      (data) => {
        this.nomPrenom = data.nom + ' ' + data.prenom;
        this.medecin = data;
        this.initializeCalendar();
        this.getEventByMedecin(data.id);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  ngAfterViewInit() {
    this.calendarEl = this.elementRef.nativeElement.querySelector('#calendar');

    if (this.calendarEl) {
      this.initializeCalendar();
    } else {
      console.error('Calendar element not found.');
    }
  }

  initializeCalendar() {
    const calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      selectable: true,
      timeZone: 'local',
      select: this.handleDateSelect.bind(this),
      //eventClick: this.handleEventClick.bind(this),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [] 
    };

    if (this.calendarEl) {
      this.calendar = new Calendar(this.calendarEl, calendarOptions);
      this.calendar.render();
    }
  }

  handleDateSelect(arg: any) {
    const title = prompt('Enter event title:');
    if (title === null || title.trim() === '') {
      return; // Do nothing if Cancel was clicked or an empty title was provided
    }
    if (title) {
      this.calendar?.addEvent({
        title,
        start: arg.startStr,
        end: arg.endStr,
        allDay: arg.allDay
      });
    }
    console.log("titre",title)
    console.log("start",arg.startStr)
    console.log("end",arg.endStr)
    console.log("allday",arg.allDay)
    if (arg.allDay === true) {
      const heureDebut: Date = new Date(arg.startStr);
      const heureFin:Date =new Date(arg.endStr)
      const formattedTimestart: string = heureDebut.toTimeString().slice(0, 8);
      const formattedTimeend: string = heureFin.toTimeString().slice(0, 8);
      const formattedDatestart: string = arg.startStr.split('T')[0];
      const formattedDateend: string = arg.endStr.split('T')[0];
      const event = {
        'heure_debut': formattedTimestart, 
        'heure_fin': formattedTimeend,
        'jour_debut': formattedDatestart,
        'jour_fin':formattedDateend,
        'label': title ,
        'medecin':this.medecin
      };
      console.log(event)
      this.service.addEvent(event).subscribe((data)=>{
        console.log(data)
        window.location.reload()
      },
      (e:HttpErrorResponse)=>{
        console.log(e)
      })
    }else{
      const heureDebut: Date = new Date(arg.startStr);
      const heureFin:Date =new Date(arg.endStr)
      const formattedTimestart: string = heureDebut.toTimeString().slice(0, 8);
      const formattedTimeend: string = heureFin.toTimeString().slice(0, 8);
      const formattedDatestart: string = arg.startStr.split('T')[0];
      const formattedDateend: string = arg.endStr.split('T')[0];
      const event = {
        'heure_debut': formattedTimestart, 
        'heure_fin': formattedTimeend,
        'jour_debut': formattedDatestart,
        'jour_fin':formattedDateend,
        'label': title ,
        'medecin':this.medecin
      };
      console.log(event)
      this.service.addEvent(event).subscribe((data)=>{
        console.log(data)
        window.location.reload()
      },
      (e:HttpErrorResponse)=>{
        console.log(e)
      })
    }
    this.calendar?.unselect();
  }

  /*handleEventClick(arg: EventClickArg) {
    if (confirm('Are you sure you want to delete this event?')) {
      const eventId = arg.event.extendedProps.id;
      const heureDebut: Date = new Date(arg.startStr);
      const heureFin:Date =new Date(arg.endStr)
      const formattedTimestart: string = heureDebut.toTimeString().slice(0, 8);
      const formattedTimeend: string = heureFin.toTimeString().slice(0, 8);
      const formattedDatestart: string = arg.startStr.split('T')[0];
      const formattedDateend: string = arg.endStr.split('T')[0];
      const idMedecin = this.medecin.id; // Replace this with your actual Medecin ID
  
      this.service.deleteEvent(jourDebut, jourFin, heureDebut, heureFin, idMedecin).subscribe(
        (response) => {
          console.log('Event deleted:', response);
          arg.event.remove();
        },
        (error) => {
          console.error('Error deleting event:', error);
          // Handle error accordingly
        }
      );
    }
  }*/
  

  getEventByMedecin(id: any) {
    this.getLesAcceptesRendezvous(id);
    this.service.getEventBymedecin(id).subscribe(
      (data: Datedetravail[]) => {
        console.log(data);
        const tempEvents = data.map(event => ({
          title: event.label,
          start: this.formatDate(event.jour_debut, event.heure_debut),
          end: this.formatDate(event.jour_fin, event.heure_fin)
        }));
        console.log("temp+", tempEvents);
  
        if (this.calendar) {
          this.calendar.removeAllEvents();
  
          tempEvents.forEach(event => {
            this.calendar?.addEvent(event);
          });
        }
      },
      (e: HttpErrorResponse) => {
        console.log(e.message);
      }
    );
  }
  
  formatDate(dateStr: string, timeStr: string): string {
    const timestamp = parseInt(dateStr, 10);
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}T${timeStr}+01:00`;
    return formattedDate;
  }
  deconnecter(){
    localStorage.clear()
    this.route.navigate(["/home"])
  }
  getLesAcceptesRendezvous(id:any){
    this.service.getRendezvousWithValidationAccepteForMedecin(id).subscribe((data)=>{
      this.rendezvous=data
    },
    (e:HttpErrorResponse)=>{
      console.log(e.message)
    })
  }
}
