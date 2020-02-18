import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSupComponent } from './nav-sup.component';

describe('NavSupComponent', () => {
  let component: NavSupComponent;
  let fixture: ComponentFixture<NavSupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavSupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
