import { Injectable } from '@nestjs/common';
import { PlanetsRepository } from '../../planets.repository';
import { QueryPaginateDto } from './../../dtos';
import { Planet } from './../../planets.schema';

@Injectable()
export class GetAllPlanetsService {
  constructor(private readonly planetsRepository: PlanetsRepository) {}

  async getAllPlanets(query: QueryPaginateDto): Promise<any> {
    try {
      const planets: Planet[] = await this.planetsRepository.getAllPlanets(
        query,
      );
      const count: number = await this.planetsRepository.countAllPlanets();
      return {
        count,
        planets,
      }
    } catch (error) {
      return Promise.reject({ message: 'Error to find planets' });
    }
  }
}
