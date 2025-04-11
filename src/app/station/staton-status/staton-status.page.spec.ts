import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatonStatusPage } from './staton-status.page';

describe('StatonStatusPage', () => {
  let component: StatonStatusPage;
  let fixture: ComponentFixture<StatonStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatonStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatonStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
