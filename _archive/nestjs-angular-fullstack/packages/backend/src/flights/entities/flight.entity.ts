import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('flights')
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  origin: string;

  @Column('varchar', { length: 30 })
  destination: string;

  @Column('int')
  flight_number: number;

  @Column('timestamp with time zone')
  depart: string;

  @Column('timestamp with time zone')
  arrive: string;

  @Column('boolean')
  nonstop: boolean;
}
