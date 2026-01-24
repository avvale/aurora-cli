import {
  IamIUserRepository,
  iamMockUserData,
  IamMockUserRepository,
} from '@app/iam/user';
import { IamFindUserByIdService } from '@app/iam/user/application/find/iam-find-user-by-id.service';
import { IamUserId } from '@app/iam/user/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindUserByIdService', () => {
  let service: IamFindUserByIdService;
  let repository: IamIUserRepository;
  let mockRepository: IamMockUserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamFindUserByIdService,
        IamMockUserRepository,
        {
          provide: IamIUserRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamFindUserByIdService);
    repository = module.get(IamIUserRepository);
    mockRepository = module.get(IamMockUserRepository);
  });

  describe('main', () => {
    test('FindUserByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find user by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main(new IamUserId(iamMockUserData[0].id))).toBe(
        mockRepository.collectionSource[0],
      );
    });
  });
});
