import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  make: string;

  @Column('text')
  model: string;

  @Column('int')
  miles: number;
}
