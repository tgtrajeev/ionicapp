import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JumpReadingPopPage } from './jump-reading-pop.page';

describe('JumpReadingPopPage', () => {
  let component: JumpReadingPopPage;
  let fixture: ComponentFixture<JumpReadingPopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JumpReadingPopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JumpReadingPopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
