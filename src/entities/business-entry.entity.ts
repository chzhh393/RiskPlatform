import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BusinessScenario } from './business-scenario.entity';

@Entity()
export class BusinessEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  key: string;

  @Column()
  level: string;

  @Column()
  httpEntry: string;

  @ManyToOne(() => BusinessScenario, scenario => scenario.entries)
  scenario: BusinessScenario;
} 