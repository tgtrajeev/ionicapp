import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeterSkidPage } from './meter-skid.page';

describe('MeterSkidPage', () => {
  let component: MeterSkidPage;
  let fixture: ComponentFixture<MeterSkidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterSkidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeterSkidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
