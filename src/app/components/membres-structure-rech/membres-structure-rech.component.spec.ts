import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresStructureRechComponent } from './membres-structure-rech.component';

describe('MembresStructureRechComponent', () => {
  let component: MembresStructureRechComponent;
  let fixture: ComponentFixture<MembresStructureRechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembresStructureRechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembresStructureRechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
