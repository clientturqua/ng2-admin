import { Injectable } from '@angular/core';
import { Feature } from './dashboard-model';
import { Feature2 } from './dashboard-model2';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment'

@Injectable()
export class RequestDetailService {
    handleErrorPromise(arg0: any): any {
        throw new Error("Method not implemented.");
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    datas1: Feature[] = [];
    datas2: Feature2[] = [];



    constructor(private http: Http) {

        // this.getFeatureWithPromise(datestart, dateend)
        //     .then(res => {
        //         var temp: Feature[] = [];

        //         for (var index = 0; index < res.length; index++) {
        //             var element = new Feature(res[index]);
        //             temp.push(element);
        //         }
        //         this.datas1 = temp;
        //     })


        // this.getFeature2WithPromise(datestart, dateend)
        //     .then(res => {
        //         var temp: Feature2[] = [];

        //         for (var index = 0; index < res.length; index++) {
        //             var element = new Feature2(res[index]);
        //             temp.push(element);
        //         }
        //         this.datas2 = temp;
        //     })


    }

    getAllDatas1(): Feature[] {
        return this.datas1;
    }

    getFeatureWithPromise(datestart: moment.Moment, dateend: moment.Moment): Promise<Feature[]> {
        return this.http.get('http://camiila-server-logger.azurewebsites.net/api/requestLogsDetails/RequestLogsGroupByRouteTemplate/' + datestart.format('YYYYMMDD') + '/' + dateend.format('YYYYMMDD')).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getFeature2WithPromise(datestart: moment.Moment, dateend: moment.Moment): Promise<Feature2[]> {
        return this.http.get('http://http://camiila-server-logger.azurewebsites.net/api/requestLogsDetails/RequestLogsStats/' + datestart.format('YYYYMMDD') + '/' + dateend.format('YYYYMMDD')).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }


}