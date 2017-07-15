/*For SpecialStats */
export class Feature2 {

  requestRouteTemplate: string;
  requestMethod: string;
  numberCount: number;
  requestDate: string;
  
  constructor(values: Object = {}) {
      Object.assign(this, values);  
  }
}
