import { Module } from '@nestjs/common';
import {
  GetAllPlanetsService,
  GetPlanetByIdService,
  DeletePlanetByIdService,
  UpdatePlanetByIdService,
  CreatePlanetService,
} from './services';
import { PlanetsController } from './planets.controller';

@Module({
  controllers: [PlanetsController],
  providers: [
    GetAllPlanetsService,
    GetPlanetByIdService,
    DeletePlanetByIdService,
    UpdatePlanetByIdService,
    CreatePlanetService,
  ],
})
export class PlanetsModule {}
