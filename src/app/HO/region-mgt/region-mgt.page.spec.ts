import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegionMgtPage } from './region-mgt.page';

describe('RegionMgtPage', () => {
  let component: RegionMgtPage;
  let fixture: ComponentFixture<RegionMgtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionMgtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegionMgtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
