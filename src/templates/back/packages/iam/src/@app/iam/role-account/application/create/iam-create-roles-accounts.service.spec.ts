/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamIRoleAccountRepository,
  IamMockRoleAccountRepository,
} from '@app/iam/role-account';
import { IamCreateRolesAccountsService } from '@app/iam/role-account/application/create/iam-create-roles-accounts.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRolesAccountsService', () => {
  let service: IamCreateRolesAccountsService;
  let mockRepository: IamMockRoleAccountRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamCreateRolesAccountsService,
        IamMockRoleAccountRepository,
        {
          provide: IamIRoleAccountRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamCreateRolesAccountsService);
    mockRepository = module.get(IamMockRoleAccountRepository);
  });

  describe('main', () => {
    test('CreateRolesAccountsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create rolesAccounts and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
