import { Injectable } from '@nestjs/common';

@Injectable()
export class GetPlanetByIdService {
  async getPlanetById(id: string): Promise<any> {
    try {
      return { id };
    } catch (error) {
      return Promise.reject({ message: 'Error to find planet' });
    }
  }
}
