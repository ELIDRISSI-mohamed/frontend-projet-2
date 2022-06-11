import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsFactureComponent } from './cards-facture.component';

describe('CardsFactureComponent', () => {
  let component: CardsFactureComponent;
  let fixture: ComponentFixture<CardsFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
