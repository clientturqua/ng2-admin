export class Feature {

  maxTime: number;
  minTime: number;
  avgTime: number;
  count: number;
  requestRouteTemplate: string;
  requestMethod: string;
  
  constructor(values: Object = {}) {
      Object.assign(this, values);  
  }
}
