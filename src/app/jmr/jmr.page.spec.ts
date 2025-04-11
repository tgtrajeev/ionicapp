import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JMRPage } from './jmr.page';

describe('JMRPage', () => {
  let component: JMRPage;
  let fixture: ComponentFixture<JMRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JMRPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JMRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
