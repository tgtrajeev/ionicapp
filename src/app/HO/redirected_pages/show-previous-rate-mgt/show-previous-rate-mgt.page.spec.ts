import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowPreviousRateMgtPage } from './show-previous-rate-mgt.page';

describe('ShowPreviousRateMgtPage', () => {
  let component: ShowPreviousRateMgtPage;
  let fixture: ComponentFixture<ShowPreviousRateMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPreviousRateMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowPreviousRateMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
