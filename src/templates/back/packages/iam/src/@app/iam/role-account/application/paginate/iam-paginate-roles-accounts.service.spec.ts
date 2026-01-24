import {
  IamIRoleAccountRepository,
  IamMockRoleAccountRepository,
} from '@app/iam/role-account';
import { IamPaginateRolesAccountsService } from '@app/iam/role-account/application/paginate/iam-paginate-roles-accounts.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateRolesAccountsService', () => {
  let service: IamPaginateRolesAccountsService;
  let repository: IamIRoleAccountRepository;
  let mockRepository: IamMockRoleAccountRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamPaginateRolesAccountsService,
        IamMockRoleAccountRepository,
        {
          provide: IamIRoleAccountRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamPaginateRolesAccountsService);
    repository = module.get(IamIRoleAccountRepository);
    mockRepository = module.get(IamMockRoleAccountRepository);
  });

  describe('main', () => {
    test('IamPaginateRolesAccountsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate rolesAccounts', async () => {
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
