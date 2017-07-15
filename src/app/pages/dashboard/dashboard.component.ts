import { Component } from '@angular/core';
import { Feature } from './dashboard-model';
import { Feature2 } from './dashboard-model2';
import { map } from 'rxjs/operator/map';
import * as moment from 'moment';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { RequestDetailService } from './dashboard-service';


@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html',
  providers: [RequestDetailService],
})
export class Dashboard {

  dateend: DateModel;
  datestart: DateModel;
  Math: any;
  acquisitionChannels = 'En Yüksek ';
  // orijinal data
  datas1: Feature[] = [];
  datas2: Feature2[] = [];
  // en yüksek reqeust data

  max: number;

  dataForMostResponseTime: Feature[] = []; //for most resp time
  dataForAvgRequestTime: Feature[] = []; //for avg req time
  dataForCount: Feature[] = [];            // for req count
  dataForMostDate: Feature2[] = [];
  dataForChart: any = {};
  optionForChart: any = {};
  constructor(private requestDetailService: RequestDetailService) {
    this.Math = Math;
    let dateEndTemp = moment();
    let dateBeginTemp = moment().add('d', -1);

    this.dateend = new DateModel({
      day: '13',
      formatted: dateEndTemp.format('YYYY-MM-DD'),
      month: '07',
      year: dateEndTemp.year().toString(),
      momentObj: dateEndTemp
    });
    this.datestart = new DateModel({
      day: dateBeginTemp.day().toString(),
      formatted: dateBeginTemp.format('YYYY-MM-DD'),
      month: '07',
      year: dateBeginTemp.year().toString(),
      momentObj: dateBeginTemp
    })



  }



  // FOR LINECHART 
  sortFeatureDate() {
    this.dataForMostDate = this.datas2
      .sort((a, b) => {
        if (a.requestDate > b.requestDate) {
          return -1;
        }
        if (a.requestDate < b.requestDate) {
          return 1;
        }

        return 0;
      });
  }

  // FOR MOST RESPONSE TIME
  calculateMostResponseTime(filter) {
    console.error('error.message');

    if (typeof (filter) === 'undefined' || filter === null || filter === 'ALL') {

      this.dataForMostResponseTime = this.datas1
        .sort((a, b) => {
          if (a.maxTime > b.maxTime) {
            return -1;
          }
          if (a.maxTime < b.maxTime) {
            return 1;
          }

          return 0;
        }).filter((tempData, index) => {
          if (index < 6) {
            return true;
          }
          return false;
        });

      //this.dataForMostResponseTime.splice(0, 1);

    } else {
      this.dataForMostResponseTime = this.datas1
        .sort((a, b) => {
          if (a.maxTime > b.maxTime) {
            return -1;
          }
          if (a.maxTime < b.maxTime) {
            return 1;
          }
          return 0;
        }).filter((tempData, index) => {
          if (tempData.requestMethod === filter) {
            return true;
          }
          return false;
        }).filter((tempData, index) => {
          if (index < 5) {
            return true;
          }
          return false;
        });

    }
  }
  // FOR AVERAGE REQUEST TIME
  calculateAvgResponseTime(filter) {
    console.error('error.message');

    if (typeof (filter) === 'undefined' || filter === null || filter === 'ALL') {

      this.dataForAvgRequestTime = this.datas1
        .sort((a, b) => {
          if (a.avgTime > b.avgTime) {
            return -1;
          }
          if (a.avgTime < b.avgTime) {
            return 1;
          }

          return 0;
        }).filter((tempData, index) => {
          if (index < 6) {
            return true;
          }
          return false;
        });
      this.dataForAvgRequestTime.splice(0, 1);



    } else {
      this.dataForAvgRequestTime = this.datas1
        .sort((a, b) => {
          if (a.avgTime > b.avgTime) {
            return -1;
          }
          if (a.avgTime < b.avgTime) {
            return 1;
          }
          return 0;
        }).filter((tempData, index) => {
          if (tempData.requestMethod === filter) {
            return true;
          }
          return false;
        }).filter((tempData, index) => {
          if (index < 5) {
            return true;
          }
          return false;
        });

    }
  }
  // FOR COUNT REQUEST 
  calculateRequestCount(filter) {
    console.error('error.message');

    if (typeof (filter) === 'undefined' || filter === null || filter === 'ALL') {

      this.dataForCount = this.datas1
        .sort((a, b) => {
          if (a.count > b.count) {
            return -1;
          }
          if (a.count < b.count) {
            return 1;
          }

          return 0;
        }).filter((tempData, index) => {
          if (index < 5) {
            return true;
          }
          return false;
        });


    } else {
      this.dataForCount = this.datas1
        .sort((a, b) => {
          if (a.count > b.count) {
            return -1;
          }
          if (a.count < b.count) {
            return 1;
          }
          return 0;
        }).filter((tempData, index) => {
          if (tempData.requestMethod === filter) {
            return true;
          }
          return false;
        }).filter((tempData, index) => {
          if (index < 5) {
            return true;
          }
          return false;
        });

    }

  }
  // PERCENTAGE FOR HTML
  calculatePercentage(portion: number, denominator: number): Number {
    return portion * 100 / denominator;
  }
  refreshData() {



    this.requestDetailService.getFeatureWithPromise(this.datestart.momentObj, this.dateend.momentObj)
      .then(res => {
        this.datas1 = res;




        this.calculateMostResponseTime(null); // for most req time
        this.calculateAvgResponseTime(null); // for avg req time
        this.calculateRequestCount(null); // for req count
        this.sortFeatureDate();

        this.dataForChart = {
          values: ['1000', 2000, 3000, 5000, 7000],//
          labels: ['01/07', '02/07', '03/07', '04/07'],
          series: [
            [6, 10, 0, 12, 14], // comment
            [10, 45, 30, 14, 12],
            [34, 12, 12, 40, 50],
            [10, 43, 25, 22, 16],
          ],
        };
        this.optionForChart = {
          fullWidth: true,
          height: '300px',
          chartPadding: {
            right: 40,
          },
        };
      })


    console.log('Secilen başlangıç Tarihi' + this.datestart.formatted);
    console.log('Seçilen bitiş Tarihi' + this.dateend.formatted);
  }
}