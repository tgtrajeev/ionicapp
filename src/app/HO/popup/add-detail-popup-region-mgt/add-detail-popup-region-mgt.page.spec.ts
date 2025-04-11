import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDetailPopupRegionMgtPage } from './add-detail-popup-region-mgt.page';

describe('AddDetailPopupRegionMgtPage', () => {
  let component: AddDetailPopupRegionMgtPage;
  let fixture: ComponentFixture<AddDetailPopupRegionMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDetailPopupRegionMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDetailPopupRegionMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
