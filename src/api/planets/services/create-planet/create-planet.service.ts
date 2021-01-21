import { Injectable } from '@nestjs/common';
import { PlanetsRepository } from '../../planets.repository';
import { BodyPlanetDto } from './../../dtos';

@Injectable()
export class CreatePlanetService {
  constructor(private readonly planetsRepository: PlanetsRepository) {}

  async createPlanet(body: BodyPlanetDto): Promise<any> {
    try {
      await this.planetsRepository.createPlanet(body);
      return { body };
    } catch (error) {
      return Promise.reject({ message: 'Error to create planet' });
    }
  }
}
