import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Planet } from './planets.schema';
import { BodyPlanetDto } from './dtos';

@Injectable()
export class PlanetsRepository {
  constructor(@InjectModel(Planet.name) private planetModel: Model<Planet>) {}

  async createPlanet(bodyPlanetDto: BodyPlanetDto): Promise<Planet> {
    const createdPlanet: Planet = new this.planetModel(bodyPlanetDto);
    return createdPlanet.save();
  }
}
