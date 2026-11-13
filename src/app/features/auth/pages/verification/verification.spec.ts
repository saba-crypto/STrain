import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Verification } from './verification';

describe('Verification', () => {
  let component: Verification;
  let fixture: ComponentFixture<Verification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verification],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Verification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
