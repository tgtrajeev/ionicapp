import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDetailRegionmgtPage } from './add-detail-regionmgt.page';

describe('AddDetailRegionmgtPage', () => {
  let component: AddDetailRegionmgtPage;
  let fixture: ComponentFixture<AddDetailRegionmgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDetailRegionmgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDetailRegionmgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
