import { IamIRoleRepository, IamMockRoleRepository } from '@app/iam/role';
import { IamFindRoleService } from '@app/iam/role/application/find/iam-find-role.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleService', () => {
  let service: IamFindRoleService;
  let repository: IamIRoleRepository;
  let mockRepository: IamMockRoleRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamFindRoleService,
        IamMockRoleRepository,
        {
          provide: IamIRoleRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamFindRoleService);
    repository = module.get(IamIRoleRepository);
    mockRepository = module.get(IamMockRoleRepository);
  });

  describe('main', () => {
    test('IamFindRoleService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find role', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource[0]);
    });
  });
});
