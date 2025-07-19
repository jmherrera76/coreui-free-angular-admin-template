import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { FoamTreeVisualizationComponent } from '../../foam-tree-visualization/foam-tree-visualization.component'

@Component({
  templateUrl: 'search.component.html',
  providers: [IconSetService],
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ColComponent,    
    IconDirective,
    RowComponent,
    FoamTreeVisualizationComponent
  ]
})
export class SearchComponent implements OnInit {
  public title = 'CoreUI Icons';
  public icons!: [string, string[]][];

  constructor(
    private route: ActivatedRoute, public iconSet: IconSetService
  ) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit() {

  }

}
