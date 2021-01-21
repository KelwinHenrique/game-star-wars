import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsRepository } from '../../planets.repository';
import { GetAllPlanetsService } from './index';

const mockPlanetsRepository: any = () => ({
  getAllPlanets: jest.fn(() => {
    return [
      {
        _id: '6008f860149ae8c5461e6c06',
        name: 'terra',
        ground: 'dry',
        weather: 'hot',
        createdAt: '2021-01-21T03:43:28.273Z',
        updatedAt: '2021-01-21T04:37:28.960Z',
        __v: 0,
      },
      {
        _id: '6009011da97c05d0f6393cee',
        name: 'urano',
        ground: 'sandy',
        weather: 'cold',
        createdAt: '2021-01-21T04:20:45.223Z',
        updatedAt: '2021-01-21T04:20:45.223Z',
        __v: 0,
      },
    ];
  }),
  countAllPlanets: jest.fn(() => {
    return 2;
  }),
});

describe('GetAllPlanetsService', () => {
  let planetsRepository: any;
  let getAllPlanetsService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllPlanetsService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepository,
        },
      ],
    }).compile();

    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    getAllPlanetsService = module.get<GetAllPlanetsService>(
      GetAllPlanetsService,
    );
  });

  it('should be defined', () => {
    expect(getAllPlanetsService).toBeDefined();
    expect(planetsRepository).toBeDefined();
  });

  it('should find planets with all it is right', async () => {
    const response: any = await getAllPlanetsService.getAllPlanets();
    expect(response.count).toEqual(2);
    expect(response.planets[0].name).toEqual('terra');
    expect(response.planets[0].ground).toEqual('dry');
    expect(response.planets[0].weather).toEqual('hot');
  });

  it('should return error when getAllPlanets goes wrong', async () => {
    const mockPlanetsRepositoryError: any = () => ({
      getAllPlanets: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
      countAllPlanets: jest.fn(() => {
        return 2;
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllPlanetsService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepositoryError,
        },
      ],
    }).compile();
    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    getAllPlanetsService = module.get<GetAllPlanetsService>(
      GetAllPlanetsService,
    );

    expect.assertions(1);
    try {
      await getAllPlanetsService.getAllPlanets();
    } catch (error) {
      expect(error.message).toContain('Error to find planets in database');
    }
  });

  it('should return error when countAllPlanets goes wrong', async () => {
    const mockPlanetsRepositoryError: any = () => ({
      getAllPlanets: jest.fn(() => {
        return [];
      }),
      countAllPlanets: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllPlanetsService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepositoryError,
        },
      ],
    }).compile();
    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    getAllPlanetsService = module.get<GetAllPlanetsService>(
      GetAllPlanetsService,
    );

    expect.assertions(1);
    try {
      await getAllPlanetsService.getAllPlanets();
    } catch (error) {
      expect(error.message).toContain('Error to count planets');
    }
  });
});
