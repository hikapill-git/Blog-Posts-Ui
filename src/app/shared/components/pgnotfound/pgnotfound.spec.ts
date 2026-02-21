import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pgnotfound } from './pgnotfound';

describe('Pgnotfound', () => {
  let component: Pgnotfound;
  let fixture: ComponentFixture<Pgnotfound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pgnotfound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pgnotfound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
