import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachesList } from './coaches-list';

describe('CoachesList', () => {
  let component: CoachesList;
  let fixture: ComponentFixture<CoachesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachesList],
    }).compileComponents();

    fixture = TestBed.createComponent(CoachesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
