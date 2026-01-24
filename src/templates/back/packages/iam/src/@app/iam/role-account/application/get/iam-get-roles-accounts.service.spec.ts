import {
  IamIRoleAccountRepository,
  IamMockRoleAccountRepository,
} from '@app/iam/role-account';
import { IamGetRolesAccountsService } from '@app/iam/role-account/application/get/iam-get-roles-accounts.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetRolesAccountsService', () => {
  let service: IamGetRolesAccountsService;
  let repository: IamIRoleAccountRepository;
  let mockRepository: IamMockRoleAccountRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamGetRolesAccountsService,
        IamMockRoleAccountRepository,
        {
          provide: IamIRoleAccountRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamGetRolesAccountsService);
    repository = module.get(IamIRoleAccountRepository);
    mockRepository = module.get(IamMockRoleAccountRepository);
  });

  describe('main', () => {
    test('GetRolesAccountsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get rolesAccounts', async () => {
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
