import { Injectable } from '@nestjs/common';
import { PlanetsRepository } from '../../planets.repository';
import { BodyPlanetDto } from './../../dtos';

@Injectable()
export class UpdatePlanetByIdService {
  constructor(private readonly planetsRepository: PlanetsRepository) {}

  async updatePlanetById(id: string, body: BodyPlanetDto): Promise<any> {
    try {
      await this.planetsRepository.updatePlanetById(id, body);
      return { id, ...body };
    } catch (error) {
      return Promise.reject({ message: 'Error to update planet' });
    }
  }
}
