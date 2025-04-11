import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MOAddUpdateDSMMngtPage } from './moadd-update-dsmmngt.page';

describe('MOAddUpdateDSMMngtPage', () => {
  let component: MOAddUpdateDSMMngtPage;
  let fixture: ComponentFixture<MOAddUpdateDSMMngtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MOAddUpdateDSMMngtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MOAddUpdateDSMMngtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
