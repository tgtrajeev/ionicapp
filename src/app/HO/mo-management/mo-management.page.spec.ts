import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MOManagementPage } from './mo-management.page';

describe('MOManagementPage', () => {
  let component: MOManagementPage;
  let fixture: ComponentFixture<MOManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MOManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MOManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
