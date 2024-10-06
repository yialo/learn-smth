import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Car } from './cars/entities/car.entity';
import { CarsModule } from './cars/cars.module';
import { Flight } from './flights/entities/flight.entity';
import { FlightsModule } from './flights/flights.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'guest123',
      database: 'transportation',
      entities: [Car, Flight],
      synchronize: true,
    }),
    CarsModule,
    FlightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
