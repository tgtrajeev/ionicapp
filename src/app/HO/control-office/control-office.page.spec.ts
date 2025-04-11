import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ControlOfficePage } from './control-office.page';

describe('ControlOfficePage', () => {
  let component: ControlOfficePage;
  let fixture: ComponentFixture<ControlOfficePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlOfficePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ControlOfficePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
