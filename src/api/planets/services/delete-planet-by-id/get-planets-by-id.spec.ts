import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsRepository } from '../../planets.repository';
import { DeletePlanetByIdService } from './index';

const mockPlanetsRepository: any = () => ({
  deletePlanetById: jest.fn(() => {
    return {};
  }),
});

describe('DeletePlanetByIdService', () => {
  let planetsRepository: any;
  let deletePlanetByIdService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePlanetByIdService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepository,
        },
      ],
    }).compile();

    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    deletePlanetByIdService = module.get<DeletePlanetByIdService>(
      DeletePlanetByIdService,
    );
  });

  it('should be defined', () => {
    expect(deletePlanetByIdService).toBeDefined();
    expect(planetsRepository).toBeDefined();
  });

  it('should delete planet with id x', async () => {
    const response: any = await deletePlanetByIdService.deletePlanetById(
      '1234',
    );
    expect(response.id).toEqual('1234');
  });

  it('should return error when deletePlanetById goes wrong', async () => {
    const mockPlanetsRepositoryError: any = () => ({
      deletePlanetById: jest.fn(() => {
        return Promise.reject({ message: 'Server error' });
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePlanetByIdService,
        {
          provide: PlanetsRepository,
          useFactory: mockPlanetsRepositoryError,
        },
      ],
    }).compile();
    planetsRepository = module.get<PlanetsRepository>(PlanetsRepository);
    deletePlanetByIdService = module.get<DeletePlanetByIdService>(
      DeletePlanetByIdService,
    );

    expect.assertions(1);
    try {
      await deletePlanetByIdService.deletePlanetById('1234');
    } catch (error) {
      expect(error.message).toContain('Error to delete planet');
    }
  });
});
