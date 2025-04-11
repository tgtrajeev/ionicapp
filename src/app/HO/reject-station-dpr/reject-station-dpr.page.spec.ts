import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RejectStationDprPage } from './reject-station-dpr.page';

describe('RejectStationDprPage', () => {
  let component: RejectStationDprPage;
  let fixture: ComponentFixture<RejectStationDprPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectStationDprPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RejectStationDprPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
