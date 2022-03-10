import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagemPage } from './messagem.page';

describe('MessagemPage', () => {
  let component: MessagemPage;
  let fixture: ComponentFixture<MessagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
