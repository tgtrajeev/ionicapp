import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MODsmManagementPage } from './modsm-management.page';

describe('MODsmManagementPage', () => {
  let component: MODsmManagementPage;
  let fixture: ComponentFixture<MODsmManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MODsmManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MODsmManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
