import { Component, Input } from '@angular/core';

import { chartColorScheme } from '../chart-color-scheme';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.css']
})
export class HorizontalBarChartComponent {
  @Input() title: string;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() results: HorizontalBarChartDataPoint[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showGridLines = true;

  colorScheme = chartColorScheme;
}