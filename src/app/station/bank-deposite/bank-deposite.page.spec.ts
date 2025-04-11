import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BankDepositePage } from './bank-deposite.page';

describe('BankDepositePage', () => {
  let component: BankDepositePage;
  let fixture: ComponentFixture<BankDepositePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankDepositePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BankDepositePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
