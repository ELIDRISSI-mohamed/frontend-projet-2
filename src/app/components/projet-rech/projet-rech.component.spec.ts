import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetRechComponent } from './projet-rech.component';

describe('ProjetRechComponent', () => {
  let component: ProjetRechComponent;
  let fixture: ComponentFixture<ProjetRechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetRechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetRechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
