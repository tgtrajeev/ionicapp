import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IssueLogAttachmentPage } from './issue-log-attachment.page';

describe('IssueLogAttachmentPage', () => {
  let component: IssueLogAttachmentPage;
  let fixture: ComponentFixture<IssueLogAttachmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLogAttachmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueLogAttachmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
