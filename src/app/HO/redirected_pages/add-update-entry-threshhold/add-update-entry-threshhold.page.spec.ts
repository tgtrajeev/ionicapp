import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateEntryThreshholdPage } from './add-update-entry-threshhold.page';

describe('AddUpdateEntryThreshholdPage', () => {
  let component: AddUpdateEntryThreshholdPage;
  let fixture: ComponentFixture<AddUpdateEntryThreshholdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateEntryThreshholdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateEntryThreshholdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
