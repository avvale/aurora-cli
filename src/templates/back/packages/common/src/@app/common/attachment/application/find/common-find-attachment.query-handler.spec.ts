import {
  CommonAttachmentMapper,
  CommonFindAttachmentQuery,
  CommonIAttachmentRepository,
  CommonMockAttachmentRepository,
} from '@app/common/attachment';
import { CommonFindAttachmentQueryHandler } from '@app/common/attachment/application/find/common-find-attachment.query-handler';
import { CommonFindAttachmentService } from '@app/common/attachment/application/find/common-find-attachment.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentQueryHandler', () => {
  let queryHandler: CommonFindAttachmentQueryHandler;
  let service: CommonFindAttachmentService;
  let repository: CommonMockAttachmentRepository;
  let mapper: CommonAttachmentMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindAttachmentQueryHandler,
        {
          provide: CommonIAttachmentRepository,
          useClass: CommonMockAttachmentRepository,
        },
        {
          provide: CommonFindAttachmentService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindAttachmentQueryHandler>(
      CommonFindAttachmentQueryHandler,
    );
    service = module.get<CommonFindAttachmentService>(
      CommonFindAttachmentService,
    );
    repository = <CommonMockAttachmentRepository>(
      module.get<CommonIAttachmentRepository>(CommonIAttachmentRepository)
    );
    mapper = new CommonAttachmentMapper();
  });

  describe('main', () => {
    test('CommonFindAttachmentQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an attachment founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new CommonFindAttachmentQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
