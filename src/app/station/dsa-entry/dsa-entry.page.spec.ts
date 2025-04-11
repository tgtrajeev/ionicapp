import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DsaEntryPage } from './dsa-entry.page';

describe('DsaEntryPage', () => {
  let component: DsaEntryPage;
  let fixture: ComponentFixture<DsaEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DsaEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
