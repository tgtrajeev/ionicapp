import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LcvPage } from './lcv.page';

describe('LcvPage', () => {
  let component: LcvPage;
  let fixture: ComponentFixture<LcvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LcvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
