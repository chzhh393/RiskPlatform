import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessScenario } from '../entities/business-scenario.entity';
import { BusinessEntry } from '../entities/business-entry.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(BusinessScenario)
    private scenarioRepository: Repository<BusinessScenario>,
    @InjectRepository(BusinessEntry)
    private entryRepository: Repository<BusinessEntry>
  ) {}

  async getBusinessTree() {
    const scenarios = await this.scenarioRepository.find({
      relations: ['entries'],
    });
    return scenarios;
  }

  async getBusinessEntry(id: string) {
    return this.entryRepository.findOne(id);
  }
} 