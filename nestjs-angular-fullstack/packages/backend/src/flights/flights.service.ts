import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { Flight } from './entities/flight.entity';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightsRepository: Repository<Flight>,
  ) {}

  create(flight: Flight): Promise<Flight> {
    return this.flightsRepository.save(flight);
  }

  findAll(): Promise<Flight[]> {
    return this.flightsRepository.find({ order: { flight_number: 'ASC' } });
  }

  findOne(id: number): Promise<Flight> {
    return this.flightsRepository.findOne(id);
  }

  update(flight: Flight): Promise<UpdateResult> {
    return this.flightsRepository.update(flight.id, flight);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.flightsRepository.delete(id);
  }

  query(origin: string, destination: string): Promise<Flight[]> {
    return this.flightsRepository.find({ origin, destination });
  }

  findAllOrigins() {
    return this.flightsRepository.query('SELECT DISTINCT origin FROM flights');
  }

  findAllDestinations() {
    return this.flightsRepository.query(
      'SELECT DISTINCT destination FROM flights',
    );
  }
}
