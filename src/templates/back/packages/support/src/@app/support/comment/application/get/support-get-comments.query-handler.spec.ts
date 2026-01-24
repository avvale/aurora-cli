import {
  SupportCommentMapper,
  SupportGetCommentsQuery,
  SupportICommentRepository,
  SupportMockCommentRepository,
} from '@app/support/comment';
import { SupportGetCommentsQueryHandler } from '@app/support/comment/application/get/support-get-comments.query-handler';
import { SupportGetCommentsService } from '@app/support/comment/application/get/support-get-comments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetCommentsQueryHandler', () => {
  let queryHandler: SupportGetCommentsQueryHandler;
  let service: SupportGetCommentsService;
  let repository: SupportMockCommentRepository;
  let mapper: SupportCommentMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportGetCommentsQueryHandler,
        {
          provide: SupportICommentRepository,
          useClass: SupportMockCommentRepository,
        },
        {
          provide: SupportGetCommentsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<SupportGetCommentsQueryHandler>(
      SupportGetCommentsQueryHandler,
    );
    service = module.get<SupportGetCommentsService>(SupportGetCommentsService);
    repository = <SupportMockCommentRepository>(
      module.get<SupportICommentRepository>(SupportICommentRepository)
    );
    mapper = new SupportCommentMapper();
  });

  describe('main', () => {
    test('SupportGetCommentsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an comments founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new SupportGetCommentsQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
