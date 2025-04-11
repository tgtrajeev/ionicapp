import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GasGensetPage } from './gas-genset.page';

describe('GasGensetPage', () => {
  let component: GasGensetPage;
  let fixture: ComponentFixture<GasGensetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasGensetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GasGensetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
