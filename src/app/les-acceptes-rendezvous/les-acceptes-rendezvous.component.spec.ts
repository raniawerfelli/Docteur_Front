import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesAcceptesRendezvousComponent } from './les-acceptes-rendezvous.component';

describe('LesAcceptesRendezvousComponent', () => {
  let component: LesAcceptesRendezvousComponent;
  let fixture: ComponentFixture<LesAcceptesRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LesAcceptesRendezvousComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LesAcceptesRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
