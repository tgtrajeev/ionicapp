import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntryThreshholdPage } from './entry-threshhold.page';

describe('EntryThreshholdPage', () => {
  let component: EntryThreshholdPage;
  let fixture: ComponentFixture<EntryThreshholdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryThreshholdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntryThreshholdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
