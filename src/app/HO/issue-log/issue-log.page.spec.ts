import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IssueLogPage } from './issue-log.page';

describe('IssueLogPage', () => {
  let component: IssueLogPage;
  let fixture: ComponentFixture<IssueLogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
