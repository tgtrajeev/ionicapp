import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LCVvehiclePage } from './lcvvehicle.page';

describe('LCVvehiclePage', () => {
  let component: LCVvehiclePage;
  let fixture: ComponentFixture<LCVvehiclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LCVvehiclePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LCVvehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
