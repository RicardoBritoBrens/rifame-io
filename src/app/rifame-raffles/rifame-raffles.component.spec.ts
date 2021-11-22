import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifameRafflesComponent } from './rifame-raffles.component';

describe('RifameRafflesComponent', () => {
  let component: RifameRafflesComponent;
  let fixture: ComponentFixture<RifameRafflesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifameRafflesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RifameRafflesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
