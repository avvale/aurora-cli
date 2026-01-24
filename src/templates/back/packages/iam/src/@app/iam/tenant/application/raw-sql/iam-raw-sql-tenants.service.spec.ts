import { IamITenantRepository, IamMockTenantRepository } from '@app/iam/tenant';
import { IamRawSQLTenantsService } from '@app/iam/tenant/application/raw-sql/iam-raw-sql-tenants.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamRawSQLTenantsService ', () => {
  let service: IamRawSQLTenantsService;
  let repository: IamITenantRepository;
  let mockRepository: IamMockTenantRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamRawSQLTenantsService,
        IamMockTenantRepository,
        {
          provide: IamITenantRepository,
          useValue: {
            rawSQL: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamRawSQLTenantsService);
    repository = module.get(IamITenantRepository);
    mockRepository = module.get(IamMockTenantRepository);
  });

  describe('main', () => {
    test('RawSQLTenantsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get tenants', async () => {
      jest
        .spyOn(repository, 'rawSQL')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});
