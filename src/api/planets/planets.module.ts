import { Module } from '@nestjs/common';
import {
  GetAllPlanetsService,
  GetPlanetByIdService,
  DeletePlanetByIdService,
  UpdatePlanetByIdService,
} from './services';
import { PlanetsController } from './planets.controller';

@Module({
  controllers: [PlanetsController],
  providers: [
    GetAllPlanetsService,
    GetPlanetByIdService,
    DeletePlanetByIdService,
    UpdatePlanetByIdService,
  ],
})
export class PlanetsModule {}
