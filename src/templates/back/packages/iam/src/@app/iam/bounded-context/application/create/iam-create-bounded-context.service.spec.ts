/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamIBoundedContextRepository,
  iamMockBoundedContextData,
  IamMockBoundedContextRepository,
} from '@app/iam/bounded-context';
import { IamCreateBoundedContextService } from '@app/iam/bounded-context/application/create/iam-create-bounded-context.service';
import {
  IamBoundedContextId,
  IamBoundedContextIsActive,
  IamBoundedContextName,
  IamBoundedContextRoot,
  IamBoundedContextRowId,
  IamBoundedContextSort,
} from '@app/iam/bounded-context/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateBoundedContextService', () => {
  let service: IamCreateBoundedContextService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        IamCreateBoundedContextService,
        IamMockBoundedContextRepository,
        {
          provide: IamIBoundedContextRepository,
          useValue: {
            create: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(IamCreateBoundedContextService);
  });

  describe('main', () => {
    test('IamCreateBoundedContextService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create a boundedContext and emit event', async () => {
      expect(
        await service.main({
          id: new IamBoundedContextId(iamMockBoundedContextData[0].id),
          rowId: new IamBoundedContextRowId(iamMockBoundedContextData[0].rowId),
          name: new IamBoundedContextName(iamMockBoundedContextData[0].name),
          root: new IamBoundedContextRoot(iamMockBoundedContextData[0].root),
          sort: new IamBoundedContextSort(iamMockBoundedContextData[0].sort),
          isActive: new IamBoundedContextIsActive(
            iamMockBoundedContextData[0].isActive,
          ),
        }),
      ).toBe(undefined);
    });
  });
});
