import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StationStatusPage } from './station-status.page';

describe('StationStatusPage', () => {
  let component: StationStatusPage;
  let fixture: ComponentFixture<StationStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StationStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
