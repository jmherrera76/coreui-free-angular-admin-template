import { Component, AfterViewInit, Renderer2 } from '@angular/core';

declare var CarrotSearchFoamTree: any;

@Component({
  selector: 'app-foam-tree-visualization-light',
  standalone: true,
  imports: [],
  templateUrl: './foam-tree-visualization-light.component.html',
  styleUrls: ['./foam-tree-visualization-light.component.scss']
})
export class FoamTreeVisualizationLightComponent implements AfterViewInit {

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    // Load FoamTree CSS dynamically
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/foamtree.css';
    this.renderer.appendChild(document.head, link);

    // Load FoamTree JS dynamically
    const script = this.renderer.createElement('script');
    script.src = 'assets/carrotsearch.foamtree.js';
    script.onload = () => {
      var foamtree = new CarrotSearchFoamTree({
        id: 'visualization',
        dataObject: {
          groups: [
            { label: 'Your', weight: 1.0 },
            { label: 'First', weight: 3.0 },
            { label: 'FoamTree', weight: 2.0 },
            { label: 'Visualization', weight: 4.0 }
          ]
        }
      });
    };
    this.renderer.appendChild(document.body, script);
  }
}
