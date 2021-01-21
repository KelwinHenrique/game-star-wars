import { Injectable } from '@nestjs/common';
import { PlanetsRepository } from '../../planets.repository';
import { BodyPlanetDto, PlanetDto } from './../../dtos';

@Injectable()
export class CreatePlanetService {
  constructor(private readonly planetsRepository: PlanetsRepository) {}

  private async verifyName(name: string): Promise<any> {
    try {
      const planet: PlanetDto = await this.planetsRepository.getPlanetByName(
        name,
      );
      if (planet) {
        return Promise.reject({
          messageError: 'Planet alredy exist',
        });
      }
    } catch (error) {
      return Promise.reject({ messageError: 'Error to find planets by name' });
    }
  }

  private async verifyIfPlanetIsStarWarsWorld(
    name: string,
    planetsInApi: any,
  ): Promise<number> {
    const foundPlanet: any = planetsInApi.find(
      (planet: any) => planet.name === name,
    );
    return foundPlanet
      ? foundPlanet.films
      : Promise.reject({
          messageError: 'Planet does not exist in Star Wars World',
        });
  }

  private async getPlanetsInSwapi(
    nextPage: string,
    planetsInApi: any,
  ): Promise<any> {
    try {
      const { data } = await this.planetsRepository.getPlanetsInSwapi(nextPage);
      data.results.map((planet: any) => {
        planetsInApi.push({
          name: planet.name,
          films: planet.films.length,
        });
      });
      if (data.next) {
        await this.getPlanetsInSwapi(data.next, planetsInApi);
      }
    } catch (error) {
      return Promise.reject({ messageError: 'Error to get planets in swapi' });
    }
  }

  async createPlanet(body: BodyPlanetDto): Promise<any> {
    try {
      const planetsInApi: any = [];
      await this.verifyName(body.name);
      await this.getPlanetsInSwapi(
        'http://swapi.dev/api/planets/?limit=60',
        planetsInApi,
      );
      const films: number = await this.verifyIfPlanetIsStarWarsWorld(
        body.name,
        planetsInApi,
      );
      const planet: PlanetDto = {
        name: body.name,
        ground: body.ground,
        weather: body.weather,
        films,
      };
      return await this.planetsRepository.createPlanet(planet);
    } catch (error) {
      return Promise.reject({
        message: error.messageError || 'Error to create planet',
      });
    }
  }
}
