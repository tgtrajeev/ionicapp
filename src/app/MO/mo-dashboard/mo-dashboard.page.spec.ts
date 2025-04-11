import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoDashboardPage } from './mo-dashboard.page';

describe('MoDashboardPage', () => {
  let component: MoDashboardPage;
  let fixture: ComponentFixture<MoDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
