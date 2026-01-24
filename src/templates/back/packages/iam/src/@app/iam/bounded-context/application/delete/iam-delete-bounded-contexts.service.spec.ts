/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamIBoundedContextRepository,
  IamMockBoundedContextRepository,
} from '@app/iam/bounded-context';
import { IamDeleteBoundedContextsService } from '@app/iam/bounded-context/application/delete/iam-delete-bounded-contexts.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteBoundedContextsService', () => {
  let service: IamDeleteBoundedContextsService;
  let repository: IamIBoundedContextRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamDeleteBoundedContextsService,
        IamMockBoundedContextRepository,
        {
          provide: IamIBoundedContextRepository,
          useValue: {
            get: () => {
              /**/
            },
            delete: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamDeleteBoundedContextsService);
    repository = module.get(IamIBoundedContextRepository);
  });

  describe('main', () => {
    test('IamDeleteBoundedContextsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete boundedContext and emit event', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      expect(await service.main({}, {})).toBe(undefined);
    });
  });
});
