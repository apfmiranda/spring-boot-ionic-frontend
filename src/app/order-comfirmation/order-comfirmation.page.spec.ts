import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComfirmationPage } from './order-comfirmation.page';

describe('OrderComfirmationPage', () => {
  let component: OrderComfirmationPage;
  let fixture: ComponentFixture<OrderComfirmationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComfirmationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
