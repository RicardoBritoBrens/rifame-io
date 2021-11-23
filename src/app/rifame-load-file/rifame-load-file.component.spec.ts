import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifameLoadFileComponent } from './rifame-load-file.component';

describe('RifameLoadFileComponent', () => {
  let component: RifameLoadFileComponent;
  let fixture: ComponentFixture<RifameLoadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifameLoadFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RifameLoadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
