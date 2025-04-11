import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddApdatePackagePage } from './add-apdate-package.page';

describe('AddApdatePackagePage', () => {
  let component: AddApdatePackagePage;
  let fixture: ComponentFixture<AddApdatePackagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApdatePackagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddApdatePackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
