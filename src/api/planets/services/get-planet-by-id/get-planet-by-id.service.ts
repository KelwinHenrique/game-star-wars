import { Injectable } from '@nestjs/common';
import { PlanetsRepository } from '../../planets.repository';
import { Planet } from './../../planets.schema';

@Injectable()
export class GetPlanetByIdService {
  constructor(private readonly planetsRepository: PlanetsRepository) {}

  async getPlanetById(id: string): Promise<any> {
    try {
      const planet: Planet = await this.planetsRepository.getPlanetById(id);
      return planet;
    } catch (error) {
      return Promise.reject({ message: 'Error to find planet' });
    }
  }
}
