import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttachDsaModalPage } from './attach-dsa-modal.page';

describe('AttachDsaModalPage', () => {
  let component: AttachDsaModalPage;
  let fixture: ComponentFixture<AttachDsaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachDsaModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttachDsaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
