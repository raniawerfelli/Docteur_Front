import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupMedecinComponent } from './signup-medecin.component';

describe('SignupMedecinComponent', () => {
  let component: SignupMedecinComponent;
  let fixture: ComponentFixture<SignupMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
