import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifameWinnersComponent } from './rifame-winners.component';

describe('RifameWinnersComponent', () => {
  let component: RifameWinnersComponent;
  let fixture: ComponentFixture<RifameWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifameWinnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RifameWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
