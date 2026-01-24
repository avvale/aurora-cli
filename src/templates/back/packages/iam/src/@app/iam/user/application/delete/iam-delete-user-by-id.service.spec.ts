/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IamIUserRepository,
  iamMockUserData,
  IamMockUserRepository,
} from '@app/iam/user';
import { IamDeleteUserByIdService } from '@app/iam/user/application/delete/iam-delete-user-by-id.service';
import { IamUserId } from '@app/iam/user/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteUserByIdService', () => {
  let service: IamDeleteUserByIdService;
  let repository: IamIUserRepository;
  let mockRepository: IamMockUserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamDeleteUserByIdService,
        IamMockUserRepository,
        {
          provide: IamIUserRepository,
          useValue: {
            deleteById: (id) => {
              /**/
            },
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamDeleteUserByIdService);
    repository = module.get(IamIUserRepository);
    mockRepository = module.get(IamMockUserRepository);
  });

  describe('main', () => {
    test('IamDeleteUserByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete user and emit event', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main(new IamUserId(iamMockUserData[0].id), {})).toBe(
        undefined,
      );
    });
  });
});
