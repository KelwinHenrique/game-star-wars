import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdatePlanetByIdService {
  async updatePlanetById(id: string, body: any): Promise<any> {
    try {
      return { id, body };
    } catch (error) {
      return Promise.reject({ message: 'Error to update planet' });
    }
  }
}
