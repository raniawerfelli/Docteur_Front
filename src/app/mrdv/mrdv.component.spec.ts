import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrdvComponent } from './mrdv.component';

describe('MrdvComponent', () => {
  let component: MrdvComponent;
  let fixture: ComponentFixture<MrdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MrdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
