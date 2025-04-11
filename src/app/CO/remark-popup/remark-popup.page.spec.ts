import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RemarkPopupPage } from './remark-popup.page';

describe('RemarkPopupPage', () => {
  let component: RemarkPopupPage;
  let fixture: ComponentFixture<RemarkPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemarkPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RemarkPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
