/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamBoundedContextMapper,
  IamFindBoundedContextByIdQuery,
  IamIBoundedContextRepository,
  iamMockBoundedContextData,
  IamMockBoundedContextRepository,
} from '@app/iam/bounded-context';
import { IamFindBoundedContextByIdQueryHandler } from '@app/iam/bounded-context/application/find/iam-find-bounded-context-by-id.query-handler';
import { IamFindBoundedContextByIdService } from '@app/iam/bounded-context/application/find/iam-find-bounded-context-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindBoundedContextByIdQueryHandler', () => {
  let queryHandler: IamFindBoundedContextByIdQueryHandler;
  let service: IamFindBoundedContextByIdService;
  let repository: IamMockBoundedContextRepository;
  let mapper: IamBoundedContextMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamFindBoundedContextByIdQueryHandler,
        {
          provide: IamIBoundedContextRepository,
          useClass: IamMockBoundedContextRepository,
        },
        {
          provide: IamFindBoundedContextByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamFindBoundedContextByIdQueryHandler>(
      IamFindBoundedContextByIdQueryHandler,
    );
    service = module.get<IamFindBoundedContextByIdService>(
      IamFindBoundedContextByIdService,
    );
    repository = <IamMockBoundedContextRepository>(
      module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository)
    );
    mapper = new IamBoundedContextMapper();
  });

  describe('main', () => {
    test('FindBoundedContextByIdQueryHandler should be defined', () => {
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
        await queryHandler.execute(
          new IamFindBoundedContextByIdQuery(iamMockBoundedContextData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
