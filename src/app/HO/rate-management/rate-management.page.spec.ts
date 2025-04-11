import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RateManagementPage } from './rate-management.page';

describe('RateManagementPage', () => {
  let component: RateManagementPage;
  let fixture: ComponentFixture<RateManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RateManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
