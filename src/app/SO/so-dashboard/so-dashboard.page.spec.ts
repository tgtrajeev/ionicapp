import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SoDashboardPage } from './so-dashboard.page';

describe('SoDashboardPage', () => {
  let component: SoDashboardPage;
  let fixture: ComponentFixture<SoDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SoDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
