import { Module } from '@nestjs/common';
import { GetAllPlanetsService } from './services';
import { PlanetsController } from './planets.controller';

@Module({
  controllers: [PlanetsController],
  providers: [GetAllPlanetsService],
})
export class PlanetsModule {}
