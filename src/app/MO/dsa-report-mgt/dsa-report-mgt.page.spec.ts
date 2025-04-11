import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DsaReportMgtPage } from './dsa-report-mgt.page';

describe('DsaReportMgtPage', () => {
  let component: DsaReportMgtPage;
  let fixture: ComponentFixture<DsaReportMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaReportMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DsaReportMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
