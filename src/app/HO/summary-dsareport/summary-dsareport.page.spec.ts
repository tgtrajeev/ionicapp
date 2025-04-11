import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SummaryDSAReportPage } from './summary-dsareport.page';

describe('SummaryDSAReportPage', () => {
  let component: SummaryDSAReportPage;
  let fixture: ComponentFixture<SummaryDSAReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryDSAReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryDSAReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
