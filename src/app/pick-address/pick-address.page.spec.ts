import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickAddressPage } from './pick-address.page';

describe('PickAddressPage', () => {
  let component: PickAddressPage;
  let fixture: ComponentFixture<PickAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
