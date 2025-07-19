import { Component, AfterViewInit, Renderer2 } from '@angular/core';

declare var CarrotSearchFoamTree: any;
declare var JSONP: any;


@Component({
  selector: 'app-foam-tree-visualization',
  standalone: true,
  imports: [],
  templateUrl: './foam-tree-visualization.component.html',
  styleUrl: './foam-tree-visualization.component.scss'
})
export class FoamTreeVisualizationComponent implements AfterViewInit {

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {

    this.loadCSS('assets/foamtree.css');

    this.loadJS('assets/carrotsearch.foamtree.js', () => {
      this.loadJS('assets/hammer.min.js');
      this.loadJS('assets/carrotsearch.jsonp.js', () => this.initializeFoamTree());
    });
  }

  loadCSS(href: string) {
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    this.renderer.appendChild(document.head, link);
  }

  loadJS(src: string, onload?: () => void) {
    const script = this.renderer.createElement('script');
    script.src = src;
    if (onload) {
      script.onload = onload;
    }
    this.renderer.appendChild(document.body, script);
  }

  initializeFoamTree() {
    const foamtree = new CarrotSearchFoamTree({
      id: 'inner',
      pixelRatio: window.devicePixelRatio || 1,
      relaxationInitializer: 'squarified',
      groupColorDecorator: (opts: any, params: { level: number; indexByWeight: number; siblingCount: number; }, vars: { groupColor: { h: number; a: number; }; }) => {
        if (params.level === 0) {
          vars.groupColor.h = (params.indexByWeight / params.siblingCount) * 300;
          vars.groupColor.a = 0.95;
        }
      },
      rainbowSaturationCorrection: 1,
      rainbowLightnessCorrection: 0,
      rainbowLightnessShift: 40,
      groupLabelFontFamily: 'Impact, sans-serif',
      groupLabelLightColor: 'rgba(255, 255, 255, 0.8)',
      groupLabelDarkColor: 'rgba(0, 0, 0, 0.8)',
      groupStrokeType: 'none',
      groupBorderWidth: 3,
      groupInsetWidth: 6,
      parentFillOpacity: 0.85,
      groupSelectionOutlineColor: '#fff',
      groupSelectionOutlineWidth: 4,
      groupSelectionOutlineShadowSize: 0.5,
      groupSelectionOutlineShadowColor: '#000',
      rolloutStartPoint: 'topleft',
      rolloutEasing: 'squareInOut',
      rolloutScalingStrength: -0.3,
      rolloutRotationStrength: 0,
      pullbackDuration: 0,
      groupExposureShadowColor: '#000',
      groupUnexposureLightnessShift: -50,
      groupUnexposureLabelColorThreshold: 0.15,
      onGroupDoubleClick: function (event: { preventDefault: () => void; group: any; }) {
        event.preventDefault();
        this.open(event.group);
      },
      onGroupClick: function (event: { shiftKey: any; preventDefault: () => void; ctrlKey: any; bottommostOpenGroup: any; group: any; }) {
        if (event.shiftKey) {
          event.preventDefault();
          this.open({
            groups: event.ctrlKey ? event.bottommostOpenGroup : event.group,
            open: !event.ctrlKey
          });
        }
      },
      attributionTheme: 'dark'
    });

    JSONP.load('assets/data/data-mining-100-topic-hierarchical.js', 'modelDataAvailable', (dataObject: any) => {
      foamtree.set('dataObject', dataObject);
    });

    window.addEventListener('orientationchange', foamtree.resize);
    window.addEventListener('resize', (() => {
      let timeout: number | undefined;
      return () => {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(foamtree.resize, 300);
      };
    })());
  }
}