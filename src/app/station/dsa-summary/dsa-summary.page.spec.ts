import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DsaSummaryPage } from './dsa-summary.page';

describe('DsaSummaryPage', () => {
  let component: DsaSummaryPage;
  let fixture: ComponentFixture<DsaSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DsaSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
