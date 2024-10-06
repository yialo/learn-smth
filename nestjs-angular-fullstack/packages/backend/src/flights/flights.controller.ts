import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
} from '@nestjs/common';

import { Flight } from './entities/flight.entity';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  create(@Body() flight: Flight) {
    return this.flightsService.create(flight);
  }

  @Get()
  findAll() {
    return this.flightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(+id);
  }

  @Put(':id/update')
  update(@Param('id') id: number, @Body() flight: Flight) {
    flight.id = id;
    return this.flightsService.update(flight);
  }

  @Delete(':id/delete')
  delete(@Param('id') id: number) {
    return this.flightsService.delete(id);
  }

  @Get('query/:orig/:dest')
  query(@Param('orig') origin: string, @Param('dest') destination: string) {
    return this.flightsService.query(origin, destination);
  }

  @Get('cities/origins')
  getOrigins() {
    return this.flightsService.findAllOrigins();
  }

  @Get('cities/destinations')
  getDestinations() {
    return this.flightsService.findAllDestinations();
  }
}
