import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { optionsUrl } from '../../../assets/config';
import { TravelOptions } from '../interfaces/travel-options.interface';

@Injectable({
  providedIn: 'root'
})
export class TravelOptionsService {

  headers: any = new HttpHeaders().set('Content-Type', 'image/png');

  constructor(private http: HttpClient) { }

  getOptions(): Observable<TravelOptions> {
    return this.http.get<TravelOptions>(optionsUrl);
  }

  getDataFromJson(): Observable<TravelOptions> {
    return this.http.get<TravelOptions>('assets/QuoteRequest.json');
  }
}
