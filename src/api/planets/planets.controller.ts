import { Controller, Get, BadRequestException } from '@nestjs/common';
import { GetAllPlanetsService } from './services';

@Controller('planets')
export class PlanetsController {
  constructor(private getAllPlanetsService: GetAllPlanetsService) {}

  @Get()
  async getAllPlanets(): Promise<any> {
    try {
      return await this.getAllPlanetsService.getAllPlanets();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
