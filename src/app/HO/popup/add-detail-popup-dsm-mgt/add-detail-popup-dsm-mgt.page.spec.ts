import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDetailPopupDsmMgtPage } from './add-detail-popup-dsm-mgt.page';

describe('AddDetailPopupDsmMgtPage', () => {
  let component: AddDetailPopupDsmMgtPage;
  let fixture: ComponentFixture<AddDetailPopupDsmMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDetailPopupDsmMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDetailPopupDsmMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
