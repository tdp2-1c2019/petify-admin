import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferesPage } from './choferes.page';

describe('ChoferesPage', () => {
  let component: ChoferesPage;
  let fixture: ComponentFixture<ChoferesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoferesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoferesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
