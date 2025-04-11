import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DprSummaryPage } from './dpr-summary.page';

describe('DprSummaryPage', () => {
  let component: DprSummaryPage;
  let fixture: ComponentFixture<DprSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DprSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
