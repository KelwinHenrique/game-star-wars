import {
  Controller,
  Get,
  BadRequestException,
  Param,
  Delete,
  Put,
  Body,
  Post,
  Query,
} from '@nestjs/common';
import {
  GetAllPlanetsService,
  GetPlanetByIdService,
  DeletePlanetByIdService,
  UpdatePlanetByIdService,
  CreatePlanetService,
} from './services';
import { BodyPlanetDto, QueryPaginateDto } from './dtos';

@Controller('planets')
export class PlanetsController {
  constructor(
    private getAllPlanetsService: GetAllPlanetsService,
    private getPlanetByIdService: GetPlanetByIdService,
    private deletePlanetByIdService: DeletePlanetByIdService,
    private updatePlanetByIdService: UpdatePlanetByIdService,
    private createPlanetService: CreatePlanetService,
  ) {}

  /**
   * @api {get} /planets Get all planets
   * @apiName getAllPlanet
   * @apiGroup Planet
   * @apiSuccessExample {json} Success-Response:
   * {
   *  "count": 1,
   *  "planets": [
   *   {
   *    "name": "Tatooine",
   *    "ground": "Poroso",
   *    "weather": "Hot",
   *    "films": 5,
   *    "_id": "6008f85b149ae8c5461e6c05",
   *    "createdAt": "2021-01-21T03:43:23.157Z",
   *    "updatedAt": "2021-01-21T03:43:23.157Z",
   *    "__v": 0
   *   }
   *  ]
   * }
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 400 Not Found
   * {
   *  "statusCode": 400,
   *  "message": "Error to find planets",
   *  "error": "Bad Request"
   * }
   */
  @Get()
  async getAllPlanets(@Query() query: QueryPaginateDto): Promise<any> {
    try {
      return await this.getAllPlanetsService.getAllPlanets(query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * @api {get} /planets/:id Get a planet by id
   * @apiName getPlanet
   * @apiGroup Planet
   * @apiParamExample {json} Request-Example:
   * HOST/planets/:id
   * @apiSuccessExample {json} Success-Response:
   * {
   *  "name": "Tatooine",
   *  "ground": "Poroso",
   *  "weather": "Hot",
   *  "films": 5,
   *  "_id": "6008f85b149ae8c5461e6c05",
   *  "createdAt": "2021-01-21T03:43:23.157Z",
   *  "updatedAt": "2021-01-21T03:43:23.157Z",
   *  "__v": 0
   * }
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 400 Not Found
   * {
   *  "statusCode": 400,
   *  "message": "Error to find planet",
   *  "error": "Bad Request"
   * }
   */
  @Get(':id')
  async getPlanetById(@Param('id') id: string): Promise<any> {
    try {
      return await this.getPlanetByIdService.getPlanetById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * @api {delete} /planets/:id Delete a planet
   * @apiName deletePlanet
   * @apiGroup Planet
   * @apiParamExample {json} Request-Example:
   * HOST/planets/:id
   * @apiSuccessExample {json} Success-Response:
   * {
   *  "id": "planet_id"
   * }
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 400 Not Found
   * {
   *  "statusCode": 400,
   *  "message": "Error to delete planet",
   *  "error": "Bad Request"
   * }
   */
  @Delete(':id')
  async deletePlanetById(@Param('id') id: string): Promise<any> {
    try {
      return await this.deletePlanetByIdService.deletePlanetById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * @api {put} /planets/:id Update a planet
   * @apiName updatePlanet
   * @apiGroup Planet
   * @apiParam {String} name  Planet's name.
   * @apiParam {String} ground Planet's ground.
   * @apiParam {String} weather Planet's weather.
   * @apiParamExample {json} Request-Example:
   * HOST/planets/:id
   * {
   *  "name": "Terra",
   *  "ground": "Poroso",
   *  "weather": "Hot"
   * }
   * @apiSuccessExample {json} Success-Response:
   * {
   *  "id": "planet_id"
   *  "name": "Terra",
   *  "ground": "Poroso",
   *  "weather": "Hot"
   * }
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 400 Not Found
   * {
   *  "statusCode": 400,
   *  "message": "Error to update planet",
   *  "error": "Bad Request"
   * }
   * HTTP/1.1 400 Not Found
   * {
   *  "statusCode": 400,
   *  "message": [
   *    "name must be a string",
   *    "Name cannot be empty",
   *    "Weather cannot be empty",
   *    "ground must be a string",
   *    "Ground cannot be empty"
   *   ],
   *  "error": "Bad Request"
   * }
   */
  @Put(':id')
  async updatePlanetById(
    @Param('id') id: string,
    @Body() body: BodyPlanetDto,
  ): Promise<any> {
    try {
      return await this.updatePlanetByIdService.updatePlanetById(id, body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * @api {post} /planets Create new planet
   * @apiName createPlanet
   * @apiGroup Planet
   * @apiParam {String} name  Planet's name.
   * @apiParam {String} ground Planet's ground.
   * @apiParam {String} weather Planet's weather.
   * @apiParamExample {json} Request-Example:
   * HOST/planets/:id
   * {
   *  "name": "Terra",
   *  "ground": "Poroso",
   *  "weather": "Hot"
   * }
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 201
   * {
   *  "name": "Tatooine",
   *  "ground": "Poroso",
   *  "weather": "Hot",
   *  "films": 5,
   *  "_id": "6008f85b149ae8c5461e6c05",
   *  "createdAt": "2021-01-21T03:43:23.157Z",
   *  "updatedAt": "2021-01-21T03:43:23.157Z",
   *  "__v": 0
   * }
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 400 Not Found
   * {
   *  "statusCode": 400,
   *  "message": "Error to create planet",
   *  "error": "Bad Request"
   * }
   * HTTP/1.1 400 Not Found
   * {
   *  "statusCode": 400,
   *  "message": [
   *    "name must be a string",
   *    "Name cannot be empty",
   *    "Weather cannot be empty",
   *    "ground must be a string",
   *    "Ground cannot be empty"
   *   ],
   *  "error": "Bad Request"
   * }
   */
  @Post()
  async createPlanet(@Body() body: BodyPlanetDto): Promise<any> {
    try {
      return await this.createPlanetService.createPlanet(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
