import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DispenserManagementPage } from './dispenser-management.page';

describe('DispenserManagementPage', () => {
  let component: DispenserManagementPage;
  let fixture: ComponentFixture<DispenserManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispenserManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DispenserManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
