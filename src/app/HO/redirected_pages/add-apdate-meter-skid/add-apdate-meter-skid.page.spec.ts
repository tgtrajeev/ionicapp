import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddApdateMeterSkidPage } from './add-apdate-meter-skid.page';

describe('AddApdateMeterSkidPage', () => {
  let component: AddApdateMeterSkidPage;
  let fixture: ComponentFixture<AddApdateMeterSkidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApdateMeterSkidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddApdateMeterSkidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
