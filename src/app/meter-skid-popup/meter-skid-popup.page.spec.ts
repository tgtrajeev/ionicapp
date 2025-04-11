import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeterSkidPopupPage } from './meter-skid-popup.page';

describe('MeterSkidPopupPage', () => {
  let component: MeterSkidPopupPage;
  let fixture: ComponentFixture<MeterSkidPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterSkidPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeterSkidPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
