import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurScreenWithCentralTextComponent } from './blur-screen-with-central-text.component';

describe('BlurScreenWithCentralTextComponent', () => {
  let component: BlurScreenWithCentralTextComponent;
  let fixture: ComponentFixture<BlurScreenWithCentralTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlurScreenWithCentralTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlurScreenWithCentralTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
