import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../../config/config.module';
import {
  GetAllPlanetsService,
  GetPlanetByIdService,
  DeletePlanetByIdService,
  UpdatePlanetByIdService,
  CreatePlanetService,
} from './services';
import { PlanetsController } from './planets.controller';
import { PlanetsRepository } from './planets.repository';
import { Planet, PlanetSchema } from './planets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Planet.name, schema: PlanetSchema }]),
    ConfigModule,
  ],
  controllers: [PlanetsController],
  providers: [
    GetAllPlanetsService,
    GetPlanetByIdService,
    DeletePlanetByIdService,
    UpdatePlanetByIdService,
    CreatePlanetService,
    PlanetsRepository,
  ],
})
export class PlanetsModule {}
