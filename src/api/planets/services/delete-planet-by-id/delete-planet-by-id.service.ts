import { Injectable } from '@nestjs/common';

@Injectable()
export class DeletePlanetByIdService {
  async deletePlanetById(id: string): Promise<any> {
    try {
      return { id };
    } catch (error) {
      return Promise.reject({ message: 'Error to delete planet' });
    }
  }
}
