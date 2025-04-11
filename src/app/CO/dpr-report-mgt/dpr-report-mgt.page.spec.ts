import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DprReportMgtPage } from './dpr-report-mgt.page';

describe('DprReportMgtPage', () => {
  let component: DprReportMgtPage;
  let fixture: ComponentFixture<DprReportMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprReportMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DprReportMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
