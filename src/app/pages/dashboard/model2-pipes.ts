import { Pipe, PipeTransform } from '@angular/core';
import { Feature } from './dashboard-model';
import * as moment from 'moment';

/*@Pipe({
    name: 'toReadableDate'
})

export class ToReadableDate implements PipeTransform {
    transform(value: number): number {
        return value / 1000;
    }
}*/

@Pipe({
    name: 'toReadableTime'
})

export class ToReadableTime implements PipeTransform {
    transform(value: number): number {
        return value / 1000;
    }
}

