import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifameNavBarComponent } from './rifame-nav-bar.component';

describe('RifameNavBarComponent', () => {
  let component: RifameNavBarComponent;
  let fixture: ComponentFixture<RifameNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifameNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RifameNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
