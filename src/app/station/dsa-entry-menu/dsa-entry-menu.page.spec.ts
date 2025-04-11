import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DsaEntryMenuPage } from './dsa-entry-menu.page';

describe('DsaEntryMenuPage', () => {
  let component: DsaEntryMenuPage;
  let fixture: ComponentFixture<DsaEntryMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaEntryMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DsaEntryMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
