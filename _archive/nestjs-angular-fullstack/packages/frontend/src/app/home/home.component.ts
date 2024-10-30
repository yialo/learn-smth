import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TFlight } from '../flight.model';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  flights: TFlight[] = [];
  origins: string[] = [];
  destinations: string[] = [];

  constructor(private readonly flightsService: FlightsService) {}

  ngOnInit() {
    this.getAllOrigins();
    this.getAllDestinations();
  }

  query(form: NgForm) {
    const { origin, destination } = form.value;

    if (!origin) {
      console.log('No origin selected');
      return;
    }

    if (!destination) {
      console.log('No destination selected');
      return;
    }

    if (origin === destination) {
      console.log('Origin and destination should be different');
      return;
    }

    this.flightsService.getFlightsByQuery(origin, destination).subscribe((flights) => {
      this.flights = flights;
    });
  }

  private getAllOrigins() {
    this.flightsService.getAllOrigins().subscribe((origins: Pick<TFlight, 'origin'>[]) => {
      this.origins = origins.map((item) => item.origin);
    });
  }

  private getAllDestinations() {
    this.flightsService
      .getAllDestinations()
      .subscribe((destinations: Pick<TFlight, 'destination'>[]) => {
        this.destinations = destinations.map((item) => item.destination);
      });
  }
}
