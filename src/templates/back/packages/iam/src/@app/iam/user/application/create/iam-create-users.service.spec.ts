/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIUserRepository, IamMockUserRepository } from '@app/iam/user';
import { IamCreateUsersService } from '@app/iam/user/application/create/iam-create-users.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateUsersService', () => {
  let service: IamCreateUsersService;
  let mockRepository: IamMockUserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamCreateUsersService,
        IamMockUserRepository,
        {
          provide: IamIUserRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamCreateUsersService);
    mockRepository = module.get(IamMockUserRepository);
  });

  describe('main', () => {
    test('CreateUsersService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create users and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
