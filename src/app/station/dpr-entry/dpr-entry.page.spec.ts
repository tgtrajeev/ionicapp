import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DprEntryPage } from './dpr-entry.page';

describe('DprEntryPage', () => {
  let component: DprEntryPage;
  let fixture: ComponentFixture<DprEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DprEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
