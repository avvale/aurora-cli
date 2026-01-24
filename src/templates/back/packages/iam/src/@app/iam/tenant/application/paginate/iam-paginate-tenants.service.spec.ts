import { IamITenantRepository, IamMockTenantRepository } from '@app/iam/tenant';
import { IamPaginateTenantsService } from '@app/iam/tenant/application/paginate/iam-paginate-tenants.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTenantsService', () => {
  let service: IamPaginateTenantsService;
  let repository: IamITenantRepository;
  let mockRepository: IamMockTenantRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamPaginateTenantsService,
        IamMockTenantRepository,
        {
          provide: IamITenantRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamPaginateTenantsService);
    repository = module.get(IamITenantRepository);
    mockRepository = module.get(IamMockTenantRepository);
  });

  describe('main', () => {
    test('IamPaginateTenantsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate tenants', async () => {
      jest.spyOn(repository, 'paginate').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: mockRepository.collectionSource.slice(0, 10).length,
              count: mockRepository.collectionSource.slice(0, 10).length,
              rows: mockRepository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await service.main({
          offset: 0,
          limit: 10,
        }),
      ).toStrictEqual({
        total: mockRepository.collectionSource.slice(0, 10).length,
        count: mockRepository.collectionSource.slice(0, 10).length,
        rows: mockRepository.collectionSource.slice(0, 10),
      });
    });
  });
});
