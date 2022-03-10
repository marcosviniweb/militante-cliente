import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListasetorPage } from './listasetor.page';

describe('ListasetorPage', () => {
  let component: ListasetorPage;
  let fixture: ComponentFixture<ListasetorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasetorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListasetorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
