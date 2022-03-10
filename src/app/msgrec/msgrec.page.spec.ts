import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MsgrecPage } from './msgrec.page';

describe('MsgrecPage', () => {
  let component: MsgrecPage;
  let fixture: ComponentFixture<MsgrecPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgrecPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MsgrecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
