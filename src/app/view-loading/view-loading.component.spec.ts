import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoadingComponent } from './view-loading.component';

describe('ViewLoadingComponent', () => {
  let component: ViewLoadingComponent;
  let fixture: ComponentFixture<ViewLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
