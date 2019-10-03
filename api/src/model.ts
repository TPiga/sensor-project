import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('satellite_positions')
export class SatellitePosition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  time: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  z: number;
}
