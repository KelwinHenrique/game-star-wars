import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatePlanetService {
  async createPlanet(body: any): Promise<any> {
    try {
      return { body };
    } catch (error) {
      return Promise.reject({ message: 'Error to create planet' });
    }
  }
}
