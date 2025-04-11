import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttachDprModalPage } from './attach-dpr-modal.page';

describe('AttachDprModalPage', () => {
  let component: AttachDprModalPage;
  let fixture: ComponentFixture<AttachDprModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachDprModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttachDprModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
