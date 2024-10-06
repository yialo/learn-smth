import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TFlight } from './flight.model';

const API_ROOT = 'http://localhost:3200/';
const ENTRYPOINT = `${API_ROOT}flights/`;

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  constructor(private readonly http: HttpClient) {}

  getFlightsByQuery(origin: string, destination: string): Observable<any> {
    return this.http.get(`${ENTRYPOINT}query/${origin}/${destination}`);
  }

  getAllFlights(): Observable<any> {
    return this.http.get(ENTRYPOINT);
  }

  postFlight(flight: Omit<TFlight, 'id'>): Observable<any> {
    return this.http.post(ENTRYPOINT, flight);
  }

  getAllOrigins(): Observable<any> {
    return this.http.get(`${ENTRYPOINT}cities/origins`);
  }

  getAllDestinations(): Observable<any> {
    return this.http.get(`${ENTRYPOINT}cities/destinations`);
  }

  updateFlight(flight: TFlight): Observable<any> {
    return this.http.put(`${ENTRYPOINT}${flight.id}/update`, flight);
  }

  deleteFlight(id: number): Observable<any> {
    return this.http.delete(`${ENTRYPOINT}${id}/delete`);
  }
}
