import { Module } from '@nestjs/common';
import {
  GetAllPlanetsService,
  GetPlanetByIdService,
  DeletePlanetByIdService,
} from './services';
import { PlanetsController } from './planets.controller';

@Module({
  controllers: [PlanetsController],
  providers: [
    GetAllPlanetsService,
    GetPlanetByIdService,
    DeletePlanetByIdService,
  ],
})
export class PlanetsModule {}
