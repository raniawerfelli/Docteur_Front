import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDocteursComponent } from './liste-docteurs.component';

describe('ListeDocteursComponent', () => {
  let component: ListeDocteursComponent;
  let fixture: ComponentFixture<ListeDocteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDocteursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeDocteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
