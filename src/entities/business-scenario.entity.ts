import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BusinessEntry } from './business-entry.entity';

@Entity()
export class BusinessScenario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  key: string;

  @OneToMany(() => BusinessEntry, entry => entry.scenario)
  entries: BusinessEntry[];
} 