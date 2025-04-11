import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MOStationDetailPage } from './mostation-detail.page';

describe('MOStationDetailPage', () => {
  let component: MOStationDetailPage;
  let fixture: ComponentFixture<MOStationDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MOStationDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MOStationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
