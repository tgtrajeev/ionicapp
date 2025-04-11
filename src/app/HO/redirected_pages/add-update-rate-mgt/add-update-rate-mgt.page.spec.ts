import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateRateMgtPage } from './add-update-rate-mgt.page';

describe('AddUpdateRateMgtPage', () => {
  let component: AddUpdateRateMgtPage;
  let fixture: ComponentFixture<AddUpdateRateMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateRateMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateRateMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
