import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IssueLogModalPage } from './issue-log-modal.page';

describe('IssueLogModalPage', () => {
  let component: IssueLogModalPage;
  let fixture: ComponentFixture<IssueLogModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLogModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueLogModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
