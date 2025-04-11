import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDetailPopupDispenserMgtPage } from './add-detail-popup-dispenser-mgt.page';

describe('AddDetailPopupDispenserMgtPage', () => {
  let component: AddDetailPopupDispenserMgtPage;
  let fixture: ComponentFixture<AddDetailPopupDispenserMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDetailPopupDispenserMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDetailPopupDispenserMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
