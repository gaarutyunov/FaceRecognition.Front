import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrComponent } from './fr.component';

describe('FrComponent', () => {
  let component: FrComponent;
  let fixture: ComponentFixture<FrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
