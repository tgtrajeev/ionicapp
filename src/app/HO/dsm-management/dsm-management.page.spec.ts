import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DsmManagementPage } from './dsm-management.page';

describe('DsmManagementPage', () => {
  let component: DsmManagementPage;
  let fixture: ComponentFixture<DsmManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsmManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DsmManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
