import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DprSortingPage } from './dpr-sorting.page';

describe('DprSortingPage', () => {
  let component: DprSortingPage;
  let fixture: ComponentFixture<DprSortingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprSortingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DprSortingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
