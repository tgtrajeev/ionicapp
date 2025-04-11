import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileStationPage } from './profile-station.page';

describe('ProfileStationPage', () => {
  let component: ProfileStationPage;
  let fixture: ComponentFixture<ProfileStationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileStationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
