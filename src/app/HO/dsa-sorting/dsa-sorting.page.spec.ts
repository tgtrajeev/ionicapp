import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DsaSortingPage } from './dsa-sorting.page';

describe('DsaSortingPage', () => {
  let component: DsaSortingPage;
  let fixture: ComponentFixture<DsaSortingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaSortingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DsaSortingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
