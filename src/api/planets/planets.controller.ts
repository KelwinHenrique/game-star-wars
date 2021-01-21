import {
  Controller,
  Get,
  BadRequestException,
  Param,
  Delete,
  Put,
  Body,
  Post,
  Query,
} from '@nestjs/common';
import {
  GetAllPlanetsService,
  GetPlanetByIdService,
  DeletePlanetByIdService,
  UpdatePlanetByIdService,
  CreatePlanetService,
} from './services';
import { BodyPlanetDto, QueryPaginateDto } from './dtos';

@Controller('planets')
export class PlanetsController {
  constructor(
    private getAllPlanetsService: GetAllPlanetsService,
    private getPlanetByIdService: GetPlanetByIdService,
    private deletePlanetByIdService: DeletePlanetByIdService,
    private updatePlanetByIdService: UpdatePlanetByIdService,
    private createPlanetService: CreatePlanetService,
  ) {}

  @Get()
  async getAllPlanets(@Query() query: QueryPaginateDto): Promise<any> {
    try {
      return await this.getAllPlanetsService.getAllPlanets(query);
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
    @Body() body: BodyPlanetDto,
  ): Promise<any> {
    try {
      return await this.updatePlanetByIdService.updatePlanetById(id, body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  async createPlanet(@Body() body: BodyPlanetDto): Promise<any> {
    try {
      return await this.createPlanetService.createPlanet(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
