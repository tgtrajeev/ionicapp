import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateDispenserMgtPage } from './add-update-dispenser-mgt.page';

describe('AddUpdateDispenserMgtPage', () => {
  let component: AddUpdateDispenserMgtPage;
  let fixture: ComponentFixture<AddUpdateDispenserMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateDispenserMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateDispenserMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
