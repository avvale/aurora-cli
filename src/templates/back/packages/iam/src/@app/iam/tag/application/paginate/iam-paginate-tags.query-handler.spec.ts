import {
  IamITagRepository,
  IamMockTagRepository,
  IamPaginateTagsQuery,
} from '@app/iam/tag';
import { IamPaginateTagsQueryHandler } from '@app/iam/tag/application/paginate/iam-paginate-tags.query-handler';
import { IamPaginateTagsService } from '@app/iam/tag/application/paginate/iam-paginate-tags.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTagsQueryHandler', () => {
  let queryHandler: IamPaginateTagsQueryHandler;
  let service: IamPaginateTagsService;
  let repository: IamMockTagRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamPaginateTagsQueryHandler,
        {
          provide: IamITagRepository,
          useClass: IamMockTagRepository,
        },
        {
          provide: IamPaginateTagsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamPaginateTagsQueryHandler>(
      IamPaginateTagsQueryHandler,
    );
    service = module.get<IamPaginateTagsService>(IamPaginateTagsService);
    repository = <IamMockTagRepository>(
      module.get<IamITagRepository>(IamITagRepository)
    );
  });

  describe('main', () => {
    test('IamPaginateTagsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an tags paginated', async () => {
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
          new IamPaginateTagsQuery({
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
