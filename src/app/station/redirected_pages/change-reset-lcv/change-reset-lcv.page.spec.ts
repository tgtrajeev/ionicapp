import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeResetLcvPage } from './change-reset-lcv.page';

describe('ChangeResetLcvPage', () => {
  let component: ChangeResetLcvPage;
  let fixture: ComponentFixture<ChangeResetLcvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeResetLcvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeResetLcvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
