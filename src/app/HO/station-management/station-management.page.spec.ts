import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StationManagementPage } from './station-management.page';

describe('StationManagementPage', () => {
  let component: StationManagementPage;
  let fixture: ComponentFixture<StationManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StationManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
