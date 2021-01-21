import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Planet } from './planets.schema';
import { BodyPlanetDto, QueryPaginateDto } from './dtos';

@Injectable()
export class PlanetsRepository {
  constructor(@InjectModel(Planet.name) private planetModel: Model<Planet>) {}

  async createPlanet(bodyPlanetDto: BodyPlanetDto): Promise<Planet> {
    const createdPlanet: Planet = new this.planetModel(bodyPlanetDto);
    return createdPlanet.save();
  }

  async getAllPlanets(query: QueryPaginateDto): Promise<Planet[]> {
    return this.planetModel
      .find()
      .skip(query.limit * query.page)
      .limit(query.limit * 1)
      .sort([['date', 1]]);
  }

  async countAllPlanets(): Promise<number> {
    return this.planetModel.countDocuments();
  }

  async getPlanetById(planetId: string): Promise<Planet> {
    return this.planetModel.findById(planetId);
  }

  async deletePlanetById(planetId: string): Promise<Planet> {
    return this.planetModel.findByIdAndDelete(planetId);
  }
}
