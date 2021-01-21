import { Controller, Get, BadRequestException, Param } from '@nestjs/common';
import { GetAllPlanetsService, GetPlanetByIdService } from './services';

@Controller('planets')
export class PlanetsController {
  constructor(
    private getAllPlanetsService: GetAllPlanetsService,
    private getPlanetByIdService: GetPlanetByIdService,
  ) {}

  @Get()
  async getAllPlanets(): Promise<any> {
    try {
      return await this.getAllPlanetsService.getAllPlanets();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async getPlanetById(@Param('id') id: string): Promise<any> {
    try {
      return await this.getPlanetByIdService.getPlanetById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
