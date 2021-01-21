import { Module } from '@nestjs/common';
import { PlanetsModule } from './api/planets/planets.module';

@Module({
  imports: [PlanetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
