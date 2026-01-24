/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamIAccountRepository,
  IamMockAccountRepository,
} from '@app/iam/account';
import { IamCreateAccountsService } from '@app/iam/account/application/create/iam-create-accounts.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateAccountsService', () => {
  let service: IamCreateAccountsService;
  let mockRepository: IamMockAccountRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamCreateAccountsService,
        IamMockAccountRepository,
        {
          provide: IamIAccountRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamCreateAccountsService);
    mockRepository = module.get(IamMockAccountRepository);
  });

  describe('main', () => {
    test('CreateAccountsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create accounts and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
