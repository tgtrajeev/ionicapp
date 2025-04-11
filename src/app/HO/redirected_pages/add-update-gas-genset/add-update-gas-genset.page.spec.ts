import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateGasGensetPage } from './add-update-gas-genset.page';

describe('AddUpdateGasGensetPage', () => {
  let component: AddUpdateGasGensetPage;
  let fixture: ComponentFixture<AddUpdateGasGensetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateGasGensetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateGasGensetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
