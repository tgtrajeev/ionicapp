import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttachmentDprPage } from './attachment-dpr.page';

describe('AttachmentDprPage', () => {
  let component: AttachmentDprPage;
  let fixture: ComponentFixture<AttachmentDprPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentDprPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttachmentDprPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
