import { Injectable } from '@nestjs/common';
import { PlanetsRepository } from '../../planets.repository';
import { QueryPaginateDto } from './../../dtos';
import { Planet } from './../../planets.schema';

@Injectable()
export class GetAllPlanetsService {
  constructor(private readonly planetsRepository: PlanetsRepository) {}

  async contAllPlanets(): Promise<number> {
    try {
      const count: number = await this.planetsRepository.countAllPlanets();
      return count;
    } catch (error) {
      return Promise.reject({ messageError: 'Error to count planets' });
    }
  }

  async doGetAllPlanets(query: QueryPaginateDto): Promise<any> {
    try {
      const planets: Planet[] = await this.planetsRepository.getAllPlanets(
        query,
      );
      return planets;
    } catch (error) {
      return Promise.reject({
        messageError: 'Error to find planets in database',
      });
    }
  }

  async getAllPlanets(query: QueryPaginateDto): Promise<any> {
    try {
      const planets: Planet[] = await this.doGetAllPlanets(query);
      const count: number = await this.contAllPlanets();
      return {
        count,
        planets,
      };
    } catch (error) {
      return Promise.reject({
        message: error.messageError || 'Error to find planets',
      });
    }
  }
}
