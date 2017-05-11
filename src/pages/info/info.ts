import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  class?: string;
  classes: any[];
  doughnutChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService) {
    this.classes = this.dataService.getClasses();
  }

  backgroundColor(size: number) {
    return [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ].slice(0, size);
  }

  hoverBackgroundColor(size: number) {
    return [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#FF6384",
      "#36A2EB",
      "#FFCE56"
    ].slice(0, size);
  }

  ngOnInit() {
    this.class = this.navParams.get('item').name;
    if (this.class) {
      this.dataService.getDataStats(this.class)
        .then((stats) => {

          console.log('STATS');
          console.log(stats);
          this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
              labels: [this.class, 'total'],
              datasets: [{
                label: '# of Votes',
                data: stats['data'],
                backgroundColor: this.backgroundColor(2),
                hoverBackgroundColor: this.hoverBackgroundColor(2)
              }]
            }
          });
        });
    } else {
      this.dataService.getAllDataStats()
        .then((stats) => {
          this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
              labels: this.classes,
              datasets: [{
                label: '# of Votes',
                data: stats['data'],
                backgroundColor: this.backgroundColor(this.classes.length),
                hoverBackgroundColor: this.hoverBackgroundColor(this.classes.length)
              }]
            }
          });
        });
    }
  }

}
