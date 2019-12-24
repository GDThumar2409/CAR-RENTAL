import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarhomeComponent } from './carhome.component';

describe('CarhomeComponent', () => {
  let component: CarhomeComponent;
  let fixture: ComponentFixture<CarhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
