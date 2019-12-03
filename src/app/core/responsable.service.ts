import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPoint} from "../shared/EndPoint";

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  constructor(private http: HttpClient) { }

  // Todo Get all responsable
    getResponsable$ = this.http.get(`${EndPoint.apiResps}`);

  // Todo Delete responsable

  // Todo Add responsable
}
