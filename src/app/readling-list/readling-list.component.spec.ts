import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadlingListComponent } from './readling-list.component';

describe('ReadlingListComponent', () => {
  let component: ReadlingListComponent;
  let fixture: ComponentFixture<ReadlingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadlingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadlingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
