import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDetailPopupLcvPage } from './add-detail-popup-lcv.page';

describe('AddDetailPopupLcvPage', () => {
  let component: AddDetailPopupLcvPage;
  let fixture: ComponentFixture<AddDetailPopupLcvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDetailPopupLcvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDetailPopupLcvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
