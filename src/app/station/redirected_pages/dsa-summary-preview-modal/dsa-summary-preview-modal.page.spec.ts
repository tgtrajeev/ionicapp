import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DsaSummaryPreviewModalPage } from './dsa-summary-preview-modal.page';

describe('DsaSummaryPreviewModalPage', () => {
  let component: DsaSummaryPreviewModalPage;
  let fixture: ComponentFixture<DsaSummaryPreviewModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaSummaryPreviewModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DsaSummaryPreviewModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
