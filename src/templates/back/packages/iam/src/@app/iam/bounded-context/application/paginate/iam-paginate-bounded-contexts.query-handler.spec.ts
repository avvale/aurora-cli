/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamIBoundedContextRepository,
  IamMockBoundedContextRepository,
  IamPaginateBoundedContextsQuery,
} from '@app/iam/bounded-context';
import { IamPaginateBoundedContextsQueryHandler } from '@app/iam/bounded-context/application/paginate/iam-paginate-bounded-contexts.query-handler';
import { IamPaginateBoundedContextsService } from '@app/iam/bounded-context/application/paginate/iam-paginate-bounded-contexts.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateBoundedContextsQueryHandler', () => {
  let queryHandler: IamPaginateBoundedContextsQueryHandler;
  let service: IamPaginateBoundedContextsService;
  let repository: IamMockBoundedContextRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamPaginateBoundedContextsQueryHandler,
        {
          provide: IamIBoundedContextRepository,
          useClass: IamMockBoundedContextRepository,
        },
        {
          provide: IamPaginateBoundedContextsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamPaginateBoundedContextsQueryHandler>(
      IamPaginateBoundedContextsQueryHandler,
    );
    service = module.get<IamPaginateBoundedContextsService>(
      IamPaginateBoundedContextsService,
    );
    repository = <IamMockBoundedContextRepository>(
      module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository)
    );
  });

  describe('main', () => {
    test('IamPaginateBoundedContextsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an boundedContexts paginated', async () => {
      jest.spyOn(service, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              count: 10,
              total: 100,
              rows: repository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await queryHandler.execute(
          new IamPaginateBoundedContextsQuery({
            offset: 0,
            limit: 10,
          }),
        ),
      ).toStrictEqual(
        new PaginationResponse(
          100,
          10,
          repository.collectionSource.slice(0, 10).map((item) => item.toDTO()),
        ),
      );
    });
  });
});
