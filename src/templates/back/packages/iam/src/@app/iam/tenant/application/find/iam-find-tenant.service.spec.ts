import { IamITenantRepository, IamMockTenantRepository } from '@app/iam/tenant';
import { IamFindTenantService } from '@app/iam/tenant/application/find/iam-find-tenant.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantService', () => {
  let service: IamFindTenantService;
  let repository: IamITenantRepository;
  let mockRepository: IamMockTenantRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamFindTenantService,
        IamMockTenantRepository,
        {
          provide: IamITenantRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamFindTenantService);
    repository = module.get(IamITenantRepository);
    mockRepository = module.get(IamMockTenantRepository);
  });

  describe('main', () => {
    test('IamFindTenantService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find tenant', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource[0]);
    });
  });
});
