import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdatePaymentMgtPage } from './add-update-payment-mgt.page';

describe('AddUpdatePaymentMgtPage', () => {
  let component: AddUpdatePaymentMgtPage;
  let fixture: ComponentFixture<AddUpdatePaymentMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdatePaymentMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdatePaymentMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
