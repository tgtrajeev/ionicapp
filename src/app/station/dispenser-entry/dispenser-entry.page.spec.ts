import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DispenserEntryPage } from './dispenser-entry.page';

describe('DispenserEntryPage', () => {
  let component: DispenserEntryPage;
  let fixture: ComponentFixture<DispenserEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispenserEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DispenserEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
