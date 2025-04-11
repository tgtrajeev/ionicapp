import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DsaEntryDetailPage } from './dsa-entry-detail.page';

describe('DsaEntryDetailPage', () => {
  let component: DsaEntryDetailPage;
  let fixture: ComponentFixture<DsaEntryDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaEntryDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DsaEntryDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
