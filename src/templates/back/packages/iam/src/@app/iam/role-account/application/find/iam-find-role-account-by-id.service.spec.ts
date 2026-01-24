import {
  IamIRoleAccountRepository,
  iamMockRoleAccountData,
  IamMockRoleAccountRepository,
} from '@app/iam/role-account';
import { IamFindRoleAccountByIdService } from '@app/iam/role-account/application/find/iam-find-role-account-by-id.service';
import { IamRoleAccountId } from '@app/iam/role-account/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleAccountByIdService', () => {
  let service: IamFindRoleAccountByIdService;
  let repository: IamIRoleAccountRepository;
  let mockRepository: IamMockRoleAccountRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamFindRoleAccountByIdService,
        IamMockRoleAccountRepository,
        {
          provide: IamIRoleAccountRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamFindRoleAccountByIdService);
    repository = module.get(IamIRoleAccountRepository);
    mockRepository = module.get(IamMockRoleAccountRepository);
  });

  describe('main', () => {
    test('FindRoleAccountByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find roleAccount by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new IamRoleAccountId(iamMockRoleAccountData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
