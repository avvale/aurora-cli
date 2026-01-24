import {
  SupportICommentRepository,
  SupportMockCommentRepository,
  SupportPaginateCommentsQuery,
} from '@app/support/comment';
import { SupportPaginateCommentsQueryHandler } from '@app/support/comment/application/paginate/support-paginate-comments.query-handler';
import { SupportPaginateCommentsService } from '@app/support/comment/application/paginate/support-paginate-comments.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportPaginateCommentsQueryHandler', () => {
  let queryHandler: SupportPaginateCommentsQueryHandler;
  let service: SupportPaginateCommentsService;
  let repository: SupportMockCommentRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportPaginateCommentsQueryHandler,
        {
          provide: SupportICommentRepository,
          useClass: SupportMockCommentRepository,
        },
        {
          provide: SupportPaginateCommentsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<SupportPaginateCommentsQueryHandler>(
      SupportPaginateCommentsQueryHandler,
    );
    service = module.get<SupportPaginateCommentsService>(
      SupportPaginateCommentsService,
    );
    repository = <SupportMockCommentRepository>(
      module.get<SupportICommentRepository>(SupportICommentRepository)
    );
  });

  describe('main', () => {
    test('SupportPaginateCommentsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an comments paginated', async () => {
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
          new SupportPaginateCommentsQuery({
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
