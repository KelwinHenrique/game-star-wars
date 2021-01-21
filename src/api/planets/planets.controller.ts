import {
  Controller,
  Get,
  BadRequestException,
  Param,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import {
  GetAllPlanetsService,
  GetPlanetByIdService,
  DeletePlanetByIdService,
  UpdatePlanetByIdService,
} from './services';

@Controller('planets')
export class PlanetsController {
  constructor(
    private getAllPlanetsService: GetAllPlanetsService,
    private getPlanetByIdService: GetPlanetByIdService,
    private deletePlanetByIdService: DeletePlanetByIdService,
    private updatePlanetByIdService: UpdatePlanetByIdService,
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

  @Put(':id')
  async updatePlanetById(
    @Param('id') id: string,
    @Body() body: any,
  ): Promise<any> {
    try {
      return await this.updatePlanetByIdService.updatePlanetById(id, body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
