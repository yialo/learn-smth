import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TFlight } from '../flight.model';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private readonly flightsService: FlightsService) {}

  flights: TFlight[] = [];

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.flightsService.getAllFlights().subscribe((flights) => {
      this.flights = flights;
    });
  }

  createFlight(form: NgForm) {
    const {
      value: { origin, destination, flight_number, depart, arrive, nonstop },
    } = form;

    const flight: Omit<TFlight, 'id'> = {
      origin,
      destination,
      flight_number,
      depart,
      arrive,
      nonstop,
    };

    this.flightsService.postFlight(flight).subscribe(() => {
      this.refresh();
    });
  }

  updateFlight(flight: TFlight) {
    this.flightsService.updateFlight(flight).subscribe((data) => {
      if (data?.affected) {
        this.refresh();
      } else {
        console.log('Update failed');
      }
    });
  }

  deleteFlight(id: number) {
    const needUpdate = window.confirm('Delete flight?');

    if (!needUpdate) {
      return;
    }

    return this.flightsService.deleteFlight(id).subscribe((data) => {
      if (data?.affected) {
        this.refresh();
      } else {
        console.log('Deletion failed');
      }
    });
  }
}
