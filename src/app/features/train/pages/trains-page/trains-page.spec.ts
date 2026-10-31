import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainsPage } from './trains-page';

describe('TrainsPage', () => {
  let component: TrainsPage;
  let fixture: ComponentFixture<TrainsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
