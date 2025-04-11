import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MOStationStatusPage } from './mostation-status.page';

describe('MOStationStatusPage', () => {
  let component: MOStationStatusPage;
  let fixture: ComponentFixture<MOStationStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MOStationStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MOStationStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
