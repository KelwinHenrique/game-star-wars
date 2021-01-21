import { Injectable } from '@nestjs/common';
import { PlanetsRepository } from '../../planets.repository';

@Injectable()
export class DeletePlanetByIdService {
  constructor(private readonly planetsRepository: PlanetsRepository) {}

  async deletePlanetById(id: string): Promise<any> {
    try {
      await this.planetsRepository.deletePlanetById(id);
      return { id };
    } catch (error) {
      return Promise.reject({ message: 'Error to delete planet' });
    }
  }
}
