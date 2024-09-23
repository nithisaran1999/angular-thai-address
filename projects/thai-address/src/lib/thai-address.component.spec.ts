import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThaiAddressComponent } from './thai-address.component';

describe('ThaiAddressComponent', () => {
  let component: ThaiAddressComponent;
  let fixture: ComponentFixture<ThaiAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThaiAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThaiAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
