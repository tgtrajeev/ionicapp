import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardMoPage } from './dashboard-mo.page';

describe('DashboardMoPage', () => {
  let component: DashboardMoPage;
  let fixture: ComponentFixture<DashboardMoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
