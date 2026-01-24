/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamBoundedContextMapper,
  IamFindBoundedContextQuery,
  IamIBoundedContextRepository,
  IamMockBoundedContextRepository,
} from '@app/iam/bounded-context';
import { IamFindBoundedContextQueryHandler } from '@app/iam/bounded-context/application/find/iam-find-bounded-context.query-handler';
import { IamFindBoundedContextService } from '@app/iam/bounded-context/application/find/iam-find-bounded-context.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindBoundedContextQueryHandler', () => {
  let queryHandler: IamFindBoundedContextQueryHandler;
  let service: IamFindBoundedContextService;
  let repository: IamMockBoundedContextRepository;
  let mapper: IamBoundedContextMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamFindBoundedContextQueryHandler,
        {
          provide: IamIBoundedContextRepository,
          useClass: IamMockBoundedContextRepository,
        },
        {
          provide: IamFindBoundedContextService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamFindBoundedContextQueryHandler>(
      IamFindBoundedContextQueryHandler,
    );
    service = module.get<IamFindBoundedContextService>(
      IamFindBoundedContextService,
    );
    repository = <IamMockBoundedContextRepository>(
      module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository)
    );
    mapper = new IamBoundedContextMapper();
  });

  describe('main', () => {
    test('IamFindBoundedContextQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an boundedContext founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new IamFindBoundedContextQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
