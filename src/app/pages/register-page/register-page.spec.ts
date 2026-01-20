import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiterPage } from './regiter-page';

describe('RegiterPage', () => {
  let component: RegiterPage;
  let fixture: ComponentFixture<RegiterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegiterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegiterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
