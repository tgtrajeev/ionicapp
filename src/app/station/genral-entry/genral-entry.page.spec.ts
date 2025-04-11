import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenralEntryPage } from './genral-entry.page';

describe('GenralEntryPage', () => {
  let component: GenralEntryPage;
  let fixture: ComponentFixture<GenralEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenralEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenralEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
