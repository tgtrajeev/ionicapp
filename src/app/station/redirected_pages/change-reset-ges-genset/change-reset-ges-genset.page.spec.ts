import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeResetGesGensetPage } from './change-reset-ges-genset.page';

describe('ChangeResetGesGensetPage', () => {
  let component: ChangeResetGesGensetPage;
  let fixture: ComponentFixture<ChangeResetGesGensetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeResetGesGensetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeResetGesGensetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
