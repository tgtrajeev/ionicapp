import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddApdateDsmMgtPage } from './add-apdate-dsm-mgt.page';

describe('AddApdateDsmMgtPage', () => {
  let component: AddApdateDsmMgtPage;
  let fixture: ComponentFixture<AddApdateDsmMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApdateDsmMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddApdateDsmMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
