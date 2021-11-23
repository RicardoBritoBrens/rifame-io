import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifameBlurScreenWithCentralTextComponent } from './rifame-blur-screen-with-central-text.component';

describe('RifameBlurScreenWithCentralTextComponent', () => {
  let component: RifameBlurScreenWithCentralTextComponent;
  let fixture: ComponentFixture<RifameBlurScreenWithCentralTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifameBlurScreenWithCentralTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RifameBlurScreenWithCentralTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
