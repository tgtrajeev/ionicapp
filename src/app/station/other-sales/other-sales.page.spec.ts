import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherSalesPage } from './other-sales.page';

describe('OtherSalesPage', () => {
  let component: OtherSalesPage;
  let fixture: ComponentFixture<OtherSalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSalesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherSalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
