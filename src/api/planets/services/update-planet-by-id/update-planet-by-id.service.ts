import { Injectable } from '@nestjs/common';
import { BodyPlanetDto } from './../../dtos';

@Injectable()
export class UpdatePlanetByIdService {
  async updatePlanetById(id: string, body: BodyPlanetDto): Promise<any> {
    try {
      return { id, body };
    } catch (error) {
      return Promise.reject({ message: 'Error to update planet' });
    }
  }
}
