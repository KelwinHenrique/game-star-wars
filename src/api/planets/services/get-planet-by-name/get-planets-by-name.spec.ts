import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsRepository } from '../../planets.repository';
import { GetPlanetByNameService } from './index';

const mockPlanetsRepository: any = () => ({
  getPlanetByName: jest.fn((name: string) => {
    return {
      _id: '1234',
      name,
      ground: 'dry',
      weather: 'hot',
      createdAt: '2021-01-21T03:43:28.273Z',
      updatedAt: '2021-01-21T04:37:28.960Z',
      __v: 0,
    };
  }),
});

describe('GetPlanetByNameService', () => {
  let planetsRepository: any;
  let getPlanetByNameService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPlanetByNameService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepository,
        },
      ],
    }).compile();

    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    getPlanetByNameService = module.get<GetPlanetByNameService>(
      GetPlanetByNameService,
    );
  });

  it('should be defined', () => {
    expect(getPlanetByNameService).toBeDefined();
    expect(planetsRepository).toBeDefined();
  });

  it('should find planets with name', async () => {
    const response: any = await getPlanetByNameService.getPlanetByName('terra');
    expect(response._id).toEqual('1234');
    expect(response.name).toEqual('terra');
    expect(response.ground).toEqual('dry');
    expect(response.weather).toEqual('hot');
  });

  it('should return error when getPlanetByName goes wrong', async () => {
    const mockPlanetsRepositoryError: any = () => ({
      getPlanetByName: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPlanetByNameService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepositoryError,
        },
      ],
    }).compile();
    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    getPlanetByNameService = module.get<GetPlanetByNameService>(
      GetPlanetByNameService,
    );

    expect.assertions(1);
    try {
      await getPlanetByNameService.getPlanetByName('terra');
    } catch (error) {
      expect(error.message).toContain('Error to find planet');
    }
  });
});
