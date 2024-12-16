import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessScenario } from '../entities/business-scenario.entity';
import { BusinessEntry } from '../entities/business-entry.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(BusinessScenario)
    private scenarioRepo: Repository<BusinessScenario>,
    @InjectRepository(BusinessEntry)
    private entryRepo: Repository<BusinessEntry>,
  ) {}

  async getBusinessTree() {
    const scenarios = await this.scenarioRepo.find({
      relations: ['entries'],
    });
    return scenarios;
  }

  async getBusinessEntry(id: string) {
    return this.entryRepo.findOne(id);
  }
} 