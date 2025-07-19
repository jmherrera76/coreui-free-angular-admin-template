import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoamTreeVisualizationComponent } from './foam-tree-visualization.component';

describe('FoamTreeVisualizationComponent', () => {
  let component: FoamTreeVisualizationComponent;
  let fixture: ComponentFixture<FoamTreeVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoamTreeVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoamTreeVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
