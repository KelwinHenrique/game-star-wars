import {
  Controller,
  Get,
  BadRequestException,
  Param,
  Delete,
} from '@nestjs/common';
import {
  GetAllPlanetsService,
  GetPlanetByIdService,
  DeletePlanetByIdService,
} from './services';

@Controller('planets')
export class PlanetsController {
  constructor(
    private getAllPlanetsService: GetAllPlanetsService,
    private getPlanetByIdService: GetPlanetByIdService,
    private deletePlanetByIdService: DeletePlanetByIdService,
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

  @Delete(':id')
  async deletePlanetById(@Param('id') id: string): Promise<any> {
    try {
      return await this.deletePlanetByIdService.deletePlanetById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
