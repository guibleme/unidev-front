import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtuTabelaPrecosComponent } from './atu-tabela-precos.component';

describe('AtuTabelaPrecosComponent', () => {
  let component: AtuTabelaPrecosComponent;
  let fixture: ComponentFixture<AtuTabelaPrecosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtuTabelaPrecosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtuTabelaPrecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
