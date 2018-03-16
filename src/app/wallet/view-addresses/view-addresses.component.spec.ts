import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddressesComponent } from './view-addresses.component';

describe('ViewAddressesComponent', () => {
  let component: ViewAddressesComponent;
  let fixture: ComponentFixture<ViewAddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAddressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
