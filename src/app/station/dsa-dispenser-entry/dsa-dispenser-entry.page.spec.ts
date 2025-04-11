import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DsaDispenserEntryPage } from './dsa-dispenser-entry.page';

describe('DsaDispenserEntryPage', () => {
  let component: DsaDispenserEntryPage;
  let fixture: ComponentFixture<DsaDispenserEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaDispenserEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DsaDispenserEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
