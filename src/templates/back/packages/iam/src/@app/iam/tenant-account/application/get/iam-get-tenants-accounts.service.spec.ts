import {
  IamITenantAccountRepository,
  IamMockTenantAccountRepository,
} from '@app/iam/tenant-account';
import { IamGetTenantsAccountsService } from '@app/iam/tenant-account/application/get/iam-get-tenants-accounts.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetTenantsAccountsService', () => {
  let service: IamGetTenantsAccountsService;
  let repository: IamITenantAccountRepository;
  let mockRepository: IamMockTenantAccountRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamGetTenantsAccountsService,
        IamMockTenantAccountRepository,
        {
          provide: IamITenantAccountRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamGetTenantsAccountsService);
    repository = module.get(IamITenantAccountRepository);
    mockRepository = module.get(IamMockTenantAccountRepository);
  });

  describe('main', () => {
    test('GetTenantsAccountsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get tenantsAccounts', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});
