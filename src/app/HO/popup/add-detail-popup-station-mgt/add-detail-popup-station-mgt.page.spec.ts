import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDetailPopupStationMgtPage } from './add-detail-popup-station-mgt.page';

describe('AddDetailPopupStationMgtPage', () => {
  let component: AddDetailPopupStationMgtPage;
  let fixture: ComponentFixture<AddDetailPopupStationMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDetailPopupStationMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDetailPopupStationMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
