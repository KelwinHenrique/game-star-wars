import { Injectable } from '@nestjs/common';
import { PlanetsRepository } from '../../planets.repository';
import { Planet } from '../../planets.schema';

@Injectable()
export class GetPlanetByNameService {
  constructor(private readonly planetsRepository: PlanetsRepository) {}

  async getPlanetByName(name: string): Promise<any> {
    try {
      const planet: Planet = await this.planetsRepository.getPlanetByName(name);
      return planet;
    } catch (error) {
      return Promise.reject({ message: 'Error to find planet' });
    }
  }
}
