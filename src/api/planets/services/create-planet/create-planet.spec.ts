import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsRepository } from '../../planets.repository';
import { CreatePlanetService } from './index';

const mockPlanetsRepository: any = () => ({
  getPlanetByName: jest.fn(() => {
    return null;
  }),
  createPlanet: jest.fn((body) => {
    return body;
  }),
  getPlanetsInSwapi: jest.fn(() => {
    return {
      data: {
        results: [
          {
            name: 'terra',
            films: [],
          },
        ],
      },
    };
  }),
});

describe('CreatePlanetService', () => {
  let planetsRepository: any;
  let createPlanetService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePlanetService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepository,
        },
      ],
    }).compile();

    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    createPlanetService = module.get<CreatePlanetService>(CreatePlanetService);
  });

  it('should be defined', () => {
    expect(createPlanetService).toBeDefined();
    expect(planetsRepository).toBeDefined();
  });

  it('should create planet with all it is right', async () => {
    const response: any = await createPlanetService.createPlanet({
      name: 'terra',
      ground: 'mountains',
      weather: 'hot',
    });
    expect(response.films).toEqual(0);
    expect(response.name).toEqual('terra');
    expect(response.ground).toEqual('mountains');
    expect(response.weather).toEqual('hot');
  });

  it('should return error when getPlanetByName goes wrong', async () => {
    const mockPlanetsRepositoryError: any = () => ({
      getPlanetByName: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
      createPlanet: jest.fn((body) => {
        return body;
      }),
      getPlanetsInSwapi: jest.fn(() => {
        return {
          data: {
            results: [
              {
                name: 'terra',
                films: [],
              },
            ],
          },
        };
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePlanetService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepositoryError,
        },
      ],
    }).compile();
    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    createPlanetService = module.get<CreatePlanetService>(CreatePlanetService);

    expect.assertions(1);
    try {
      await createPlanetService.createPlanet({
        name: 'terra',
        ground: 'mountains',
        weather: 'hot',
      });
    } catch (error) {
      expect(error.message).toContain('Error to find planets by name');
    }
  });

  it('should return error when createPlanet goes wrong', async () => {
    const mockPlanetsRepositoryError: any = () => ({
      getPlanetByName: jest.fn(() => {
        return null;
      }),
      createPlanet: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
      getPlanetsInSwapi: jest.fn(() => {
        return {
          data: {
            results: [
              {
                name: 'terra',
                films: [],
              },
            ],
          },
        };
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePlanetService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepositoryError,
        },
      ],
    }).compile();
    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    createPlanetService = module.get<CreatePlanetService>(CreatePlanetService);

    expect.assertions(1);
    try {
      await createPlanetService.createPlanet({
        name: 'terra',
        ground: 'mountains',
        weather: 'hot',
      });
    } catch (error) {
      expect(error.message).toContain('Error to create planet');
    }
  });

  it('should return error when getPlanetsInSwapi goes wrong', async () => {
    const mockPlanetsRepositoryError: any = () => ({
      getPlanetByName: jest.fn(() => {
        return null;
      }),
      createPlanet: jest.fn((body) => {
        return body;
      }),
      getPlanetsInSwapi: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePlanetService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepositoryError,
        },
      ],
    }).compile();
    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    createPlanetService = module.get<CreatePlanetService>(CreatePlanetService);

    expect.assertions(1);
    try {
      await createPlanetService.createPlanet({
        name: 'terra',
        ground: 'mountains',
        weather: 'hot',
      });
    } catch (error) {
      expect(error.message).toContain('Error to get planets in swapi');
    }
  });

  it('should return error when find planet with same name', async () => {
    const mockPlanetsRepositoryError: any = () => ({
      getPlanetByName: jest.fn(() => {
        return {};
      }),
      createPlanet: jest.fn((body) => {
        return body;
      }),
      getPlanetsInSwapi: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePlanetService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepositoryError,
        },
      ],
    }).compile();
    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    createPlanetService = module.get<CreatePlanetService>(CreatePlanetService);

    expect.assertions(1);
    try {
      await createPlanetService.createPlanet({
        name: 'terra',
        ground: 'mountains',
        weather: 'hot',
      });
    } catch (error) {
      expect(error.message).toContain('Planet alredy exist');
    }
  });

  it('should return error when Planet does not exist in Star Wars World', async () => {
    expect.assertions(1);
    try {
      await createPlanetService.createPlanet({
        name: 'netuno',
        ground: 'mountains',
        weather: 'hot',
      });
    } catch (error) {
      expect(error.message).toContain(
        'Planet does not exist in Star Wars World',
      );
    }
  });
});
