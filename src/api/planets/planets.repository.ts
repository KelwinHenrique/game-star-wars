import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Planet } from './planets.schema';
import { QueryPaginateDto, PlanetDto } from './dtos';

@Injectable()
export class PlanetsRepository {
  constructor(@InjectModel(Planet.name) private planetModel: Model<Planet>) {}

  async createPlanet(bodyPlanetDto: PlanetDto): Promise<Planet> {
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

  async updatePlanetById(
    planetId: string,
    bodyPlanetDto: any,
  ): Promise<Planet> {
    return this.planetModel.findByIdAndUpdate(planetId, bodyPlanetDto);
  }

  async getPlanetsInSwapi(url: string): Promise<any> {
    return await axios.get(url);
  }

  async getPlanetByName(name: string): Promise<Planet> {
    return this.planetModel.findOne({ name });
  }
}
