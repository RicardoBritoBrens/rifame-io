import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifameWelcomeComponent } from './rifame-welcome.component';

describe('RifameWelcomeComponent', () => {
  let component: RifameWelcomeComponent;
  let fixture: ComponentFixture<RifameWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifameWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RifameWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
