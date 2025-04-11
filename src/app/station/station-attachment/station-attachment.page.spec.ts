import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StationAttachmentPage } from './station-attachment.page';

describe('StationAttachmentPage', () => {
  let component: StationAttachmentPage;
  let fixture: ComponentFixture<StationAttachmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationAttachmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StationAttachmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
