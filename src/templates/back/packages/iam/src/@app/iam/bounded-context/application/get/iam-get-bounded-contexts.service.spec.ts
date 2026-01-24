/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamIBoundedContextRepository,
  IamMockBoundedContextRepository,
} from '@app/iam/bounded-context';
import { IamGetBoundedContextsService } from '@app/iam/bounded-context/application/get/iam-get-bounded-contexts.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetBoundedContextsService', () => {
  let service: IamGetBoundedContextsService;
  let repository: IamIBoundedContextRepository;
  let mockRepository: IamMockBoundedContextRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamGetBoundedContextsService,
        IamMockBoundedContextRepository,
        {
          provide: IamIBoundedContextRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamGetBoundedContextsService);
    repository = module.get(IamIBoundedContextRepository);
    mockRepository = module.get(IamMockBoundedContextRepository);
  });

  describe('main', () => {
    test('GetBoundedContextsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get boundedContexts', async () => {
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
