import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifameParticipantsComponent } from './rifame-participants.component';

describe('RifameParticipantsComponent', () => {
  let component: RifameParticipantsComponent;
  let fixture: ComponentFixture<RifameParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifameParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RifameParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
