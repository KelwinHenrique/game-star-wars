import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllPlanetsService {
  async getAllPlanets(): Promise<any> {
    try {
      return {
        planets: [],
      };
    } catch (error) {
      return Promise.reject({ message: 'Error to find planets' });
    }
  }
}
