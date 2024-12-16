import { Controller, Get } from '@nestjs/common';
import { BusinessService } from '../services/business.service';

@Controller('api/business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('tree')
  async getBusinessTree() {
    return this.businessService.getBusinessTree();
  }

  @Get('entry/:id')
  async getBusinessEntry(@Param('id') id: string) {
    return this.businessService.getBusinessEntry(id);
  }
} 