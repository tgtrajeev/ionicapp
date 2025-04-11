import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DprDispenserEntryPage } from './dpr-dispenser-entry.page';

describe('DprDispenserEntryPage', () => {
  let component: DprDispenserEntryPage;
  let fixture: ComponentFixture<DprDispenserEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprDispenserEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DprDispenserEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
