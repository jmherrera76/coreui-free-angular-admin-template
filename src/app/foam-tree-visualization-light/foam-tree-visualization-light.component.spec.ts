import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoamTreeVisualizationLightComponent } from './foam-tree-visualization-light.component';

describe('FoamTreeVisualizationComponent', () => {
  let component: FoamTreeVisualizationLightComponent;
  let fixture: ComponentFixture<FoamTreeVisualizationLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoamTreeVisualizationLightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoamTreeVisualizationLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
