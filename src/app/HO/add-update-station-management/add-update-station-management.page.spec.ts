import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateStationManagementPage } from './add-update-station-management.page';

describe('AddUpdateStationManagementPage', () => {
  let component: AddUpdateStationManagementPage;
  let fixture: ComponentFixture<AddUpdateStationManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateStationManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateStationManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
