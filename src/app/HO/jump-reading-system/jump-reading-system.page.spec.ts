import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JumpReadingSystemPage } from './jump-reading-system.page';

describe('JumpReadingSystemPage', () => {
  let component: JumpReadingSystemPage;
  let fixture: ComponentFixture<JumpReadingSystemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JumpReadingSystemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JumpReadingSystemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
