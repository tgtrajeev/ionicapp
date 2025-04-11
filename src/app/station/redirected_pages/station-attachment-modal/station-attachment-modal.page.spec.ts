import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StationAttachmentModalPage } from './station-attachment-modal.page';

describe('StationAttachmentModalPage', () => {
  let component: StationAttachmentModalPage;
  let fixture: ComponentFixture<StationAttachmentModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationAttachmentModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StationAttachmentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
