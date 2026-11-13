import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsContent } from './settings-content';

describe('SettingsContent', () => {
  let component: SettingsContent;
  let fixture: ComponentFixture<SettingsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsContent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
