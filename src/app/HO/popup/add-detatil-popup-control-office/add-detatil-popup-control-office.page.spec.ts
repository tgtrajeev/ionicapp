import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDetatilPopupControlOfficePage } from './add-detatil-popup-control-office.page';

describe('AddDetatilPopupControlOfficePage', () => {
  let component: AddDetatilPopupControlOfficePage;
  let fixture: ComponentFixture<AddDetatilPopupControlOfficePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDetatilPopupControlOfficePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDetatilPopupControlOfficePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
