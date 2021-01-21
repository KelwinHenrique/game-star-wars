import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsRepository } from '../../planets.repository';
import { GetPlanetByIdService } from './index';

const mockPlanetsRepository: any = () => ({
  getPlanetById: jest.fn((planetId: string) => {
    return {
      _id: planetId,
      name: 'terra',
      ground: 'dry',
      weather: 'hot',
      createdAt: '2021-01-21T03:43:28.273Z',
      updatedAt: '2021-01-21T04:37:28.960Z',
      __v: 0,
    };
  }),
});

describe('GetPlanetByIdService', () => {
  let planetsRepository: any;
  let getPlanetByIdService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPlanetByIdService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepository,
        },
      ],
    }).compile();

    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    getPlanetByIdService = module.get<GetPlanetByIdService>(
      GetPlanetByIdService,
    );
  });

  it('should be defined', () => {
    expect(getPlanetByIdService).toBeDefined();
    expect(planetsRepository).toBeDefined();
  });

  it('should find planets with id', async () => {
    const response: any = await getPlanetByIdService.getPlanetById('1234');
    expect(response._id).toEqual('1234');
    expect(response.name).toEqual('terra');
    expect(response.ground).toEqual('dry');
    expect(response.weather).toEqual('hot');
  });

  it('should return error when getPlanetById goes wrong', async () => {
    const mockPlanetsRepositoryError: any = () => ({
      getPlanetById: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPlanetByIdService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepositoryError,
        },
      ],
    }).compile();
    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    getPlanetByIdService = module.get<GetPlanetByIdService>(
      GetPlanetByIdService,
    );

    expect.assertions(1);
    try {
      await getPlanetByIdService.getPlanetById('1234');
    } catch (error) {
      expect(error.message).toContain('Error to find planet');
    }
  });
});
