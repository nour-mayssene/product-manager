import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugnUpComponent } from './sugn-up.component';

describe('SugnUpComponent', () => {
  let component: SugnUpComponent;
  let fixture: ComponentFixture<SugnUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugnUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugnUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
