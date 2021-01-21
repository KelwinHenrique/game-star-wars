import { Module } from '@nestjs/common';
import { GetAllPlanetsService, GetPlanetByIdService } from './services';
import { PlanetsController } from './planets.controller';

@Module({
  controllers: [PlanetsController],
  providers: [GetAllPlanetsService, GetPlanetByIdService],
})
export class PlanetsModule {}
