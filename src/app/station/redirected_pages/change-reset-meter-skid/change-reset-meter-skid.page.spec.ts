import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeResetMeterSkidPage } from './change-reset-meter-skid.page';

describe('ChangeResetMeterSkidPage', () => {
  let component: ChangeResetMeterSkidPage;
  let fixture: ComponentFixture<ChangeResetMeterSkidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeResetMeterSkidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeResetMeterSkidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
