import {
  IamIAccountRepository,
  iamMockAccountData,
  IamMockAccountRepository,
} from '@app/iam/account';
import { IamFindAccountByIdService } from '@app/iam/account/application/find/iam-find-account-by-id.service';
import { IamAccountId } from '@app/iam/account/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindAccountByIdService', () => {
  let service: IamFindAccountByIdService;
  let repository: IamIAccountRepository;
  let mockRepository: IamMockAccountRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamFindAccountByIdService,
        IamMockAccountRepository,
        {
          provide: IamIAccountRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamFindAccountByIdService);
    repository = module.get(IamIAccountRepository);
    mockRepository = module.get(IamMockAccountRepository);
  });

  describe('main', () => {
    test('FindAccountByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find account by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new IamAccountId(iamMockAccountData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
