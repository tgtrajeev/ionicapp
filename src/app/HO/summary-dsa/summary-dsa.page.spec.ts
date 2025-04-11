import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SummaryDsaPage } from './summary-dsa.page';

describe('SummaryDsaPage', () => {
  let component: SummaryDsaPage;
  let fixture: ComponentFixture<SummaryDsaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryDsaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryDsaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
